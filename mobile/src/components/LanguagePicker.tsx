import { useCallback, useRef } from 'react';
import { Pressable, Text } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { Check, ChevronDown } from 'lucide-react-native';

import {
  LANGUAGES,
  useLanguage,
  type Language,
} from '../state/LanguageContext';

export function LanguagePicker() {
  const { language, setLanguage } = useLanguage();
  const ref = useRef<BottomSheetModal>(null);

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

  const select = (l: Language) => {
    setLanguage(l);
    ref.current?.dismiss();
  };

  return (
    <>
      <Pressable
        onPress={() => ref.current?.present()}
        className="flex-row items-center bg-slate-800 rounded-full px-3 py-1.5 active:opacity-80"
      >
        <Text className="text-slate-300 text-xs">{language}</Text>
        <ChevronDown
          size={14}
          color="#94a3b8"
          style={{ marginLeft: 4 }}
        />
      </Pressable>

      <BottomSheetModal
        ref={ref}
        snapPoints={['35%']}
        backgroundStyle={{ backgroundColor: '#0f172a' }}
        handleIndicatorStyle={{ backgroundColor: '#475569' }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView
          style={{ paddingHorizontal: 24, paddingVertical: 8 }}
        >
          <Text className="text-slate-500 text-xs uppercase tracking-widest mb-3">
            Learner language
          </Text>
          {LANGUAGES.map((l) => (
            <Pressable
              key={l}
              onPress={() => select(l)}
              className="flex-row items-center justify-between py-3 active:opacity-60"
            >
              <Text className="text-white text-base">{l}</Text>
              {l === language && <Check size={20} color="#10b981" />}
            </Pressable>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
