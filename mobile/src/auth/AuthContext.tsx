import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import {
  AuthSession,
  AuthUser,
  fetchMe,
  loginWithGoogle,
} from '../services/authService';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  initialized: boolean;
  signIn: (googleIdToken: string) => Promise<AuthSession>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthContextValue | null>(null);
const TOKEN_KEY = 'ielts-auth-token';
const USER_KEY = 'ielts-auth-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [storedToken, storedUser] = await Promise.all([
          SecureStore.getItemAsync(TOKEN_KEY),
          AsyncStorage.getItem(USER_KEY),
        ]);
        if (cancelled || !storedToken || !storedUser) return;

        setToken(storedToken);
        setUser(JSON.parse(storedUser) as AuthUser);

        try {
          await fetchMe(storedToken);
        } catch {
          if (cancelled) return;
          await Promise.all([
            SecureStore.deleteItemAsync(TOKEN_KEY),
            AsyncStorage.removeItem(USER_KEY),
          ]);
          setToken(null);
          setUser(null);
        }
      } finally {
        if (!cancelled) setInitialized(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(async (googleIdToken: string) => {
    const session = await loginWithGoogle(googleIdToken);
    await Promise.all([
      SecureStore.setItemAsync(TOKEN_KEY, session.token),
      AsyncStorage.setItem(USER_KEY, JSON.stringify(session.user)),
    ]);
    setToken(session.token);
    setUser(session.user);
    return session;
  }, []);

  const signOut = useCallback(async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEY),
      AsyncStorage.removeItem(USER_KEY),
    ]);
    setToken(null);
    setUser(null);
  }, []);

  return (
    <Ctx.Provider value={{ user, token, initialized, signIn, signOut }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
