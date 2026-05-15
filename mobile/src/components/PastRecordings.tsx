import { useEffect, useState } from 'react';
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
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const player = useAudioPlayer(activeUrl);
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    return () => {
      player.pause();
    };
  }, [player]);

  const items = attempts.filter(
    (a) => a.dayId === dayId && a.questionIx === questionIndex && a.hasAudio,
  );

  if (!user || !token || items.length === 0) return null;

  const toggle = async (attemptId: string) => {
    if (activeId === attemptId) {
      if (status.playing) {
        player.pause();
      } else {
        if (status.duration && status.currentTime >= status.duration) {
          player.seekTo(0);
        }
        player.play();
      }
      return;
    }

    setLoadingId(attemptId);
    try {
      const { url } = await getAttemptAudioUrl(token, attemptId);
      setActiveId(attemptId);
      setActiveUrl(url);
      // The player will load when activeUrl updates; play after a tick.
      setTimeout(() => player.play(), 100);
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
