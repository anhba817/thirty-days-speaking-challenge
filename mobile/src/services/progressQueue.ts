import AsyncStorage from '@react-native-async-storage/async-storage';

import { ApiError } from './apiClient';
import type { FeedbackResponse } from './geminiService';
import { markDayComplete, saveAttempt as saveAttemptApi } from './progressService';

const QUEUE_KEY = 'ielts-pending-writes';

export interface SaveAttemptInput {
  dayId: number;
  questionIx: number;
  transcript?: string;
  feedback: FeedbackResponse;
  score: number;
}

export type PendingWrite =
  | { id: string; type: 'complete-day'; dayId: number; attemptedAt: number }
  | {
      id: string;
      type: 'save-attempt';
      payload: SaveAttemptInput;
      attemptedAt: number;
    };

function isTransient(err: unknown): boolean {
  if (err instanceof ApiError) {
    return err.status >= 500 || err.status === 408 || err.status === 429;
  }
  return true;
}

async function readQueue(): Promise<PendingWrite[]> {
  const raw = await AsyncStorage.getItem(QUEUE_KEY);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as PendingWrite[]) : [];
  } catch {
    return [];
  }
}

async function writeQueue(items: PendingWrite[]): Promise<void> {
  await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(items));
}

async function executeWrite(
  write: PendingWrite,
  token: string,
): Promise<void> {
  if (write.type === 'complete-day') {
    await markDayComplete(token, write.dayId);
  } else {
    await saveAttemptApi(token, write.payload);
  }
}

export async function getPendingCount(): Promise<number> {
  return (await readQueue()).length;
}

export async function clearQueue(): Promise<void> {
  await AsyncStorage.removeItem(QUEUE_KEY);
}

/**
 * Try the write immediately. On transient failure, queue for later replay.
 * Throws on permanent failures (4xx) so callers can surface the error.
 */
export async function enqueueWrite(
  write: PendingWrite,
  token: string,
): Promise<void> {
  try {
    await executeWrite(write, token);
  } catch (err) {
    if (!isTransient(err)) throw err;
    const queue = await readQueue();
    queue.push(write);
    await writeQueue(queue);
  }
}

let draining = false;

/**
 * Drain pending writes oldest-first. Stops on first transient failure (will be
 * retried on next trigger). Drops permanent-failure items so they don't
 * poison the queue forever.
 */
export async function drainQueue(
  token: string,
): Promise<{ drained: number; remaining: number }> {
  if (draining) {
    return { drained: 0, remaining: (await readQueue()).length };
  }
  draining = true;
  let drained = 0;
  try {
    let queue = await readQueue();
    while (queue.length > 0) {
      const next = queue[0];
      try {
        await executeWrite(next, token);
        queue.shift();
        await writeQueue(queue);
        drained++;
      } catch (err) {
        if (isTransient(err)) {
          break;
        }
        queue.shift();
        await writeQueue(queue);
      }
    }
    return { drained, remaining: queue.length };
  } finally {
    draining = false;
  }
}
