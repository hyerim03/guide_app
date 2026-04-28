import { useEffect } from 'react';
import { StyleSheet, Text, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import LoadingDot from '../components/ui/LoadingDot';
import { COLORS } from '../constants/colors';

const Waiting = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { sectionTitle = '환경', nextScreen = 'demo_end' } = route.params ?? {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(nextScreen, { sectionTitle });
    }, 5000);
    return () => clearTimeout(timer);
  }, [sectionTitle, nextScreen]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={[]}>
      <StatusBar hidden={true} />
      <LinearGradient
        style={styles.container}
        colors={[COLORS.gradientFrom, COLORS.gradientMid, COLORS.gradientTo]}
        locations={[0.01, 0.58, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.mainText}>{sectionTitle}으로 이동중입니다.</Text>
        <LoadingDot />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Waiting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 32,
  },
});
