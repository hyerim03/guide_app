import { useState, useCallback } from 'react';
import { StyleSheet, StatusBar, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useMenuStore from '../../stores/menu';
import { Check } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/navigation';

const FOODS = [
  { id: 1, name: '아메리카노', image: '☕' },
  { id: 2, name: '카페라떼', image: '🧋' },
  { id: 3, name: '바닐라라떼', image: '🥤' },
  { id: 4, name: '카푸치노', image: '🍵' },
];

const FoodCard = ({ food, selected, onPress, delay }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scale = useSharedValue(1);

  useFocusEffect(
    useCallback(() => {
      opacity.value = 0;
      translateY.value = 20;
      opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
      translateY.value = withDelay(delay, withTiming(0, { duration: 400 }));
    }, []),
  );

  const cardAnimStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.97);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      style={styles.cardWrapper}
    >
      <Animated.View
        style={[styles.card, selected && styles.cardSelected, cardAnimStyle]}
      >
        {selected && (
          <View style={styles.checkBadge}>
            <Check size={16} color={COLORS.white} strokeWidth={2.5} />
          </View>
        )}
        <Text style={styles.foodEmoji}>{food.image}</Text>
        <Text style={styles.foodName}>{food.name}</Text>
      </Animated.View>
    </Pressable>
  );
};

const FoodSelect = ({ route }) => {
  const [selectedFood, setSelectedFood] = useState(null);
  const navigation = useNavigation();
  const seat = route?.params?.seat ?? null;
  const { setNum } = useMenuStore();

  const containerOpacity = useSharedValue(0);
  const containerY = useSharedValue(20);

  useFocusEffect(
    useCallback(() => {
      containerOpacity.value = 0;
      containerY.value = 20;
      containerOpacity.value = withTiming(1, { duration: 400 });
      containerY.value = withTiming(0, { duration: 400 });
      setSelectedFood(null);
    }, []),
  );

  const containerAnimStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
    transform: [{ translateY: containerY.value }],
  }));

  const toggleFood = id => {
    setSelectedFood(prev => (prev === id ? null : id));
  };

  const handleConfirm = () => {
    if (selectedFood !== null) {
      setNum(selectedFood);
      navigation.navigate(ROUTES.FOOD_RESULT, { food: selectedFood, seat });
    }
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
          <Text style={styles.title}>음식을 선택해주세요.</Text>

          <View style={styles.grid}>
            {FOODS.map((food, index) => (
              <FoodCard
                key={food.id}
                food={food}
                selected={selectedFood === food.id}
                onPress={() => toggleFood(food.id)}
                delay={index * 100}
              />
            ))}
          </View>

          <View style={styles.confirmWrap}>
            <Pressable
              onPress={handleConfirm}
              disabled={selectedFood === null}
              style={[
                styles.confirmBtn,
                selectedFood === null && styles.confirmBtnDisabled,
              ]}
            >
              <Text
                style={[
                  styles.confirmBtnText,
                  selectedFood === null && styles.confirmBtnTextDisabled,
                ]}
              >
                선택
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default FoodSelect;

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
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 40,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 40,
  },
  cardWrapper: {
    width: 206,
  },
  card: {
    width: 206,
    height: 206,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  cardSelected: {
    backgroundColor: COLORS.bgBlue,
    borderColor: COLORS.buttonBlue,
  },
  checkBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.buttonBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  foodName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  confirmWrap: {
    alignItems: 'center',
  },
  confirmBtn: {
    paddingHorizontal: 64,
    paddingVertical: 23,
    backgroundColor: COLORS.buttonLight,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D3DCE4',
  },
  confirmBtnDisabled: {
    backgroundColor: '#DEE5ED',
    borderColor: 'transparent',
  },
  confirmBtnText: {
    fontSize: 24,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  confirmBtnTextDisabled: {
    color: '#687990',
  },
});
