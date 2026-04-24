import { useState, useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  StatusBar,
  Pressable,
} from 'react-native';
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
import { ArrowLeft } from 'lucide-react-native';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/navigation';
import PrimaryButton from '../../components/PrimaryButton';
import ThermometerVisual from '../../components/home/ThermometerVisual';
import WaterLevelVisual from '../../components/home/WaterLevelVisual';
import BrightnessVisual from '../../components/home/BrightnessVisual';

const THUMB_SIZE = 28;

const toTimeString = minutes => {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0');
  const m = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};

const ControlSliderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    controlId = 'temperature',
    unit = '',
    min = 0,
    max = 100,
    initial = 50,
    accentColor = '#ef4444',
    format = 'number',
    visualStyle = 'thermometer',
  } = route.params ?? {};

  const [value, setValue] = useState(initial);
  const [trackWidth, setTrackWidth] = useState(0);

  const trackWidthRef = useRef(0);
  const valueRef = useRef(initial);
  const startValueRef = useRef(initial);

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

  const handleChange = newVal => {
    valueRef.current = newVal;
    setValue(newVal);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        startValueRef.current = valueRef.current;
      },
      onPanResponderMove: (_, gs) => {
        const usableWidth = trackWidthRef.current - THUMB_SIZE;
        if (usableWidth <= 0) return;
        const startPos =
          ((startValueRef.current - min) / (max - min)) * usableWidth;
        const newPos = startPos + gs.dx;
        const pct = Math.max(0, Math.min(1, newPos / usableWidth));
        handleChange(Math.round(min + pct * (max - min)));
      },
    }),
  ).current;

  const fillPct = (value - min) / (max - min);
  const thumbLeft = trackWidth > 0 ? fillPct * (trackWidth - THUMB_SIZE) : 0;

  const renderVisual = () => {
    if (visualStyle === 'thermometer') {
      return <ThermometerVisual fillPct={fillPct} accentColor={accentColor} />;
    }
    if (visualStyle === 'waterlevel') {
      return <WaterLevelVisual fillPct={fillPct} accentColor={accentColor} />;
    }
    if (visualStyle === 'glow') {
      return <BrightnessVisual accentColor={accentColor} />;
    }
    return null;
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
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={28} color={COLORS.textPrimary} />
        </Pressable>

        <Animated.View style={[styles.content, animStyle]}>
          <Text style={styles.title}>
            슬라이드바를 움직여 작동을 제어해보세요
          </Text>

          <View style={styles.visualGroup}>
            {renderVisual()}
            <Text style={styles.valueText}>
              {format === 'time' ? toTimeString(value) : `${value}`}
              {format !== 'time' && <Text style={styles.unitText}>{unit}</Text>}
            </Text>
          </View>

          <View
            style={styles.sliderWrapper}
            onLayout={e => {
              const w = e.nativeEvent.layout.width;
              trackWidthRef.current = w;
              setTrackWidth(w);
            }}
            {...panResponder.panHandlers}
          >
            <View style={styles.track}>
              <View
                style={[
                  styles.fill,
                  { width: `${fillPct * 100}%`, backgroundColor: accentColor },
                ]}
              />
            </View>
            <View
              style={[
                styles.thumb,
                { left: thumbLeft, borderColor: accentColor },
              ]}
            />
          </View>

          <PrimaryButton
            label="설정"
            onPress={() =>
              navigation.navigate(ROUTES.HOME_RESULT, {
                controlId,
                value,
                accentColor,
                visualStyle,
                format,
                unit,
                min,
                max,
              })
            }
          />
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ControlSliderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 32,
    left: 32,
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '80%',
    alignItems: 'center',
    gap: 36,
  },
  visualGroup: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 44,
  },
  valueText: {
    fontSize: 40,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  unitText: {
    fontSize: 40,
    fontWeight: '700',
  },
  sliderWrapper: {
    width: '100%',
    height: THUMB_SIZE,
    justifyContent: 'center',
  },
  track: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 6,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: COLORS.white,
    borderWidth: 3,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
