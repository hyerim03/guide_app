import { useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/navigation';
import PrimaryButton from '../../components/PrimaryButton';
import ThermometerVisual from '../../components/home/ThermometerVisual';
import WaterLevelVisual from '../../components/home/WaterLevelVisual';
import BrightnessVisual from '../../components/home/BrightnessVisual';

const toTimeString = minutes => {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0');
  const m = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};

const ACTION_MAP = {
  temperature: '선풍기를 작동합니다',
  humidity: '가습기를 작동합니다',
  brightness: '조명을 조절합니다',
};

const ControlResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    controlId = 'temperature',
    value = 0,
    accentColor = '#ef4444',
    visualStyle = 'thermometer',
    format = 'number',
    unit = '',
    min = 0,
    max = 100,
  } = route.params ?? {};

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useFocusEffect(
    useCallback(() => {
      opacity.value = 0;
      translateY.value = 20;
      opacity.value = withTiming(1, { duration: 350 });
      translateY.value = withTiming(0, { duration: 350 });
    }, []),
  );

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const fillPct = (value - min) / (max - min);

  const renderVisual = () => {
    if (visualStyle === 'thermometer')
      return <ThermometerVisual fillPct={fillPct} accentColor={accentColor} />;
    if (visualStyle === 'waterlevel')
      return <WaterLevelVisual fillPct={fillPct} accentColor={accentColor} />;
    if (visualStyle === 'glow')
      return <BrightnessVisual accentColor={accentColor} />;
    return null;
  };

  const getTitle = () => {
    const display = format === 'time' ? toTimeString(value) : `${value}${unit}`;
    switch (controlId) {
      case 'temperature':
        return `온도가 ${display}로 설정되었습니다`;
      case 'humidity':
        return `습도가 ${display}로 설정되었습니다`;
      case 'brightness':
        return `현재 시간이 ${display}로 설정되었습니다`;
      default:
        return '설정되었습니다';
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
        <Animated.View style={[styles.content, animStyle]}>
          <View style={styles.infoRow}>
            {renderVisual()}
            <View style={styles.textGroup}>
              <Text style={styles.title}>{getTitle()}</Text>
              <Text style={styles.action}>{ACTION_MAP[controlId] ?? ''}</Text>
            </View>
          </View>

          <View style={styles.buttons}>
            <PrimaryButton
              label="뒤로가기"
              onPress={() => navigation.goBack()}
              style={styles.btnOverride}
            />
            <PrimaryButton
              label="목록으로 가기"
              onPress={() => navigation.navigate(ROUTES.HOME_SELECT)}
              style={styles.btnOverride}
            />
          </View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ControlResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    margin: 'auto',
    gap: 48,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
    margin: 'auto',
  },
  textGroup: {
    gap: 15,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 44,
  },
  action: {
    fontSize: 24,
    fontWeight: '400',
    color: COLORS.textSecondary,
  },
  buttons: {
    flexDirection: 'row',
    gap: 16,
  },
  btnOverride: {
    paddingHorizontal: 40,
  },
});
