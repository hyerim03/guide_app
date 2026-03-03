import { Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { MENU_DATA } from '../dummy/menu';
import FoodItem from '../components/FoodItem';
import { useEffect, useState } from 'react';
import useMqtt from '../hook/useMqttFKiosk';
import { useNavigation } from '@react-navigation/native';

const KioskPage = () => {
  const [menu, setMenu] = useState(0);
  const { publish } = useMqtt();
  const navigation = useNavigation();

  const selectMenu = number => {
    if (menu == number) {
      setMenu(0);
    } else {
      setMenu(number);
    }
  };

  const order = () => {
    if (menu == 0) {
      ToastAndroid.show('메뉴가 선택되지 않았습니다.', ToastAndroid.LONG);
    } else {
      publish('ping', `selected Menu: ${menu}`);
      navigation.navigate('order_com');
    }
  };

  useEffect(() => {
    publish('ping', `MENU: ${menu}`);
  }, [menu]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>푸드코트</Text>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Have a good day!</Text>
      </View>
      <View style={styles.grid}>
        {MENU_DATA?.map(item => (
          <View key={item.id}>
            <FoodItem
              menu={item.menu}
              number={item.id}
              price={item.price}
              image={menu == item.id ? item.selectImage : item.image}
              onClick={selectMenu}
            />
          </View>
        ))}
      </View>
      <Pressable
        onPress={order}
        style={[
          styles.orderBtn,
          { backgroundColor: menu == 0 ? '#D6D6D6' : '#497FDA' },
        ]}
      >
        <Text style={styles.btnText}>주문하기</Text>
      </Pressable>
    </View>
  );
};

export default KioskPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 24,
    paddingHorizontal: 8,
    gap: 5,
  },
  orderBtn: {
    width: 600,
    height: 120,
    margin: 'auto',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 48,
    color: 'white',
  },
});
