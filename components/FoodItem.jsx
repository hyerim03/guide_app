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
      <ImageBackground
        style={styles.image}
        source={image}
        resizeMode="cover"
      ></ImageBackground>
    </Pressable>
  );
};

export default FoodItem;

const styles = StyleSheet.create({
  wrap: {
    width: 230,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
