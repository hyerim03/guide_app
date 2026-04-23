import { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { COLORS } from '../constants/colors';

const BOUNCE_HEIGHT = -3;
const DURATION = 420;
const STAGGER_DELAY = 130;

const Dot = ({ animValue }) => {
  const translateY = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, BOUNCE_HEIGHT],
  });
  return (
    <Animated.View style={[styles.dot, { transform: [{ translateY }] }]} />
  );
};

const LoadingDot = () => {
  const anim0 = useRef(new Animated.Value(0)).current;
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounce = anim =>
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: DURATION / 2,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: DURATION / 2,
          useNativeDriver: true,
        }),
      ]);

    const loop = Animated.loop(
      Animated.stagger(STAGGER_DELAY, [bounce(anim0), bounce(anim1), bounce(anim2)]),
    );

    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <View style={styles.dots}>
      <Dot animValue={anim0} />
      <Dot animValue={anim1} />
      <Dot animValue={anim2} />
    </View>
  );
};

export default LoadingDot;

const styles = StyleSheet.create({
  dots: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.dot,
  },
});
