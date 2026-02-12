import { Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import useMqtt from '../hook/useMqttFKiosk';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const OrderCompleted = () => {
  const navigation = useNavigation();
  const [state, setState] = useState('');
  const { subscribe } = useMqtt();

  useEffect(() => {
    subscribe('robot/control', setState);
    console.log(state);
    if (state == 'move_robot') {
      navigation.navigate('wait');
    }
  }, [state]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <LinearGradient style={styles.container} colors={['#CCDFFF', '#ffffff']}>
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
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
    gap: 80,
  },
  subText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#4A7FDA',
    textAlign: 'center',
    lineHeight: 50,
  },
});
