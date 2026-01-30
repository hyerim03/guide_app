import Start from './screens/Start';
import Waiting from './screens/Waiting';
import KioskPage from './screens/KioskPage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="start"
      >
        <Stack.Screen name="start" component={Start} />
        <Stack.Screen name="wait" component={Waiting} />
        <Stack.Screen name="food" component={KioskPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
