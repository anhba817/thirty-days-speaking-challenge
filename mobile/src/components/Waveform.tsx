import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const BAR_COUNT = 15;
const BAR_HEIGHT = 36;

function Bar({ delay, active }: { delay: number; active: boolean }) {
  const scale = useSharedValue(0.3);

  useEffect(() => {
    if (active) {
      scale.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(1, { duration: 360 }),
            withTiming(0.3, { duration: 360 }),
          ),
          -1,
          true,
        ),
      );
    } else {
      cancelAnimation(scale);
      scale.value = withTiming(0.3, { duration: 200 });
    }
    return () => {
      cancelAnimation(scale);
    };
  }, [active, delay, scale]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scaleY: scale.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: 4,
          height: BAR_HEIGHT,
          marginHorizontal: 2,
          borderRadius: 2,
          backgroundColor: active ? '#3b82f6' : '#475569',
        },
        style,
      ]}
    />
  );
}

export function Waveform({ active }: { active: boolean }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: BAR_HEIGHT + 8,
      }}
    >
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <Bar key={i} delay={i * 80} active={active} />
      ))}
    </View>
  );
}
