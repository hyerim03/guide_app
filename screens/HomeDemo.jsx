import { useEffect } from 'react';
import { StyleSheet, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { COLORS } from '../constants/colors';

const HomeDemo = () => {
  const navigation = useNavigation();
  const opacity = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const navigateOut = () => {
    navigation.navigate('home_select');
  };

  useEffect(() => {
    // fade in
    opacity.value = withTiming(1, { duration: 350 });

    const timer = setTimeout(() => {
      // fade out then navigate
      opacity.value = withTiming(0, { duration: 350 }, finished => {
        if (finished) runOnJS(navigateOut)();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <StatusBar hidden={true} />
      <LinearGradient
        style={styles.container}
        colors={[COLORS.gradientFrom, COLORS.gradientMid, COLORS.gradientTo]}
        locations={[0.01, 0.58, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Animated.Text style={[styles.mainText, animStyle]}>
          가정 환경에서는 온도, 습도, 조도를 제어할 수 있습니다.
        </Animated.Text>
        <Animated.Text style={[styles.subText, animStyle]}>
          원하시는 항목을 선택해주세요
        </Animated.Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeDemo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 64,
  },
  subText: {
    fontSize: 20,
    fontWeight: 'medium',
    color: '#B3B3B3',
  },
});
