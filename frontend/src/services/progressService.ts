import type { FeedbackResponse } from './geminiService';
import { apiFetch } from './apiClient';

export interface Attempt {
  id: string;
  dayId: number;
  questionIx: number;
  transcript: string | null;
  feedback: FeedbackResponse;
  score: number;
  createdAt: string;
}

export interface ProgressData {
  completedDays: number[];
  attempts: Attempt[];
}

export function fetchProgress(token: string): Promise<ProgressData> {
  return apiFetch<ProgressData>('/api/progress', {}, token);
}

export function markDayComplete(
  token: string,
  dayId: number,
): Promise<{ dayId: number }> {
  return apiFetch<{ dayId: number }>(
    `/api/progress/days/${dayId}`,
    { method: 'POST' },
    token,
  );
}

export function saveAttempt(
  token: string,
  body: {
    dayId: number;
    questionIx: number;
    transcript?: string;
    feedback: FeedbackResponse;
    score: number;
  },
): Promise<Attempt> {
  return apiFetch<Attempt>(
    '/api/progress/attempts',
    { method: 'POST', body: JSON.stringify(body) },
    token,
  );
}

export function mergeCompletedDays(
  token: string,
  dayIds: number[],
): Promise<ProgressData> {
  return apiFetch<ProgressData>(
    '/api/progress/merge',
    { method: 'POST', body: JSON.stringify({ dayIds }) },
    token,
  );
}
