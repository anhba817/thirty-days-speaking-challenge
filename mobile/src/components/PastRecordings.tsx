import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Play, Pause } from 'lucide-react-native';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

import { useAuth } from '../auth/AuthContext';
import { useProgress } from '../state/ProgressContext';
import { getAttemptAudioUrl } from '../services/progressService';

interface Props {
  dayId: number;
  questionIndex: number;
}

export function PastRecordings({ dayId, questionIndex }: Props) {
  const { token, user } = useAuth();
  const { attempts } = useProgress();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  // Use a single stable player and swap sources imperatively. Passing a
  // changing source to useAudioPlayer can release the underlying native
  // player out from under us; .replace() keeps the same instance.
  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);

  const items = attempts.filter(
    (a) => a.dayId === dayId && a.questionIx === questionIndex && a.hasAudio,
  );

  if (!user || !token || items.length === 0) return null;

  const safe = (fn: () => void) => {
    try {
      fn();
    } catch (e) {
      // Player may have been released (e.g. component unmounting). Swallow.
      console.warn('AudioPlayer call ignored:', e);
    }
  };

  const toggle = async (attemptId: string) => {
    if (activeId === attemptId) {
      if (status.playing) {
        safe(() => player.pause());
      } else {
        if (status.duration && status.currentTime >= status.duration) {
          safe(() => player.seekTo(0));
        }
        safe(() => player.play());
      }
      return;
    }

    setLoadingId(attemptId);
    try {
      const { url } = await getAttemptAudioUrl(token, attemptId);
      safe(() => player.replace({ uri: url }));
      setActiveId(attemptId);
      safe(() => player.play());
    } catch (e) {
      console.warn('Failed to load recording', e);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <View className="mt-6 mb-2">
      <Text className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
        Your Past Recordings
      </Text>
      <View className="bg-slate-900 rounded-2xl p-2">
        {items.map((a) => {
          const isActive = activeId === a.id;
          const playing = isActive && status.playing;
          return (
            <Pressable
              key={a.id}
              onPress={() => toggle(a.id)}
              disabled={loadingId === a.id}
              className="flex-row items-center px-3 py-3 active:opacity-70"
            >
              <View
                className={`w-10 h-10 rounded-full items-center justify-center ${
                  playing ? 'bg-rose-500' : 'bg-blue-600'
                }`}
              >
                {loadingId === a.id ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : playing ? (
                  <Pause size={16} color="#fff" />
                ) : (
                  <Play size={16} color="#fff" />
                )}
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-slate-200 text-sm">
                  Band {a.score.toFixed(1)}
                </Text>
                <Text className="text-slate-500 text-xs mt-0.5">
                  {new Date(a.createdAt).toLocaleString()}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
