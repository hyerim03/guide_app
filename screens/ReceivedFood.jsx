import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, Pressable, View, ImageBackground } from 'react-native';
import useMqtt from '../hook/useMqtt';
import useMenuStore from '../stores/menu';
import { MENU_DATA } from '../dummy/menu';
import { COLORS } from '../constants/colors';

const ReceivedFood = () => {
  const { publish } = useMqtt();
  const navigation = useNavigation();
  const { num } = useMenuStore();

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
        />
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
    backgroundColor: COLORS.bgLight,
  },
  header: {
    height: 192,
    width: '100%',
    backgroundColor: COLORS.textBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 85,
    color: COLORS.white,
  },
  subHeader: {
    height: 106,
    backgroundColor: COLORS.subHeader,
    justifyContent: 'center',
    paddingLeft: 41,
  },
  subHeaderText: {
    fontSize: 40,
    color: COLORS.buttonBlue,
  },
  wrap: {
    alignItems: 'center',
    gap: 70,
  },
  button: {
    width: 400,
    height: 110,
    backgroundColor: COLORS.buttonBlue,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 40,
    color: COLORS.white,
    fontWeight: '700',
  },
  subText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: COLORS.textBlue,
    textAlign: 'center',
    marginTop: 40,
  },
});
