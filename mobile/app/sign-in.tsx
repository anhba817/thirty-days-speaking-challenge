import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { GoogleSignInButton } from '../src/auth/GoogleSignInButton';

export default function SignInScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <View className="flex-1 px-6 justify-center">
        <Text className="text-white text-4xl font-bold text-center mb-3">
          IELTS 30-Day
        </Text>
        <Text className="text-slate-400 text-center mb-12">
          Sign in to sync your progress across devices.
        </Text>
        <GoogleSignInButton />
        <Pressable
          onPress={() => router.replace('/')}
          className="mt-8 self-center"
        >
          <Text className="text-slate-400 text-sm underline">
            Continue without signing in
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
