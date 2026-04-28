import { StyleSheet, Text, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { ROUTES } from '../constants/navigation';
import PrimaryButton from '../components/ui/PrimaryButton';

const DemoEnd = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { sectionTitle = '환경' } = route.params ?? {};

  return (
    <SafeAreaView style={styles.safeArea} edges={[]}>
      <StatusBar hidden={true} />
      <LinearGradient
        style={styles.container}
        colors={[COLORS.gradientFrom, COLORS.gradientMid, COLORS.gradientTo]}
        locations={[0.01, 0.58, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.mainText}>
          {sectionTitle} 시연이 종료되었습니다.
        </Text>
        <Text style={styles.subText}>이용해 주셔서 감사합니다</Text>
        <PrimaryButton
          label="목록으로 가기"
          onPress={() => navigation.navigate(ROUTES.SELECT)}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

export default DemoEnd;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.gradientFrom,
  },
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
    marginBottom: 12,
  },
  subText: {
    fontSize: 24,
    color: COLORS.textSecondary,
    marginBottom: 48,
  },
});
