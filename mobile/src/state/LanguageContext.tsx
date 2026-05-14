import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LANGUAGES = ['Vietnamese', 'Chinese', 'Japanese'] as const;
export type Language = (typeof LANGUAGES)[number];

const STORAGE_KEY = 'ielts-learner-language';

interface LanguageContextValue {
  language: Language;
  setLanguage: (l: Language) => void;
}

const Ctx = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('Vietnamese');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw && (LANGUAGES as readonly string[]).includes(raw)) {
        setLanguageState(raw as Language);
      }
    });
  }, []);

  const setLanguage = (l: Language) => {
    setLanguageState(l);
    AsyncStorage.setItem(STORAGE_KEY, l).catch(() => {});
  };

  return (
    <Ctx.Provider value={{ language, setLanguage }}>{children}</Ctx.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
