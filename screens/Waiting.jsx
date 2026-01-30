import { StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Waiting = () => {
  return (
    <LinearGradient style={styles.container} colors={['#CCDFFF', '#ffffff']}>
      <Text style={styles.mainText}>안내로봇이 설명중입니다...</Text>
    </LinearGradient>
  );
};

export default Waiting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#4A7FDA',
  },
});
