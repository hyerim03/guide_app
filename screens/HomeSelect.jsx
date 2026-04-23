import { StyleSheet, StatusBar, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Thermometer, Droplets, Sun, LogOut } from 'lucide-react-native';
import { COLORS } from '../constants/colors';
import { SelectItem } from '../components/SelectItem';

const controlList = [
  {
    id: 'temperature',
    title: '온도',
    subtitle: '제어',
    icon: Thermometer,
    color: '#EF4444',
  },
  {
    id: 'humidity',
    title: '습도',
    subtitle: '제어',
    icon: Droplets,
    color: '#3B82F6',
  },
  {
    id: 'brightness',
    title: '조도',
    subtitle: '제어',
    icon: Sun,
    color: '#EAB308',
  },
  {
    id: 'end',
    title: '시연',
    subtitle: '종료',
    icon: LogOut,
    color: '#6B7280',
  },
];

const HomeSelect = () => {
  const navigation = useNavigation();

  const handleSelect = id => {
    if (id === 'end') {
      navigation.navigate('demo_end', { sectionTitle: '가정환경' });
    }
  };

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
        <Text style={styles.title}>제어할 항목을 선택해주세요</Text>
        <View style={styles.grid}>
          {controlList.map((item, index) => (
            <SelectItem
              key={item.id}
              section={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              color={item.color}
              onPress={() => handleSelect(item.id)}
              delay={index * 100}
            />
          ))}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default HomeSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    gap: 24,
  },
});
