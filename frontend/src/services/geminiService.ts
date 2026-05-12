const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

export interface FeedbackResponse {
  score: number;
  userTranscript?: string;
  fluencyFeedback: string;
  vocabularyFeedback: string;
  structureFeedback: string;
  sampleAnswer: string;
  vietnameseTips: string;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Request to ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getSpeakingFeedback(
  topicTitle: string,
  question: string,
  userSpeech: string,
  keywords: string[],
  audioBase64?: string
): Promise<FeedbackResponse> {
  try {
    return await post<FeedbackResponse>('/api/gemini/feedback', {
      topicTitle,
      question,
      userSpeech,
      keywords,
      audioBase64,
    });
  } catch (error) {
    console.error('Feedback Error:', error);
    throw new Error('Failed to get feedback from AI coach.');
  }
}

export async function getExampleExplanation(
  example: string,
  targetLanguage: string = 'Vietnamese'
): Promise<string> {
  try {
    const { text } = await post<{ text: string }>('/api/gemini/explanation', {
      example,
      targetLanguage,
    });
    return text || 'No explanation available.';
  } catch (error) {
    console.error('Explanation Error:', error);
    return 'Could not generate explanation at this time.';
  }
}

export async function translateKeywords(
  keywords: { word: string; vietnamese: string; example: string }[],
  targetLanguage: string
): Promise<string[]> {
  if (targetLanguage === 'Vietnamese') {
    return keywords.map((k) => k.vietnamese);
  }

  try {
    const { translations } = await post<{ translations: string[] }>(
      '/api/gemini/translate-keywords',
      { keywords, targetLanguage }
    );
    return translations;
  } catch (error) {
    console.error('Translation Error:', error);
    return keywords.map((k) => k.vietnamese);
  }
}
