import { useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
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

const DemoScreen = ({ route }) => {
  const { mainText, subText, nextRoute } = route.params;
  const navigation = useNavigation();
  const opacity = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const navigateOut = () => {
    navigation.navigate(nextRoute);
  };

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 350 });

    const timer = setTimeout(() => {
      opacity.value = withTiming(0, { duration: 350 }, finished => {
        if (finished) runOnJS(navigateOut)();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
        <Animated.Text style={[styles.mainText, animStyle]}>
          {mainText}
        </Animated.Text>
        <Animated.Text style={[styles.subText, animStyle]}>
          {subText}
        </Animated.Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default DemoScreen;

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
