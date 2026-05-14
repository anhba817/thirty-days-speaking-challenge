import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  getSpeakingFeedback,
  type FeedbackResponse,
} from '../services/geminiService';
import type { Question } from '../data/challenge';

interface Props {
  topicTitle: string;
  question: Question;
  keywords: string[];
  onFeedback: (fb: FeedbackResponse) => void;
}

export function PracticeStudio({
  topicTitle,
  question,
  keywords,
  onFeedback,
}: Props) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disabled = submitting || !text.trim();

  const submit = async () => {
    if (disabled) return;
    setError(null);
    setSubmitting(true);
    try {
      const fb = await getSpeakingFeedback({
        topicTitle,
        question: question.text,
        userSpeech: text,
        keywords,
      });
      onFeedback(fb);
    } catch {
      setError('AI coach was busy. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={setText}
        multiline
        placeholder="Type your answer…"
        placeholderTextColor="#64748b"
        className="bg-slate-900 rounded-2xl p-4 text-white text-base min-h-[120px]"
        style={{ textAlignVertical: 'top' }}
      />

      <Pressable
        onPress={submit}
        disabled={disabled}
        className={`rounded-full px-6 py-3 mt-4 items-center ${
          disabled ? 'bg-emerald-500/40' : 'bg-emerald-500 active:opacity-80'
        }`}
      >
        {submitting ? (
          <ActivityIndicator color="#0f172a" />
        ) : (
          <Text className="text-slate-900 font-semibold">
            Generate AI Analysis
          </Text>
        )}
      </Pressable>

      {error && (
        <Text className="text-red-400 text-sm mt-3 text-center">{error}</Text>
      )}
    </View>
  );
}
