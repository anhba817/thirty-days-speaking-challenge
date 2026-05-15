import { apiFetch } from './apiClient';
import type { FeedbackResponse } from './geminiService';

export interface Attempt {
  id: string;
  dayId: number;
  questionIx: number;
  transcript: string | null;
  feedback: FeedbackResponse;
  score: number;
  hasAudio?: boolean;
  audioMimeType?: string | null;
  createdAt: string;
}

export interface ProgressData {
  completedDays: number[];
  attempts: Attempt[];
}

export interface SaveAttemptResult {
  attempt: Attempt;
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
    audioMimeType?: string;
    audioBase64?: string;
  },
): Promise<SaveAttemptResult> {
  return apiFetch<SaveAttemptResult>(
    '/api/progress/attempts',
    { method: 'POST', body: JSON.stringify(body) },
    token,
  );
}

export function getAttemptAudioUrl(
  token: string,
  attemptId: string,
): Promise<{ url: string; expiresIn: number; mimeType?: string }> {
  return apiFetch<{ url: string; expiresIn: number; mimeType?: string }>(
    `/api/progress/attempts/${attemptId}/audio`,
    {},
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
