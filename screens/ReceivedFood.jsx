import { useNavigation } from '@react-navigation/native';
import {
  Text,
  StyleSheet,
  Pressable,
  View,
  ImageBackground,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import useMqtt from '../hook/useMqtt';
import useMenuStore from '../stores/menu';
import { MENU_DATA } from '../dummy/menu';

const ReceivedFood = () => {
  const { publish } = useMqtt();
  const navigation = useNavigation();
  const { num: rawNum } = useMenuStore();
  const num = rawNum || 1;
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const onPressBtn = () => {
    console.log('click');
    publish('ping', 'serve_com');
    navigation.navigate('desc');
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={[styles.header, isLandscape && styles.headerLandscape]}>
        <Text
          style={[styles.headerText, isLandscape && styles.headerTextLandscape]}
        >
          푸드코트
        </Text>
      </View>
      <View
        style={[styles.subHeader, isLandscape && styles.subHeaderLandscape]}
      >
        <Text
          style={[
            styles.subHeaderText,
            isLandscape && styles.subHeaderTextLandscape,
          ]}
        >
          Have a good day!
        </Text>
      </View>
      <View style={[styles.wrap, isLandscape && styles.wrapLandscape]}>
        <Text style={[styles.subText, isLandscape && styles.subTextLandscape]}>
          주문하신 음식을 {'\n'} 수령해 주세요.
        </Text>
        <ImageBackground
          style={
            isLandscape
              ? { width: 200, height: 200 }
              : { width: 447, height: 447 }
          }
          source={MENU_DATA[num - 1].foodImage}
          resizeMethod="cover"
        ></ImageBackground>
        <Pressable
          onPress={onPressBtn}
          style={[styles.button, isLandscape && styles.buttonLandscape]}
        >
          <Text
            style={[
              styles.buttonText,
              isLandscape && styles.buttonTextLandscape,
            ]}
          >
            수령완료
          </Text>
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
  headerLandscape: { height: 80 },
  headerTextLandscape: { fontSize: 42 },
  subHeaderLandscape: { height: 52 },
  subHeaderTextLandscape: { fontSize: 22 },
  wrapLandscape: { gap: 20 },
  subTextLandscape: { fontSize: 28, marginTop: 16 },
  buttonLandscape: { height: 64, width: 300, borderRadius: 32 },
  buttonTextLandscape: { fontSize: 28 },
});
