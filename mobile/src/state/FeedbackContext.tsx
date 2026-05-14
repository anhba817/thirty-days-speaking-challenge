import { createContext, useContext, useState, type ReactNode } from 'react';

import type { FeedbackResponse } from '../services/geminiService';

export interface FeedbackPayload {
  dayId: number;
  questionIndex: number;
  topicTitle: string;
  questionText: string;
  userSpeech: string;
  feedback: FeedbackResponse;
}

interface FeedbackContextValue {
  payload: FeedbackPayload | null;
  setPayload: (p: FeedbackPayload | null) => void;
}

const Ctx = createContext<FeedbackContextValue | null>(null);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [payload, setPayload] = useState<FeedbackPayload | null>(null);
  return (
    <Ctx.Provider value={{ payload, setPayload }}>{children}</Ctx.Provider>
  );
}

export function useFeedback() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useFeedback must be used within FeedbackProvider');
  return ctx;
}
