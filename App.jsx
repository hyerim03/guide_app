import Start from './screens/Start';
import Waiting from './screens/Waiting';
import KioskPage from './screens/KioskPage';
import Descripiton from './screens/Description';
import OrderCompleted from './screens/OrderCompleted';
import ReceivedFood from './screens/ReceivedFood';

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
        <Stack.Screen name="order_com" component={OrderCompleted} />
        <Stack.Screen name="desc" component={Descripiton} />
        <Stack.Screen name="received" component={ReceivedFood} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
