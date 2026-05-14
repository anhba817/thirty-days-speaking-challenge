import { apiFetch } from './apiClient';
import type { Keyword } from '../data/challenge';

export interface FeedbackResponse {
  score: number;
  userTranscript?: string;
  fluencyFeedback: string;
  vocabularyFeedback: string;
  structureFeedback: string;
  sampleAnswer: string;
  vietnameseTips: string;
}

export interface FeedbackInput {
  topicTitle: string;
  question: string;
  userSpeech: string;
  keywords: string[];
  audioBase64?: string;
  audioMimeType?: string;
}

export function getSpeakingFeedback(
  input: FeedbackInput,
): Promise<FeedbackResponse> {
  return apiFetch<FeedbackResponse>('/api/gemini/feedback', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function getExplanation(
  example: string,
  targetLanguage: string,
): Promise<{ text: string }> {
  return apiFetch<{ text: string }>('/api/gemini/explanation', {
    method: 'POST',
    body: JSON.stringify({ example, targetLanguage }),
  });
}

export function translateKeywords(
  keywords: Keyword[],
  targetLanguage: string,
): Promise<{ translations: string[] }> {
  return apiFetch<{ translations: string[] }>(
    '/api/gemini/translate-keywords',
    {
      method: 'POST',
      body: JSON.stringify({ keywords, targetLanguage }),
    },
  );
}
