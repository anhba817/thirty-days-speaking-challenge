import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import { useAuth } from '../src/auth/AuthContext';
import { DayCard } from '../src/components/DayCard';
import { CHALLENGE_DATA } from '../src/data/challenge';

const PHASE_META: Record<1 | 2 | 3, { name: string; range: string }> = {
  1: { name: 'Foundations', range: 'Days 1–10' },
  2: { name: 'Idea Expansion', range: 'Days 11–20' },
  3: { name: 'Critical Analysis', range: 'Days 21–30' },
};

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const completedDays: number[] = []; // Phase 6 wires real progress

  const sections = ([1, 2, 3] as const).map((phase) => ({
    phase,
    days: CHALLENGE_DATA.filter((d) => d.phase === phase),
  }));

  const initial = (user?.name?.[0] ?? user?.email[0] ?? '').toUpperCase();

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        <View className="flex-row items-center justify-between mt-4 mb-6">
          <View>
            <Text className="text-slate-500 text-xs uppercase tracking-widest">
              IELTS 30-Day
            </Text>
            <Text className="text-white text-2xl font-bold">
              Speaking Challenge
            </Text>
          </View>
          {user ? (
            <Pressable
              onPress={() => {
                void signOut();
              }}
              className="bg-slate-800 rounded-full w-10 h-10 items-center justify-center active:opacity-80"
            >
              <Text className="text-white font-semibold">{initial}</Text>
            </Pressable>
          ) : (
            <Link href="/sign-in" asChild>
              <Pressable className="bg-slate-800 rounded-full px-4 py-2 active:opacity-80">
                <Text className="text-white text-sm">Sign in</Text>
              </Pressable>
            </Link>
          )}
        </View>

        <View className="bg-slate-900 rounded-2xl p-5 mb-8">
          <Text className="text-slate-500 text-xs uppercase tracking-widest mb-2">
            Progress
          </Text>
          <View className="flex-row items-baseline">
            <Text className="text-white text-4xl font-bold">
              {completedDays.length}
            </Text>
            <Text className="text-slate-500 text-xl ml-1">/ 30</Text>
          </View>
          <Text className="text-slate-400 text-sm mt-1">
            {30 - completedDays.length} days remaining
          </Text>
        </View>

        {sections.map(({ phase, days }) => (
          <View key={phase} className="mb-6">
            <Text className="text-slate-500 text-xs uppercase tracking-widest mb-1">
              Phase {phase} · {PHASE_META[phase].range}
            </Text>
            <Text className="text-white text-lg font-semibold mb-3">
              {PHASE_META[phase].name}
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {days.map((d) => (
                <DayCard
                  key={d.id}
                  id={d.id}
                  title={d.title}
                  completed={completedDays.includes(d.id)}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
