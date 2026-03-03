import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import useMqtt from '../hook/useMqttFKiosk';

const ReceivedFood = () => {
  const { publish } = useMqtt();
  const navigation = useNavigation();

  const onPressBtn = () => {
    console.log('click');
    publish('ping', 'serve_com');
    navigation.navigate('desc');
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>푸드코트</Text>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Have a good day!</Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.subText}>
          주문하신 음식을 {'\n'} 수령해 주세요.
        </Text>
        <ImageBackground
          style={{ width: 447, height: 447 }}
          source={MENU_DATA[num - 1].foodImage}
          resizeMethod="cover"
        ></ImageBackground>
        <Pressable onPress={onPressBtn} style={styles.button}>
          <Text style={styles.buttonText}>수령완료</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ReceivedFood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F7FF',
  },
  header: {
    height: 192,
    width: '100%',
    backgroundColor: '#4A7FDA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 85,
    color: 'white',
  },
  subHeader: {
    height: 106,
    backgroundColor: '#D1E2FF',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 41,
  },
  subHeaderText: {
    fontSize: 40,
    color: '#497FDA',
  },
  wrap: {
    alignItems: 'center',
    gap: 70,
  },
  button: {
    width: 400,
    height: 110,
    backgroundColor: '#497FDA',
    borderRadius: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 40,
    color: 'white',
    fontWeight: '700',
  },
  subText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#4A7FDA',
    textAlign: 'center',
    marginTop: 40,
  },
});
