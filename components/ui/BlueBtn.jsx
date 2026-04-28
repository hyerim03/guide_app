import { Pressable, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { COLORS } from '../../constants/colors';

const BlueBtn = ({ label, onPress, style, textStyle }) => {
  const pressScale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Pressable
        style={[styles.button, style]}
        onPress={onPress}
        onPressIn={() => { pressScale.value = withSpring(0.95); }}
        onPressOut={() => { pressScale.value = withSpring(1); }}
      >
        <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default BlueBtn;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 64,
    paddingVertical: 16,
    borderRadius: 999,
    backgroundColor: COLORS.buttonBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.white,
  },
});
