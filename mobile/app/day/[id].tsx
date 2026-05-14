import { useEffect, useMemo, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

import { CHALLENGE_DATA } from '../../src/data/challenge';
import { KeywordList } from '../../src/components/KeywordList';
import { PracticeStudio } from '../../src/components/PracticeStudio';
import { QuestionPager } from '../../src/components/QuestionPager';
import { ReferenceAnswers } from '../../src/components/ReferenceAnswers';
import { translateKeywords } from '../../src/services/geminiService';
import { useFeedback } from '../../src/state/FeedbackContext';

const LANGUAGES = ['Vietnamese', 'Chinese', 'Japanese'] as const;
type Language = (typeof LANGUAGES)[number];

export default function DayDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dayId = Number(id);
  const day = useMemo(
    () => CHALLENGE_DATA.find((d) => d.id === dayId),
    [dayId],
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [language, setLanguage] = useState<Language>('Vietnamese');
  const [translations, setTranslations] = useState<string[]>([]);
  const [translating, setTranslating] = useState(false);
  const translationCache = useRef<Map<string, string[]>>(new Map());
  const { setPayload } = useFeedback();

  useEffect(() => {
    if (!day) return;
    const cacheKey = `${language}__${day.id}`;
    const cached = translationCache.current.get(cacheKey);
    if (cached) {
      setTranslations(cached);
      return;
    }

    if (language === 'Vietnamese') {
      const vi = day.keywords.map((k) => k.vietnamese);
      translationCache.current.set(cacheKey, vi);
      setTranslations(vi);
      return;
    }

    let cancelled = false;
    setTranslating(true);
    translateKeywords(day.keywords, language)
      .then((res) => {
        if (cancelled) return;
        translationCache.current.set(cacheKey, res.translations);
        setTranslations(res.translations);
      })
      .catch(() => {
        if (cancelled) return;
        setTranslations(day.keywords.map((k) => k.vietnamese));
      })
      .finally(() => {
        if (!cancelled) setTranslating(false);
      });
    return () => {
      cancelled = true;
    };
  }, [day, language]);

  if (!day) {
    return (
      <SafeAreaView className="flex-1 bg-slate-950">
        <Text className="text-slate-400 m-6">Day {dayId} not found.</Text>
      </SafeAreaView>
    );
  }

  const currentQuestion = day.questions[questionIndex] ?? day.questions[0];

  const cycleLanguage = () => {
    const i = LANGUAGES.indexOf(language);
    setLanguage(LANGUAGES[(i + 1) % LANGUAGES.length]);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-row items-center justify-between mt-4 mb-6">
            <Pressable
              onPress={() => router.back()}
              className="flex-row items-center active:opacity-60"
            >
              <ChevronLeft size={20} color="#94a3b8" />
              <Text className="text-slate-400 ml-1">Back</Text>
            </Pressable>
            <Pressable
              onPress={cycleLanguage}
              className="bg-slate-800 rounded-full px-3 py-1 active:opacity-80"
            >
              <Text className="text-slate-300 text-xs">{language}</Text>
            </Pressable>
          </View>

          <Text className="text-slate-500 text-xs uppercase tracking-widest mb-1">
            Day {day.id} · Phase {day.phase}
          </Text>
          <Text className="text-white text-3xl font-bold mb-2">
            {day.title}
          </Text>
          <Text className="text-slate-300 leading-6 mb-6">
            {day.description}
          </Text>

          <QuestionPager
            questions={day.questions}
            index={questionIndex}
            onIndexChange={setQuestionIndex}
          />

          <View className="bg-slate-900 rounded-2xl p-5 mt-6 mb-6">
            <Text className="text-slate-500 text-xs uppercase tracking-widest mb-2">
              Structure
            </Text>
            <Text className="text-emerald-400 mb-4">
              {currentQuestion.structure}
            </Text>
            <Text className="text-slate-500 text-xs uppercase tracking-widest mb-2">
              Tips
            </Text>
            {currentQuestion.tips.map((tip, i) => (
              <Text key={i} className="text-slate-300 mb-1 leading-5">
                • {tip}
              </Text>
            ))}
          </View>

          <Text className="text-slate-500 text-xs uppercase tracking-widest mb-2">
            Vocabulary
          </Text>
          <KeywordList
            keywords={day.keywords}
            translations={translations}
            isTranslating={translating}
          />

          <Text className="text-slate-500 text-xs uppercase tracking-widest mt-6 mb-2">
            Reference Answers
          </Text>
          <ReferenceAnswers
            examples={currentQuestion.examples}
            language={language}
          />

          <Text className="text-slate-500 text-xs uppercase tracking-widest mt-6 mb-2">
            Practice
          </Text>
          <PracticeStudio
            topicTitle={day.title}
            question={currentQuestion}
            keywords={day.keywords.map((k) => k.word)}
            onFeedback={(fb, userSpeech) => {
              setPayload({
                dayId: day.id,
                questionIndex,
                topicTitle: day.title,
                questionText: currentQuestion.text,
                userSpeech,
                feedback: fb,
              });
              router.push('/feedback');
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
