import { Text, StatusBar, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import useMqtt from '../hook/useMqtt';
import { useState, useEffect } from 'react';
import { COLORS } from '../constants/colors';

const Description = () => {
  const [step, setStep] = useState('');
  const { subscribe } = useMqtt();

  useEffect(() => {
    subscribe('ping/desc', msg => {
      if (msg.includes('CMR')) {
        setStep('CMR 공정');
      } else if (msg.includes('MMR')) {
        setStep('MMR 공정');
      }
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <LinearGradient
        style={styles.container}
        colors={[COLORS.bgBlue, COLORS.white]}
      >
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
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 80,
  },
  mainText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: COLORS.textBlue,
  },
});
