import { useCallback, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { LogOut } from 'lucide-react-native';

import { useAuth } from '../auth/AuthContext';

export function UserMenu() {
  const { user, signOut } = useAuth();
  const router = useRouter();
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

  if (!user) return null;

  const initial = (user.name?.[0] ?? user.email[0] ?? '').toUpperCase();

  const handleSignOut = () => {
    ref.current?.dismiss();
    void signOut();
  };

  const goTo = (path: '/privacy' | '/terms') => {
    ref.current?.dismiss();
    router.push(path);
  };

  return (
    <>
      <Pressable
        onPress={() => ref.current?.present()}
        className="bg-blue-600 rounded-full w-10 h-10 items-center justify-center active:opacity-80"
      >
        <Text className="text-white font-semibold">{initial}</Text>
      </Pressable>

      <BottomSheetModal
        ref={ref}
        snapPoints={['42%']}
        backgroundStyle={{ backgroundColor: '#0f172a' }}
        handleIndicatorStyle={{ backgroundColor: '#475569' }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView
          style={{ paddingHorizontal: 24, paddingVertical: 12 }}
        >
          <Text className="text-slate-500 text-xs uppercase tracking-widest mb-2">
            Signed in as
          </Text>
          <Text className="text-white text-base font-semibold">
            {user.name ?? user.email}
          </Text>
          {user.name && (
            <Text className="text-slate-400 text-sm">{user.email}</Text>
          )}

          <Pressable
            onPress={handleSignOut}
            className="flex-row items-center bg-slate-800 rounded-2xl px-4 py-3 mt-6 active:opacity-80"
          >
            <LogOut size={18} color="#fda4af" />
            <Text className="text-rose-300 ml-3 font-semibold">Sign out</Text>
          </Pressable>

          <View className="flex-row items-center justify-center mt-6">
            <Pressable onPress={() => goTo('/privacy')} className="active:opacity-70 px-2">
              <Text className="text-slate-500 text-xs uppercase tracking-widest">
                Privacy Policy
              </Text>
            </Pressable>
            <Text className="text-slate-700 text-xs px-1">·</Text>
            <Pressable onPress={() => goTo('/terms')} className="active:opacity-70 px-2">
              <Text className="text-slate-500 text-xs uppercase tracking-widest">
                Terms &amp; Conditions
              </Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
