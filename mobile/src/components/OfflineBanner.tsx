import { Text, View } from 'react-native';

import { useProgress } from '../state/ProgressContext';

export function OfflineBanner() {
  const { isOnline, pendingCount } = useProgress();

  if (isOnline && pendingCount === 0) return null;

  const message = !isOnline
    ? pendingCount > 0
      ? `Offline · ${pendingCount} pending — will sync when you reconnect.`
      : 'Offline — changes will sync when you reconnect.'
    : `${pendingCount} pending sync${pendingCount === 1 ? '' : 's'} — retrying…`;

  return (
    <View className="bg-amber-950 px-4 py-2 flex-row items-center border-b border-amber-900">
      <View className="w-2 h-2 rounded-full bg-amber-400 mr-2" />
      <Text className="text-amber-100 text-xs flex-1">{message}</Text>
    </View>
  );
}
