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

const FOOD_NAMES = {
  1: '아메리카노',
  2: '카페라떼',
  3: '바닐라라떼',
  4: '카푸치노',
};

const GetFoodMove = ({ route }) => {
  const navigation = useNavigation();
  const { food, seat } = route?.params ?? {};

  const cardOpacity = useSharedValue(0);
  const cardY = useSharedValue(20);

  useFocusEffect(
    useCallback(() => {
      cardOpacity.value = 0;
      cardY.value = 20;
      cardOpacity.value = withTiming(1, { duration: 400 });
      cardY.value = withTiming(0, { duration: 400 });

      const timer = setTimeout(() => {
        navigation.navigate(ROUTES.RECEIVED, { food, seat });
      }, 5000);

      return () => clearTimeout(timer);
    }, []),
  );

  const cardAnimStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardY.value }],
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
        <Animated.View style={[styles.card, cardAnimStyle]}>
          <Text style={styles.title}>주문이 완료되었습니다</Text>
          <Text style={styles.subtitle}>로봇이 음식을 가지고 이동중입니다</Text>

          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>좌석 번호</Text>
              <Text style={styles.infoValue}>{seat}번 테이블</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoFoodRow}>
              <Text style={styles.infoLabel}>주문 메뉴</Text>
              <View style={styles.badgeWrap}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {FOOD_NAMES[food] ?? food}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.loadingSection}>
            <Text style={styles.loadingLabel}>배달 준비중</Text>
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
    paddingHorizontal: 32,
  },
  card: {
    width: '100%',
    maxWidth: 560,
    backgroundColor: COLORS.white,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  infoBox: {
    marginBottom: 32,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  infoFoodRow: {
    paddingVertical: 16,
    gap: 12,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 17,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  badgeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: COLORS.bgBlue,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.buttonBlue,
  },
  loadingSection: {
    alignItems: 'center',
  },
  loadingLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
});
