import { Text, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../constants/colors';

const OrderCompleted = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <LinearGradient
        style={styles.container}
        colors={[COLORS.bgBlue, COLORS.white]}
      >
        <Text style={styles.subText}>주문이 완료되었습니다</Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default OrderCompleted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 48,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 80,
  },
  subText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: COLORS.textBlue,
    textAlign: 'center',
    lineHeight: 50,
  },
});
