import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import useMqtt from '../hook/useMqttFKiosk';

const ReceivedFood = () => {
  const { publish } = useMqtt();

  const onPressBtn = () => {
    console.log('click');
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient style={styles.container} colors={['#CCDFFF', '#ffffff']}>
        <Pressable onPress={onPressBtn} style={styles.button}>
          <Text style={styles.buttonText}>수령하기</Text>
        </Pressable>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default ReceivedFood;

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
  subText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#4A7FDA',
    textAlign: 'center',
    lineHeight: 50,
  },
  button: {
    width: '100%',
    height: 110,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#A6BCEC',
    borderWidth: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 40,
    color: '#4A7FDA',
    fontWeight: '500',
  },
});
