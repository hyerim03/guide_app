import { Pressable, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { COLORS } from '../../constants/colors';

const PrimaryButton = ({ label, onPress, style, textStyle }) => {
  const pressScale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Pressable
        style={[styles.button, style]}
        onPress={onPress}
        onPressIn={() => {
          pressScale.value = withSpring(0.95);
        }}
        onPressOut={() => {
          pressScale.value = withSpring(1);
        }}
      >
        <Text style={[styles.buttonText, textStyle]}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    height: 74,
    paddingHorizontal: 64,
    borderRadius: 37,
    borderWidth: 1,
    backgroundColor: COLORS.buttonLight,
    borderColor: '#D4D9DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
});
