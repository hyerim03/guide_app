import { useCallback } from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants/navigation';
import { COLORS } from '../../constants/colors';
import LoadingDot from '../../components/ui/LoadingDot';

const GetFoodMove = () => {
  const navigation = useNavigation();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useFocusEffect(
    useCallback(() => {
      opacity.value = 0;
      translateY.value = 20;
      opacity.value = withTiming(1, { duration: 400 });
      translateY.value = withTiming(0, { duration: 400 });

      const timer = setTimeout(() => {
        navigation.navigate(ROUTES.RECEIVED);
      }, 5000);

      return () => clearTimeout(timer);
    }, []),
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
          <Text style={styles.title}>주문이 완료되었습니다</Text>
          <Text style={styles.subtitle}>로봇이 음식을 가지고 이동합니다</Text>
          <View style={styles.loadingWrap}>
            <LoadingDot />
          </View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default GetFoodMove;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
  loadingWrap: {
    marginTop: 32,
  },
});
