import { useCallback } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../constants/colors';

export const SelectItem = ({
  section,
  subtitle = '환경',
  icon: Icon,
  color,
  onPress,
  delay = 0,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const pressScale = useSharedValue(1);

  useFocusEffect(
    useCallback(() => {
      opacity.value = 0;
      translateY.value = 20;
      opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
      translateY.value = withDelay(delay, withTiming(0, { duration: 400 }));
    }, [delay]),
  );

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: pressScale.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Pressable
        style={styles.box}
        onPress={onPress}
        onPressIn={() => {
          pressScale.value = withSpring(0.98);
        }}
        onPressOut={() => {
          pressScale.value = withSpring(1);
        }}
      >
        <View style={styles.wrap}>
          <View style={[styles.iconBox, { backgroundColor: color }]}>
            {Icon && <Icon size={36} color="#ffffff" />}
          </View>
          <Text style={styles.mainText}>{section}</Text>
          <Text style={styles.subText}>{subtitle}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 238,
    height: 238,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    alignItems: 'center',
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  subText: {
    color: COLORS.textSecondary,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 28,
  },
});
