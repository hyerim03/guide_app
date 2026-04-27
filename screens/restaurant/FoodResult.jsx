import { useCallback } from 'react';
import { StyleSheet, StatusBar, Text, View, Pressable } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/navigation';

const FOOD_NAMES = {
  1: '아메리카노',
  2: '카페라떼',
  3: '바닐라라떼',
  4: '카푸치노',
};

const FoodResult = ({ route }) => {
  const navigation = useNavigation();
  const { seat, food } = route?.params ?? {};

  const checkScale = useSharedValue(0);
  const containerOpacity = useSharedValue(0);
  const containerY = useSharedValue(20);
  const btnOpacity = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      checkScale.value = 0;
      containerOpacity.value = 0;
      containerY.value = 20;
      btnOpacity.value = 0;

      checkScale.value = withSpring(1, { stiffness: 200, damping: 15 });
      containerOpacity.value = withTiming(1, { duration: 400 });
      containerY.value = withTiming(0, { duration: 400 });
      btnOpacity.value = withDelay(300, withTiming(1, { duration: 400 }));
    }, []),
  );

  const checkAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  const containerAnimStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
    transform: [{ translateY: containerY.value }],
  }));

  const btnAnimStyle = useAnimatedStyle(() => ({
    opacity: btnOpacity.value,
  }));

  const handleComplete = () => {
    navigation.navigate(ROUTES.GET_FOOD_MOVE);
  };

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
        <Animated.View style={[styles.inner, containerAnimStyle]}>
          <Animated.View style={[styles.checkWrap, checkAnimStyle]}>
            <CheckCircle
              size={96}
              color={COLORS.buttonBlue}
              strokeWidth={2.5}
            />
          </Animated.View>

          <Text style={styles.title}>주문 내역</Text>

          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>좌석</Text>
              <Text style={styles.cardValue}>{seat}번 테이블</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.cardFoodSection}>
              <Text style={styles.cardLabel}>주문 음식</Text>
              <View style={styles.foodBadgeWrap}>
                <View style={styles.foodBadge}>
                  <Text style={styles.foodBadgeText}>
                    {FOOD_NAMES[food] ?? food}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <Animated.View style={btnAnimStyle}>
            <Pressable onPress={handleComplete} style={styles.confirmBtn}>
              <Text style={styles.confirmBtnText}>주문 확인</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default FoodResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  checkWrap: {
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 32,
    textAlign: 'center',
  },
  card: {
    minWidth: 627,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 32,
    marginBottom: 32,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  cardFoodSection: {
    paddingVertical: 16,
    gap: 16,
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  foodBadgeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  foodBadge: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.buttonLight,
    borderRadius: 999,
  },
  foodBadgeText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  confirmBtn: {
    paddingHorizontal: 64,
    paddingVertical: 18,
    backgroundColor: COLORS.buttonBlue,
    borderRadius: 999,
  },
  confirmBtnText: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
  },
});
