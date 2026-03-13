import { useNavigation } from '@react-navigation/native';

import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useMqtt from '../hook/useMqtt';

const Waiting = () => {
  const navigation = useNavigation();
  const [state, setState] = useState('');
  const { subscribe } = useMqtt();

  useEffect(() => {
    subscribe('customtopic/down', setState);
  }, []);

  useEffect(() => {
    if (!state) return;
    if (state == 'SCREEN_desc') {
      return;
    }
    if (state.includes('SCREEN_food')) {
      navigation.navigate('food');
    }
    if (state.includes('stop_robot')) {
      navigation.navigate('received');
    }
    if (state.includes('AMR_END')) {
      console.log('AMR 시연 종료');
    }
  }, [state]);

  return (
    <LinearGradient style={styles.container} colors={['#CCDFFF', '#ffffff']}>
      <Text style={styles.mainText}>안내로봇이 시연중입니다...</Text>
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
