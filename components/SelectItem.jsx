import { StyleSheet, View, Text, Pressable } from 'react-native';
import { COLORS } from '../constants/colors';

export const SelectItem = ({ section, icon: Icon, color, onPress, onPressIn, onPressOut }) => {
  return (
    <Pressable style={styles.box} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <View style={styles.wrap}>
        <View style={[styles.iconBox, { backgroundColor: color }]}>
          {Icon && <Icon size={36} color="#ffffff" />}
        </View>
        <Text style={styles.mainText}>{section}</Text>
        <Text style={styles.subText}>환경</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 238,
    height: 238,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    alignItems: 'center',
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  subText: {
    color: COLORS.textSecondary,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 28,
  },
});
