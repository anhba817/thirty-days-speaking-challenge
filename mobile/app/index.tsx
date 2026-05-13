import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

import { useAuth } from '../src/auth/AuthContext';

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <View className="flex-1 items-center justify-center px-6 gap-4">
        <Text className="text-white text-3xl font-bold">IELTS 30-Day</Text>

        {user ? (
          <>
            <Text className="text-slate-300 text-center">
              Signed in as {user.email}
            </Text>
            <Pressable
              onPress={() => {
                void signOut();
              }}
              className="bg-slate-800 rounded-full px-6 py-2 active:opacity-80"
            >
              <Text className="text-white">Sign out</Text>
            </Pressable>
          </>
        ) : (
          <Link href="/sign-in" asChild>
            <Pressable className="bg-white rounded-full px-6 py-2 active:opacity-80">
              <Text className="text-slate-900 font-semibold">Sign in</Text>
            </Pressable>
          </Link>
        )}

        <Text className="text-slate-500 text-xs mt-8 text-center">
          Phase 2 placeholder · Dashboard ships in Phase 3
        </Text>
      </View>
    </SafeAreaView>
  );
}
