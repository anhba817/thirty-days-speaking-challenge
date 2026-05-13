import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { useAuth } from './AuthContext';

const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
const IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;

let configured = false;
function configureOnce() {
  if (configured || !WEB_CLIENT_ID) return;
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
  });
  configured = true;
}

export function GoogleSignInButton() {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  configureOnce();

  if (!WEB_CLIENT_ID) {
    return (
      <Text className="text-xs text-slate-500 uppercase tracking-widest">
        Sign-in unavailable — set EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID
      </Text>
    );
  }

  const handlePress = async () => {
    setError(null);
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        const idToken = response.data.idToken;
        if (!idToken) throw new Error('No ID token returned');
        await signIn(idToken);
      }
    } catch (err) {
      if (
        isErrorWithCode(err) &&
        (err.code === statusCodes.SIGN_IN_CANCELLED ||
          err.code === statusCodes.IN_PROGRESS)
      ) {
        return;
      }
      console.error('Google sign-in failed', err);
      setError('Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="items-center">
      <Pressable
        onPress={handlePress}
        disabled={loading}
        className="bg-white rounded-full px-8 py-3 active:opacity-80"
      >
        {loading ? (
          <ActivityIndicator color="#1f2937" />
        ) : (
          <Text className="text-slate-900 font-semibold">
            Sign in with Google
          </Text>
        )}
      </Pressable>
      {error && (
        <Text className="text-red-400 text-xs mt-3 text-center">{error}</Text>
      )}
    </View>
  );
}
