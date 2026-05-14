import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import type { ReactNode } from 'react';

import { AuthProvider, useAuth } from '../src/auth/AuthContext';
import { OfflineBanner } from '../src/components/OfflineBanner';
import { FeedbackProvider } from '../src/state/FeedbackContext';
import { LanguageProvider } from '../src/state/LanguageContext';
import { ProgressProvider } from '../src/state/ProgressContext';
import '../global.css';

function InitGate({ children }: { children: ReactNode }) {
  const { initialized } = useAuth();
  if (!initialized) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-950">
        <ActivityIndicator color="#fff" />
      </View>
    );
  }
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <StatusBar style="light" />
          <AuthProvider>
            <ProgressProvider>
              <LanguageProvider>
                <FeedbackProvider>
                  <InitGate>
                    <SafeAreaView
                      edges={['top', 'bottom']}
                      style={{ flex: 1, backgroundColor: '#020617' }}
                    >
                      <OfflineBanner />
                      <Stack
                        screenOptions={{
                          headerShown: false,
                          contentStyle: { backgroundColor: '#020617' },
                        }}
                      />
                    </SafeAreaView>
                  </InitGate>
                </FeedbackProvider>
              </LanguageProvider>
            </ProgressProvider>
          </AuthProvider>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
