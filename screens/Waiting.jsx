import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useMqtt from '../hook/useMqttFKiosk';

const Waiting = () => {
  const navigation = useNavigation();
  const [state, setState] = useState('');
  const { subscribe } = useMqtt();

  useEffect(() => {
    console.log('subscribe test');
    subscribe('ping', setState);
    if (state == 'SCREEN_desc') {
      return;
    }
    if (state == 'SCREEN_food') {
      navigation.navigate('food');
    }
  }, [state]);

  return (
    <LinearGradient style={styles.container} colors={['#CCDFFF', '#ffffff']}>
      <Text style={styles.mainText}>안내로봇이 설명중입니다...</Text>
      <Pressable
        onPress={() => navigation.navigate('food')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>임시 버튼 </Text>
      </Pressable>
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
