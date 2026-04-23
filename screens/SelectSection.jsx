import { useCallback } from 'react';
import { StyleSheet, StatusBar, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SelectItem } from '../components/SelectItem';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Warehouse, Factory, Home, UtensilsCrossed } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { COLORS } from '../constants/colors';

const selectList = [
  {
    id: 'logistics',
    title: '물류',
    subtitle: '환경',
    icon: Warehouse,
    color: COLORS.accent,
  },
  {
    id: 'production',
    title: '생산',
    subtitle: '환경',
    icon: Factory,
    color: COLORS.accent,
  },
  {
    id: 'home',
    title: '가정',
    subtitle: '환경',
    icon: Home,
    color: COLORS.accent,
  },
  {
    id: 'restaurant',
    title: '식당',
    subtitle: '환경',
    icon: UtensilsCrossed,
    color: COLORS.accent,
  },
];

const AnimatedCard = ({ section, icon, color, onPress, delay }) => {
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
      <SelectItem
        section={section}
        icon={icon}
        color={color}
        onPress={onPress}
        onPressIn={() => {
          pressScale.value = withSpring(0.98);
        }}
        onPressOut={() => {
          pressScale.value = withSpring(1);
        }}
      />
    </Animated.View>
  );
};

const SelectSection = () => {
  const navigation = useNavigation();

  const homeOpacity = useSharedValue(0);
  const homeX = useSharedValue(-20);
  const homePressScale = useSharedValue(1);
  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(-20);

  useFocusEffect(
    useCallback(() => {
      homeOpacity.value = 0;
      homeX.value = -20;
      homeOpacity.value = withTiming(1, { duration: 400 });
      homeX.value = withTiming(0, { duration: 400 });

      titleOpacity.value = 0;
      titleY.value = -20;
      titleOpacity.value = withTiming(1, { duration: 600 });
      titleY.value = withTiming(0, { duration: 600 });
    }, []),
  );

  const homeAnimStyle = useAnimatedStyle(() => ({
    opacity: homeOpacity.value,
    transform: [{ translateX: homeX.value }, { scale: homePressScale.value }],
  }));

  const titleAnimStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  const onPressItem = (id, title, subtitle) => {
    const sectionTitle = `${title}${subtitle}`;
    if (id === 'logistics' || id === 'home') {
      navigation.navigate('wait', { sectionTitle });
    }
  };

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
        <Animated.View style={[styles.homeBtn, homeAnimStyle]}>
          <Pressable
            onPress={() => navigation.navigate('start')}
            onPressIn={() => {
              homePressScale.value = withSpring(0.95);
            }}
            onPressOut={() => {
              homePressScale.value = withSpring(1);
            }}
            style={styles.homeBtnInner}
          >
            <Text style={styles.homeBtnText}>⌂</Text>
          </Pressable>
        </Animated.View>

        <Animated.Text style={[styles.mainText, titleAnimStyle]}>
          환경을 선택해주세요
        </Animated.Text>

        <View style={styles.wrapItem}>
          {selectList.map((item, index) => (
            <AnimatedCard
              key={item.id}
              section={item.title}
              icon={item.icon}
              color={item.color}
              onPress={() => onPressItem(item.id, item.title, item.subtitle)}
              delay={index * 100}
            />
          ))}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SelectSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  homeBtn: {
    position: 'absolute',
    top: 32,
    left: 32,
  },
  homeBtnInner: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeBtnText: {
    fontSize: 24,
    color: COLORS.textPrimary,
  },
  mainText: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 48,
  },
  wrapItem: {
    flexDirection: 'row',
    gap: 24,
  },
});
