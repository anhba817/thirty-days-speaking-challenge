import { useCallback, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import type { Keyword } from '../data/challenge';

interface Props {
  keywords: Keyword[];
  translations: string[];
  isTranslating: boolean;
}

export function KeywordList({ keywords, translations, isTranslating }: Props) {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [selected, setSelected] = useState<{
    keyword: Keyword;
    translation: string;
  } | null>(null);

  const open = (kw: Keyword, t: string) => {
    setSelected({ keyword: kw, translation: t });
    sheetRef.current?.present();
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

  return (
    <View>
      {keywords.map((kw, i) => {
        const t = translations[i] ?? kw.vietnamese;
        return (
          <Pressable
            key={i}
            onPress={() => open(kw, t)}
            className="bg-slate-900 rounded-xl p-4 mb-2 active:opacity-80"
          >
            <Text className="text-white font-semibold">{kw.word}</Text>
            <Text className="text-slate-400 text-sm mt-1">
              {isTranslating ? '…' : t}
            </Text>
          </Pressable>
        );
      })}

      <BottomSheetModal
        ref={sheetRef}
        snapPoints={['45%']}
        backgroundStyle={{ backgroundColor: '#0f172a' }}
        handleIndicatorStyle={{ backgroundColor: '#475569' }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={{ paddingHorizontal: 24, paddingVertical: 12 }}>
          {selected && (
            <>
              <Text className="text-white text-2xl font-bold">
                {selected.keyword.word}
              </Text>
              <Text className="text-blue-400 text-base mt-2">
                {selected.translation}
              </Text>
              <Text className="text-blue-400 text-xs font-bold uppercase tracking-widest mt-6 mb-2">
                Example
              </Text>
              <Text className="text-slate-300 leading-6">
                {selected.keyword.example}
              </Text>
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
