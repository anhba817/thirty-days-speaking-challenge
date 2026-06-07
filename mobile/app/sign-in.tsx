import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { GoogleSignInButton } from '../src/auth/GoogleSignInButton';
import { useAuth } from '../src/auth/AuthContext';

export default function SignInScreen() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) router.replace('/');
  }, [user, router]);

  return (
    <View className="flex-1 bg-slate-950 px-6 justify-center">
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

      <View className="mt-12 flex-row items-center justify-center">
        <Pressable onPress={() => router.push('/privacy')} className="active:opacity-70 px-2">
          <Text className="text-slate-500 text-xs uppercase tracking-widest">
            Privacy Policy
          </Text>
        </Pressable>
        <Text className="text-slate-700 text-xs px-1">·</Text>
        <Pressable onPress={() => router.push('/terms')} className="active:opacity-70 px-2">
          <Text className="text-slate-500 text-xs uppercase tracking-widest">
            Terms &amp; Conditions
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
