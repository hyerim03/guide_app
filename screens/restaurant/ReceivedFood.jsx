import { useCallback } from 'react';
import { StyleSheet, StatusBar, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Check } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useMqtt from '../../hook/useMqtt';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/navigation';

const FOOD_NAMES = {
  1: '아메리카노',
  2: '카페라떼',
  3: '바닐라라떼',
  4: '카푸치노',
};

const ReceivedFood = ({ route }) => {
  const navigation = useNavigation();
  const { publish } = useMqtt();
  const { seat, food } = route?.params ?? {};

  const cardOpacity = useSharedValue(0);
  const cardY = useSharedValue(20);
  const iconScale = useSharedValue(0);
  const btnOpacity = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      cardOpacity.value = 0;
      cardY.value = 20;
      iconScale.value = 0;
      btnOpacity.value = 0;

      cardOpacity.value = withTiming(1, { duration: 400 });
      cardY.value = withTiming(0, { duration: 400 });
      iconScale.value = withSpring(1, { stiffness: 200, damping: 15 });
      btnOpacity.value = withDelay(300, withTiming(1, { duration: 400 }));
    }, []),
  );

  const cardAnimStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardY.value }],
  }));

  const iconAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const btnAnimStyle = useAnimatedStyle(() => ({
    opacity: btnOpacity.value,
  }));

  const handlePickup = () => {
    publish('ping', 'serve_com');
    navigation.navigate(ROUTES.DEMO_END, { sectionTitle: '식당' });
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
        <Animated.View style={[styles.card, cardAnimStyle]}>
          {/* Check icon */}
          <Animated.View style={[styles.iconWrap, iconAnimStyle]}>
            <View style={styles.iconCircle}>
              <Check size={40} color={COLORS.buttonBlue} strokeWidth={2.5} />
            </View>
          </Animated.View>

          <Text style={styles.title}>음식이 도착했습니다</Text>
          <Text style={styles.subtitle}>주문하신 음식을 수령해주세요</Text>

          {/* Order info */}
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

          {/* Button */}
          <Animated.View style={[styles.btnWrap, btnAnimStyle]}>
            <Pressable onPress={handlePickup} style={styles.btn}>
              <Text style={styles.btnText}>음식 수령 완료</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ReceivedFood;

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
  iconWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.bgBlue,
    alignItems: 'center',
    justifyContent: 'center',
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
  btnWrap: {
    width: '100%',
  },
  btn: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: COLORS.buttonBlue,
    borderRadius: 16,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.white,
  },
});
