import { useState, useCallback } from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/colors';
import { ROUTES } from '../../constants/navigation';
import BlueBtn from '../../components/ui/BlueBtn';
import TableItem from '../../components/restaurant/TableItem';

const SeatSelection = () => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const navigation = useNavigation();

  const containerOpacity = useSharedValue(0);
  const containerY = useSharedValue(20);
  const confirmOpacity = useSharedValue(0);
  const confirmY = useSharedValue(10);

  useFocusEffect(
    useCallback(() => {
      containerOpacity.value = 0;
      containerY.value = 20;
      containerOpacity.value = withTiming(1, { duration: 400 });
      containerY.value = withTiming(0, { duration: 400 });

      setSelectedSeat(null);
      confirmOpacity.value = 0;
      confirmY.value = 10;
    }, []),
  );

  const containerAnimStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
    transform: [{ translateY: containerY.value }],
  }));

  const confirmAnimStyle = useAnimatedStyle(() => ({
    opacity: confirmOpacity.value,
    transform: [{ translateY: confirmY.value }],
  }));

  const handleSelect = seat => {
    setSelectedSeat(seat);
    confirmOpacity.value = withTiming(1, { duration: 300 });
    confirmY.value = withTiming(0, { duration: 300 });
  };

  const handleConfirm = () => {
    if (selectedSeat !== null) {
      navigation.navigate(ROUTES.FOOD_SELECT, { seat: selectedSeat });
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
          <Text style={styles.title}>원하시는 좌석을 선택해주세요.</Text>

          <View style={styles.floorPlan}>
            <View style={styles.tablesGrid}>
              {[1, 2, 3, 4].map(id => (
                <View key={id} style={styles.tableCell}>
                  <TableItem
                    selected={selectedSeat === id}
                    onPress={() => handleSelect(id)}
                  />
                </View>
              ))}
            </View>
            <View style={styles.counter} />
          </View>

          <Animated.View
            style={[styles.confirmWrap, confirmAnimStyle]}
            pointerEvents={selectedSeat !== null ? 'auto' : 'none'}
          >
            <BlueBtn
              label={
                selectedSeat !== null ? `${selectedSeat}번 테이블 선택` : ''
              }
              onPress={handleConfirm}
            />
          </Animated.View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SeatSelection;

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
  floorPlan: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    paddingVertical: 48,
    width: 896,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  counter: {
    height: 48,
    width: 400,
    backgroundColor: '#3f3f46',
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 64,
  },
  tablesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 64,
  },
  tableCell: {
    width: '48%',
    alignItems: 'center',
  },
  confirmWrap: {
    alignItems: 'center',
  },
});
