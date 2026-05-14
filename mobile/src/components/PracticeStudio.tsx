import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Mic } from 'lucide-react-native';
import * as FileSystem from 'expo-file-system/legacy';

import {
  getSpeakingFeedback,
  type FeedbackResponse,
} from '../services/geminiService';
import { useRecording } from '../hooks/useRecording';
import { Waveform } from './Waveform';
import type { Question } from '../data/challenge';

interface Props {
  topicTitle: string;
  question: Question;
  keywords: string[];
  onFeedback: (fb: FeedbackResponse, userSpeech: string) => void;
}

function formatDuration(ms: number) {
  const sec = Math.floor(ms / 1000);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function PracticeStudio({
  topicTitle,
  question,
  keywords,
  onFeedback,
}: Props) {
  const [text, setText] = useState('');
  const [audio, setAudio] = useState<{
    uri: string;
    durationMs: number;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recording = useRecording();
  const canSubmit = (!!audio || text.trim().length > 0) && !submitting;

  const toggleRecord = async () => {
    setError(null);
    if (recording.isRecording) {
      const dur = recording.durationMs;
      const uri = await recording.stop();
      if (uri) setAudio({ uri, durationMs: dur });
    } else {
      setAudio(null);
      await recording.start();
    }
  };

  const submit = async () => {
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);
    try {
      let audioBase64: string | undefined;
      if (audio) {
        audioBase64 = await FileSystem.readAsStringAsync(audio.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
      }
      const fb = await getSpeakingFeedback({
        topicTitle,
        question: question.text,
        userSpeech: text,
        keywords,
        audioBase64,
        audioMimeType: audioBase64 ? 'audio/m4a' : undefined,
      });
      onFeedback(fb, text);
      setText('');
      setAudio(null);
    } catch {
      setError('AI coach was busy. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const displayMs = recording.isRecording
    ? recording.durationMs
    : (audio?.durationMs ?? 0);

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={setText}
        multiline
        editable={!recording.isRecording}
        placeholder={
          recording.isRecording
            ? 'Listening…'
            : audio
              ? 'Audio captured — submit to analyze, or type a transcript.'
              : 'Type your answer or tap the mic below…'
        }
        placeholderTextColor="#64748b"
        className="bg-slate-900 rounded-2xl p-4 text-white text-base min-h-[120px]"
        style={{ textAlignVertical: 'top' }}
      />

      <View className="flex-row items-center mt-4 bg-slate-900 rounded-2xl p-4">
        <Pressable
          onPress={toggleRecord}
          disabled={submitting}
          className={`w-14 h-14 rounded-full items-center justify-center active:opacity-80 ${
            recording.isRecording ? 'bg-red-500' : 'bg-emerald-500'
          }`}
        >
          {recording.isRecording ? (
            <View className="w-5 h-5 bg-white rounded-sm" />
          ) : (
            <Mic size={24} color="#0f172a" />
          )}
        </Pressable>
        <View className="flex-1 mx-3">
          <Waveform active={recording.isRecording} />
        </View>
        <Text className="text-slate-300 text-base w-14 text-right tabular-nums">
          {formatDuration(displayMs)}
        </Text>
      </View>

      {audio && !recording.isRecording && (
        <View className="flex-row items-center justify-between mt-2 px-2">
          <Text className="text-emerald-400 text-sm">
            ✓ Audio captured ({formatDuration(audio.durationMs)})
          </Text>
          <Pressable
            onPress={() => setAudio(null)}
            className="active:opacity-60"
          >
            <Text className="text-slate-400 text-sm">Discard</Text>
          </Pressable>
        </View>
      )}

      {recording.error && (
        <Text className="text-red-400 text-sm mt-3 text-center">
          {recording.error}
        </Text>
      )}

      <Pressable
        onPress={submit}
        disabled={!canSubmit}
        className={`rounded-full px-6 py-3 mt-4 items-center ${
          !canSubmit ? 'bg-emerald-500/40' : 'bg-emerald-500 active:opacity-80'
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
