import { useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Text, StyleSheet, StatusBar, useColorScheme } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import useMqtt from '../hook/useMqtt';
import { THEMES } from '../constants/colors';
import { ROUTES } from '../constants/navigation';
import PrimaryButton from '../components/PrimaryButton';

const StartScreen = () => {
  const navigation = useNavigation();
  const { publish } = useMqtt();
  const colorScheme = useColorScheme();
  const theme = THEMES[colorScheme] ?? THEMES.light;

  const textOpacity = useSharedValue(0);
  const textY = useSharedValue(20);
  const opacity = useSharedValue(0);
  const entryScale = useSharedValue(0.9);

  useFocusEffect(
    useCallback(() => {
      textOpacity.value = 0;
      textY.value = 20;
      opacity.value = 0;
      entryScale.value = 0.9;

      textOpacity.value = withTiming(1, { duration: 600 });
      textY.value = withTiming(0, { duration: 600 });
      opacity.value = withDelay(300, withTiming(1, { duration: 400 }));
      entryScale.value = withDelay(300, withTiming(1, { duration: 400 }));
    }, []),
  );

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textY.value }],
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: entryScale.value }],
  }));

  const onClickStart = () => {
    publish('ping/start', 'START');
    navigation.navigate(ROUTES.SELECT);
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <StatusBar
        hidden={false}
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <LinearGradient
        style={styles.container}
        colors={[theme.gradientFrom, theme.gradientMid, theme.gradientTo]}
        locations={[0.01, 0.58, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Animated.View style={[styles.textWrap, textAnimatedStyle]}>
          <Text style={[styles.mainText, { color: theme.textPrimary }]}>안녕하세요</Text>
          <Text style={[styles.subText, { color: theme.textPrimary }]}>
            관람을 하시려면{'\n'}아래 버튼을 클릭해주세요.
          </Text>
        </Animated.View>
        <Animated.View style={animatedStyle}>
          <PrimaryButton
            label="시작하기"
            onPress={onClickStart}
            style={{ backgroundColor: theme.buttonBg, borderColor: theme.buttonBorder }}
            textStyle={{ color: theme.buttonText }}
          />
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textWrap: {
    alignItems: 'center',
  },
  mainText: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  subText: {
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 50,
    marginBottom: 48,
  },
});
