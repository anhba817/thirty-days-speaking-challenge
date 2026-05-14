import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

import type { Question } from '../data/challenge';
import { getExplanation } from '../services/geminiService';

const BANDS = [6, 7, 8] as const;
type Band = (typeof BANDS)[number];

interface Props {
  examples: Question['examples'];
  language: string;
}

export function ReferenceAnswers({ examples, language }: Props) {
  const [band, setBand] = useState<Band>(7);
  const sheetRef = useRef<BottomSheetModal>(null);
  const [activeExample, setActiveExample] = useState<string | null>(null);
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openExplanation = async (example: string) => {
    const key = `${language}__${example}`;
    setActiveExample(example);
    setError(null);
    sheetRef.current?.present();

    if (explanations[key]) return;

    setLoadingKey(key);
    try {
      const { text } = await getExplanation(example, language);
      setExplanations((m) => ({ ...m, [key]: text }));
    } catch {
      setError('Could not load explanation. Try again.');
    } finally {
      setLoadingKey(null);
    }
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.6}
      />
    ),
    [],
  );

  const activeKey = activeExample ? `${language}__${activeExample}` : null;
  const activeText = activeKey ? explanations[activeKey] : undefined;
  const activeLoading = activeKey != null && loadingKey === activeKey;

  return (
    <View>
      <View className="flex-row bg-slate-900 rounded-full p-1 mb-3">
        {BANDS.map((b) => (
          <Pressable
            key={b}
            onPress={() => setBand(b)}
            className={`flex-1 py-2 rounded-full items-center ${
              band === b ? 'bg-blue-600' : ''
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                band === b ? 'text-white' : 'text-slate-300'
              }`}
            >
              Band {b}
            </Text>
          </Pressable>
        ))}
      </View>

      {examples[band].map((example, i) => (
        <View
          key={`${band}-${i}`}
          className="bg-slate-900 rounded-2xl p-5 mb-3"
        >
          <Text className="text-slate-300 leading-6">{example}</Text>
          <Pressable
            onPress={() => openExplanation(example)}
            className="mt-3 self-start active:opacity-60"
          >
            <Text className="text-blue-400 text-sm font-semibold">
              Why is this band {band}? →
            </Text>
          </Pressable>
        </View>
      ))}

      <BottomSheetModal
        ref={sheetRef}
        snapPoints={['75%']}
        backgroundStyle={{ backgroundColor: '#0f172a' }}
        handleIndicatorStyle={{ backgroundColor: '#475569' }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
        >
          <Text className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
            Why this works · {language}
          </Text>
          {activeLoading ? (
            <View className="py-10">
              <ActivityIndicator color="#3b82f6" />
            </View>
          ) : error ? (
            <Text className="text-rose-400">{error}</Text>
          ) : (
            <Text className="text-slate-300 leading-7">
              {activeText ?? ''}
            </Text>
          )}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
}
