import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
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
  signOut: () => void;
}

const Ctx = createContext<AuthContextValue | null>(null);
const TOKEN_KEY = 'ielts-auth-token';
const USER_KEY = 'ielts-auth-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    if (!storedToken || !storedUser) {
      setInitialized(true);
      return;
    }

    setToken(storedToken);
    setUser(JSON.parse(storedUser));
    fetchMe(storedToken)
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setInitialized(true));
  }, []);

  const signIn = useCallback(async (googleIdToken: string) => {
    const session = await loginWithGoogle(googleIdToken);
    setToken(session.token);
    setUser(session.user);
    localStorage.setItem(TOKEN_KEY, session.token);
    localStorage.setItem(USER_KEY, JSON.stringify(session.user));
    return session;
  }, []);

  const signOut = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
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
