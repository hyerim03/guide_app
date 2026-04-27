import Start from './screens/Start';
import Waiting from './screens/Waiting';
import SeatSelection from './screens/restaurant/SeatSelection';
import FoodSelect from './screens/restaurant/FoodSelect';
import FoodResult from './screens/restaurant/FoodResult';
import GetFoodMove from './screens/restaurant/GetFoodMove';
import KioskPage from './screens/KioskPage';
import Descripiton from './screens/Description';
import OrderCompleted from './screens/OrderCompleted';
import ReceivedFood from './screens/ReceivedFood';
import SelectSection from './screens/SelectSection';
import DemoEnd from './screens/DemoEnd';
import HomeSelect from './screens/home/HomeSelect';
import HomeDemo from './screens/HomeDemo';
import ControlSliderScreen from './screens/home/ControlSliderScreen';
import ControlResultScreen from './screens/home/ControlResultScreen';

import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { useEffect } from 'react';
import useMqtt from './hook/useMqtt';
import { ROUTES } from './constants/navigation';

const Stack = createStackNavigator();
export const navigationRef = createNavigationContainerRef();

function App() {
  const { subscribe } = useMqtt();

  useEffect(() => {
    subscribe('customtopic/down', msg => {
      if (!navigationRef.isReady()) return;
      if (msg.includes('SCREEN_food')) {
        navigationRef.navigate(ROUTES.FOOD);
      } else if (msg.includes('stop_robot')) {
        navigationRef.navigate(ROUTES.RECEIVED);
      } else if (msg.includes('move_robot')) {
        navigationRef.navigate(ROUTES.WAIT);
      } else if (msg.includes('AMR_END')) {
        console.log('AMR 시연 종료');
      }
    });

    subscribe('ping/desc', msg => {
      if (!navigationRef.isReady()) return;
      if (msg.includes('END')) {
        navigationRef.navigate(ROUTES.START);
      }
    });
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={ROUTES.START}
      >
        <Stack.Screen name={ROUTES.SELECT} component={SelectSection} />
        <Stack.Screen name={ROUTES.START} component={Start} />
        <Stack.Screen name={ROUTES.WAIT} component={Waiting} />
        <Stack.Screen name={ROUTES.SEAT_SELECT} component={SeatSelection} />
        <Stack.Screen name={ROUTES.FOOD_SELECT} component={FoodSelect} />
        <Stack.Screen name={ROUTES.FOOD_RESULT} component={FoodResult} />
        <Stack.Screen name={ROUTES.GET_FOOD_MOVE} component={GetFoodMove} />
        <Stack.Screen name={ROUTES.FOOD} component={KioskPage} />
        <Stack.Screen name={ROUTES.ORDER_COM} component={OrderCompleted} />
        <Stack.Screen name={ROUTES.DESC} component={Descripiton} />
        <Stack.Screen name={ROUTES.RECEIVED} component={ReceivedFood} />
        <Stack.Screen name={ROUTES.DEMO_END} component={DemoEnd} />
        <Stack.Screen name={ROUTES.HOME_SELECT} component={HomeSelect} />
        <Stack.Screen name={ROUTES.HOME_DEMO} component={HomeDemo} />
        <Stack.Screen name={ROUTES.HOME_CONTROL} component={ControlSliderScreen} />
        <Stack.Screen name={ROUTES.HOME_RESULT} component={ControlResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
