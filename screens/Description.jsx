import { Text, StatusBar, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import useMqtt from '../hook/useMqttFKiosk';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Description = () => {
  const [state, setState] = useState();
  const [step, setStep] = useState(' ');
  const { subscribe } = useMqtt();
  const navigation = useNavigation();

  useEffect(() => {
    subscribe('ping', setState);

    if (state?.includes('AMR')) {
      setStep('AMR 공정');
    }
    if (state?.includes('MMR')) {
      setStep('MMR 공정');
    }
    if (state == 'MMR_END') {
      navigation.navigate('start');
    }
  }, [state]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <LinearGradient style={styles.container} colors={['#CCDFFF', '#ffffff']}>
        <Text style={styles.mainText}>{step} 시연중입니다...</Text>
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
