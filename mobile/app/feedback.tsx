import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

import { useFeedback } from '../src/state/FeedbackContext';
import { useProgress } from '../src/state/ProgressContext';

export default function FeedbackScreen() {
  const router = useRouter();
  const { payload, setPayload } = useFeedback();
  const { completeDay, saveAttempt } = useProgress();
  const [saving, setSaving] = useState(false);

  if (!payload) {
    return (
      <View className="flex-1 bg-slate-950 items-center justify-center px-6">
        <Text className="text-slate-400 mb-4">No feedback to display.</Text>
        <Pressable
          onPress={() => router.replace('/')}
          className="bg-slate-800 rounded-full px-6 py-2 active:opacity-80"
        >
          <Text className="text-white">Back to dashboard</Text>
        </Pressable>
      </View>
    );
  }

  const { feedback, dayId, questionIndex, userSpeech, questionText } = payload;
  const transcript = feedback.userTranscript ?? userSpeech ?? '';

  const finishDay = async () => {
    setSaving(true);
    try {
      await saveAttempt({
        dayId,
        questionIx: questionIndex,
        transcript: transcript || undefined,
        feedback,
        score: feedback.score,
      });
      await completeDay(dayId);
      setPayload(null);
      router.replace('/');
    } catch {
      Alert.alert(
        'Could not save',
        'Your progress will be retried automatically when the network returns.',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="flex-1 bg-slate-950">
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center mb-6 active:opacity-60"
        >
          <ChevronLeft size={20} color="#94a3b8" />
          <Text className="text-slate-400 ml-1">Back</Text>
        </Pressable>

        <Text className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
          Coach Report · Day {dayId}
        </Text>

        <View className="bg-slate-900 rounded-2xl p-6 mb-6">
          <View className="flex-row items-baseline">
            <Text className="text-blue-500 text-6xl font-bold">
              {feedback.score}
            </Text>
            <Text className="text-slate-500 text-3xl ml-2">/ 9</Text>
          </View>
          <Text className="text-slate-400 text-sm mt-1">
            IELTS band estimate
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">
            Question
          </Text>
          <Text className="text-slate-300 leading-6">{questionText}</Text>
        </View>

        {[
          { label: 'Fluency', text: feedback.fluencyFeedback },
          { label: 'Vocabulary', text: feedback.vocabularyFeedback },
          { label: 'Structure', text: feedback.structureFeedback },
        ].map((row) => (
          <View key={row.label} className="bg-slate-900 rounded-2xl p-5 mb-3">
            <Text className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
              {row.label}
            </Text>
            <Text className="text-slate-300 leading-6">{row.text}</Text>
          </View>
        ))}

        {transcript ? (
          <View className="bg-slate-900 rounded-2xl p-5 mb-3">
            <Text className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
              Your answer
            </Text>
            <Text className="text-slate-300 leading-6 italic">
              &ldquo;{transcript}&rdquo;
            </Text>
          </View>
        ) : null}

        <View className="bg-slate-900 rounded-2xl p-5 mb-3">
          <Text className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
            Band 8 sample
          </Text>
          <Text className="text-slate-300 leading-6">
            {feedback.sampleAnswer}
          </Text>
        </View>

        <View className="bg-slate-900 rounded-2xl p-5 mb-6">
          <Text className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
            Vietnamese coach tips
          </Text>
          <Text className="text-slate-300 leading-6">
            {feedback.vietnameseTips}
          </Text>
        </View>

        <Pressable
          onPress={finishDay}
          disabled={saving}
          className={`rounded-full px-6 py-3 items-center ${
            saving ? 'bg-blue-600/40' : 'bg-blue-600 active:opacity-80'
          }`}
        >
          <Text className="text-white font-semibold">
            {saving ? 'Saving…' : 'Finish day challenge'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setPayload(null);
            router.back();
          }}
          className="self-center mt-4 active:opacity-60"
        >
          <Text className="text-slate-400 text-sm">Try another question</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
