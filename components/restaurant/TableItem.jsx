import { View, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { COLORS } from '../../constants/colors';

const TABLE_COLOR = '#92400e';
const TABLE_SELECTED_COLOR = '#f59e0b';
const CHAIR_COLOR = '#b45309';

const TableItem = ({ selected, onPress }) => {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    opacity: selected ? 1 : 0.8,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.95); }}
      onPressOut={() => { scale.value = withSpring(1); }}
    >
      <Animated.View style={[styles.tableRow, animStyle]}>
        <View style={styles.chair} />
        <View style={[styles.tableOutline, selected && styles.tableOutlineSelected]}>
          <View style={[styles.table, selected && styles.tableSelected]} />
        </View>
        <View style={styles.chair} />
      </Animated.View>
    </Pressable>
  );
};

export default TableItem;

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chair: {
    width: 32,
    height: 48,
    backgroundColor: CHAIR_COLOR,
    borderRadius: 12,
  },
  tableOutline: {
    borderRadius: 16,
    borderWidth: 4,
    borderColor: 'transparent',
    marginHorizontal: 4,
  },
  tableOutlineSelected: {
    borderColor: COLORS.buttonBlue,
  },
  table: {
    width: 64,
    height: 64,
    backgroundColor: TABLE_COLOR,
    borderRadius: 12,
  },
  tableSelected: {
    backgroundColor: TABLE_SELECTED_COLOR,
  },
});
