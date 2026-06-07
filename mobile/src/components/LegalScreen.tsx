import { Fragment } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

import {
  LEGAL_EFFECTIVE_DATE,
  PRIVACY_SECTIONS,
  TERMS_SECTIONS,
  type LegalSection,
} from '../legal/legalContent';

const META: Record<'privacy' | 'terms', { title: string; sections: LegalSection[] }> = {
  privacy: { title: 'Privacy Policy', sections: PRIVACY_SECTIONS },
  terms: { title: 'Terms & Conditions', sections: TERMS_SECTIONS },
};

function SectionBody({ body }: { body: string[] }) {
  return (
    <View className="mt-2">
      {body.map((line, i) =>
        line.startsWith('- ') ? (
          <View key={i} className="flex-row mt-2">
            <View className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3" />
            <Text className="flex-1 text-slate-400 leading-6">{line.slice(2)}</Text>
          </View>
        ) : (
          <Text key={i} className="text-slate-400 leading-6 mt-2">
            {line}
          </Text>
        ),
      )}
    </View>
  );
}

export function LegalScreen({ doc }: { doc: 'privacy' | 'terms' }) {
  const router = useRouter();
  const { title, sections } = META[doc];

  return (
    <View className="flex-1 bg-slate-950">
      <View className="flex-row items-center px-4 pt-2 pb-3">
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
          className="flex-row items-center active:opacity-70 py-2 pr-3"
        >
          <ChevronLeft size={22} color="#94a3b8" />
          <Text className="text-slate-400 text-base ml-1">Back</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 48 }}>
        <Text className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">
          Legal
        </Text>
        <Text className="text-white text-3xl font-bold mb-1">{title}</Text>
        <Text className="text-slate-500 text-xs uppercase tracking-widest mb-8">
          Effective {LEGAL_EFFECTIVE_DATE}
        </Text>

        {sections.map((section) => (
          <Fragment key={section.heading}>
            <Text className="text-white text-lg font-semibold mt-6">{section.heading}</Text>
            <SectionBody body={section.body} />
          </Fragment>
        ))}
      </ScrollView>
    </View>
  );
}
