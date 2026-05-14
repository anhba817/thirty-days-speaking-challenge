import { Dimensions, ScrollView, Text, View } from 'react-native';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import type { Question } from '../data/challenge';

const SCREEN_PADDING = 20;

interface Props {
  questions: Question[];
  index: number;
  onIndexChange: (i: number) => void;
}

export function QuestionPager({ questions, index, onIndexChange }: Props) {
  const itemWidth = Dimensions.get('window').width - SCREEN_PADDING * 2;

  const handleEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / itemWidth);
    if (i !== index) onIndexChange(i);
  };

  return (
    <View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        onMomentumScrollEnd={handleEnd}
      >
        {questions.map((q, i) => (
          <View key={i} style={{ width: itemWidth }}>
            <View className="bg-slate-900 rounded-2xl p-5 min-h-[140px]">
              <Text className="text-slate-500 text-xs uppercase tracking-widest mb-3">
                Question {i + 1} of {questions.length}
              </Text>
              <Text className="text-white text-lg leading-7">{q.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {questions.length > 1 && (
        <View className="flex-row justify-center mt-3">
          {questions.map((_, i) => (
            <View
              key={i}
              className={`w-2 h-2 rounded-full mx-1 ${
                i === index ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
}
