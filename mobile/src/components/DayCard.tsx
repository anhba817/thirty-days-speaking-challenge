import { Pressable, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { Check } from 'lucide-react-native';

interface Props {
  id: number;
  title: string;
  completed?: boolean;
}

export function DayCard({ id, title, completed }: Props) {
  return (
    <Link href={`/day/${id}`} asChild>
      <Pressable className="bg-slate-800 rounded-2xl p-4 mb-3 w-[48%] active:opacity-80">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-slate-500 text-xs uppercase tracking-widest">
            Day {id}
          </Text>
          {completed ? (
            <View className="w-5 h-5 rounded-full bg-emerald-500 items-center justify-center">
              <Check size={12} color="#0f172a" strokeWidth={3} />
            </View>
          ) : (
            <View className="w-5 h-5 rounded-full border border-slate-600" />
          )}
        </View>
        <Text
          className="text-white font-semibold text-sm leading-5"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </Pressable>
    </Link>
  );
}
