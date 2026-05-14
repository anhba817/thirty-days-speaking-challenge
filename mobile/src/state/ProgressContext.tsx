import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import { useAuth } from '../auth/AuthContext';
import {
  fetchProgress,
  mergeCompletedDays,
} from '../services/progressService';
import {
  clearQueue,
  drainQueue,
  enqueueWrite,
  getPendingCount,
  type SaveAttemptInput,
} from '../services/progressQueue';

const PROGRESS_KEY = 'ielts-30-day-progress';

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

interface ProgressContextValue {
  completedDays: number[];
  isComplete: (dayId: number) => boolean;
  completeDay: (dayId: number) => Promise<void>;
  saveAttempt: (input: SaveAttemptInput) => Promise<void>;
  pendingCount: number;
  isOnline: boolean;
}

const Ctx = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user, token } = useAuth();
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const previousUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(PROGRESS_KEY).then((raw) => {
      if (!raw) return;
      try {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCompletedDays(parsed.filter((n) => typeof n === 'number'));
        }
      } catch {
        // ignore
      }
    });
    getPendingCount().then(setPendingCount);
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(completedDays)).catch(
      () => {},
    );
  }, [completedDays]);

  useEffect(() => {
    const prevId = previousUserIdRef.current;
    const currId = user?.id ?? null;
    previousUserIdRef.current = currId;
    if (prevId === currId) return;

    if (prevId != null && currId == null) {
      void clearQueue().then(() => setPendingCount(0));
      return;
    }

    if (currId != null && token) {
      void (async () => {
        try {
          const raw = await AsyncStorage.getItem(PROGRESS_KEY);
          const localDays: unknown = raw ? JSON.parse(raw) : [];
          if (Array.isArray(localDays) && localDays.length > 0) {
            await mergeCompletedDays(token, localDays as number[]);
          }
        } catch {
          // ignore merge errors
        }
        try {
          await drainQueue(token);
        } catch {
          // ignore
        }
        try {
          const progress = await fetchProgress(token);
          setCompletedDays(progress.completedDays);
        } catch {
          // ignore
        }
        setPendingCount(await getPendingCount());
      })();
    }
  }, [user?.id, token]);

  useEffect(() => {
    if (!token) return;

    const tryDrain = () => {
      drainQueue(token)
        .then(({ remaining }) => setPendingCount(remaining))
        .catch(() => {});
    };

    const netSub = NetInfo.addEventListener((state) => {
      const online =
        !!state.isConnected && state.isInternetReachable !== false;
      setIsOnline(online);
      if (online) tryDrain();
    });

    const appSub = AppState.addEventListener('change', (s) => {
      if (s === 'active') tryDrain();
    });

    return () => {
      netSub();
      appSub.remove();
    };
  }, [token]);

  const completeDay = useCallback(
    async (dayId: number) => {
      setCompletedDays((prev) =>
        prev.includes(dayId) ? prev : [...prev, dayId],
      );
      if (!token) return;
      try {
        await enqueueWrite(
          {
            id: genId(),
            type: 'complete-day',
            dayId,
            attemptedAt: Date.now(),
          },
          token,
        );
      } finally {
        setPendingCount(await getPendingCount());
      }
    },
    [token],
  );

  const saveAttempt = useCallback(
    async (input: SaveAttemptInput) => {
      if (!token) return;
      try {
        await enqueueWrite(
          {
            id: genId(),
            type: 'save-attempt',
            payload: input,
            attemptedAt: Date.now(),
          },
          token,
        );
      } finally {
        setPendingCount(await getPendingCount());
      }
    },
    [token],
  );

  return (
    <Ctx.Provider
      value={{
        completedDays,
        isComplete: (id) => completedDays.includes(id),
        completeDay,
        saveAttempt,
        pendingCount,
        isOnline,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
