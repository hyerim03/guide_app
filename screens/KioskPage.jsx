import { Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { MENU_DATA } from '../dummy/menu';
import FoodItem from '../components/FoodItem';
import { useEffect, useState } from 'react';
import useMqtt from '../hook/useMqttFKiosk';

const KioskPage = () => {
  const [menu, setMenu] = useState(0);
  const { publish } = useMqtt();

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
          <View
            key={item.id}
            style={menu == item.id ? styles.selectedCell : null}
          >
            <FoodItem
              menu={item.menu}
              number={item.id}
              price={item.price}
              image={item.image}
              onClick={selectMenu}
            />
          </View>
        ))}
      </View>
      <Pressable onPress={order} style={styles.orderBtn}>
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
    backgroundColor: '#64481C',
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
    backgroundColor: '#F3EEE6',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 41,
  },
  subHeaderText: {
    fontSize: 40,
    color: '#E9A534',
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
    backgroundColor: '#E8A73D',
    margin: 'auto',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 48,
    color: 'white',
  },
  selectedCell: {
    transform: [{ translateY: -6 }],
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
});
