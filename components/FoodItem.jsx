import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const FoodItem = ({ menu, number, price, image, onClick }) => {
  return (
    <Pressable onPress={() => onClick(number)} style={styles.wrap}>
      <ImageBackground style={styles.image} source={image} resizeMode="cover">
        <View style={styles.menu}>
          <Text style={styles.menuText}>{menu}</Text>
        </View>
        <View style={styles.number}>
          <Text style={styles.numText}>0{number}</Text>
        </View>
      </ImageBackground>
      <View style={styles.price}>
        <Text style={styles.priceText}>{price} 원</Text>
      </View>
    </Pressable>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  wrap: {
    width: 241,
    height: 314,
    borderWidth: 5,
    borderColor: '#50360D',
  },
  image: {
    width: 231,
    height: 231,
    justifyContent: 'space-between',
  },
  menu: {
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 35,
    color: '#50360D',
  },
  number: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 66,
    height: 66,
    backgroundColor: 'black',
  },
  numText: {
    fontSize: 40,
    color: 'white',
  },
  price: {
    alignItems: 'flex-end',
    backgroundColor: '#50360D',
    height: 73,
  },
  priceText: {
    fontSize: 40,
    color: 'white',
  },
});
