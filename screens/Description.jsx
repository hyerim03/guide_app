import { Text, StatusBar, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const Description = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <LinearGradient style={styles.container} colors={['#CCDFFF', '#ffffff']}>
        <Text style={styles.mainText}>시연중입니다...</Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Description;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 48,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    gap: 80,
  },
  mainText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#4A7FDA',
  },
});
