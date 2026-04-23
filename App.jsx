import Start from './screens/Start';
import Waiting from './screens/Waiting';
import KioskPage from './screens/KioskPage';
import Descripiton from './screens/Description';
import OrderCompleted from './screens/OrderCompleted';
import ReceivedFood from './screens/ReceivedFood';
import SelectSection from './screens/SelectSection';
import DemoEnd from './screens/DemoEnd';
import HomeSelect from './screens/HomeSelect';
import HomeDemo from './screens/HomeDemo';

import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { useEffect } from 'react';
import useMqtt from './hook/useMqtt';

const Stack = createStackNavigator();
export const navigationRef = createNavigationContainerRef();

function App() {
  const { subscribe } = useMqtt();

  useEffect(() => {
    subscribe('customtopic/down', msg => {
      if (!navigationRef.isReady()) return;
      if (msg.includes('SCREEN_food')) {
        navigationRef.navigate('food');
      } else if (msg.includes('stop_robot')) {
        navigationRef.navigate('received');
      } else if (msg.includes('move_robot')) {
        navigationRef.navigate('wait');
      } else if (msg.includes('AMR_END')) {
        console.log('AMR 시연 종료');
      }
    });

    subscribe('ping/desc', msg => {
      if (!navigationRef.isReady()) return;
      if (msg.includes('END')) {
        navigationRef.navigate('start');
      }
    });
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="start"
      >
        <Stack.Screen name="select" component={SelectSection} />
        <Stack.Screen name="start" component={Start} />
        <Stack.Screen name="wait" component={Waiting} />
        <Stack.Screen name="food" component={KioskPage} />
        <Stack.Screen name="order_com" component={OrderCompleted} />
        <Stack.Screen name="desc" component={Descripiton} />
        <Stack.Screen name="received" component={ReceivedFood} />
        <Stack.Screen name="demo_end" component={DemoEnd} />
        <Stack.Screen name="home_select" component={HomeSelect} />
        <Stack.Screen name="home_demo" component={HomeDemo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
