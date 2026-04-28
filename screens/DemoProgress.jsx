import { useCallback } from 'react';
import { StyleSheet, Text, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { ROUTES } from '../constants/navigation';
import LoadingDot from '../components/ui/LoadingDot';

const DemoProgress = ({ route }) => {
  const navigation = useNavigation();
  const { sectionTitle = '환경' } = route?.params ?? {};
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useFocusEffect(
    useCallback(() => {
      opacity.value = 0;
      translateY.value = 20;
      opacity.value = withTiming(1, { duration: 400 });
      translateY.value = withTiming(0, { duration: 400 });

      const timer = setTimeout(() => {
        navigation.navigate(ROUTES.DEMO_END, { sectionTitle });
      }, 5000);

      return () => clearTimeout(timer);
    }, [sectionTitle]),
  );

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <StatusBar hidden />
      <LinearGradient
        style={styles.container}
        colors={[COLORS.gradientFrom, COLORS.gradientMid, COLORS.gradientTo]}
        locations={[0.01, 0.58, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Animated.View style={[styles.inner, animStyle]}>
          <Text style={styles.mainText}>시연이 진행중입니다</Text>
          <Text style={styles.subText}>
            안내가 완료될 때까지 잠시 기다려 주세요
          </Text>
          <LoadingDot />
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default DemoProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
  },
  mainText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  subText: {
    fontSize: 24,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
});
