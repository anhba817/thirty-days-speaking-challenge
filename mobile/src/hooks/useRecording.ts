import { useCallback, useEffect, useState } from 'react';
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';

export interface UseRecording {
  isRecording: boolean;
  durationMs: number;
  error: string | null;
  start: () => Promise<boolean>;
  stop: () => Promise<string | null>;
}

export function useRecording(): UseRecording {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const state = useAudioRecorderState(recorder, 100);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void setAudioModeAsync({
      allowsRecording: true,
      playsInSilentMode: true,
    }).catch(() => {});
  }, []);

  const start = useCallback(async () => {
    setError(null);
    try {
      const perm = await AudioModule.requestRecordingPermissionsAsync();
      if (!perm.granted) {
        setError('Microphone permission denied.');
        return false;
      }
      await recorder.prepareToRecordAsync();
      recorder.record();
      return true;
    } catch {
      setError('Could not start recording.');
      return false;
    }
  }, [recorder]);

  const stop = useCallback(async () => {
    try {
      await recorder.stop();
      return recorder.uri;
    } catch {
      setError('Could not stop recording.');
      return null;
    }
  }, [recorder]);

  return {
    isRecording: state.isRecording,
    durationMs: state.durationMillis ?? 0,
    error,
    start,
    stop,
  };
}
