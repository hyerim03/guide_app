import Start from './screens/Start';
import Waiting from './screens/Waiting';
import SeatSelection from './screens/restaurant/SeatSelection';
import FoodSelect from './screens/restaurant/FoodSelect';
import GetFoodMove from './screens/restaurant/GetFoodMove';
import ReceivedFood from './screens/restaurant/ReceivedFood';
import SelectSection from './screens/SelectSection';
import DemoEnd from './screens/DemoEnd';
import HomeSelect from './screens/home/HomeSelect';
import DemoScreen from './screens/DemoScreen';
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
      if (msg.includes('stop_robot')) {
        navigationRef.navigate(ROUTES.RECEIVED);
      } else if (msg.includes('move_robot')) {
        navigationRef.navigate(ROUTES.WAIT);
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
        <Stack.Screen name={ROUTES.GET_FOOD_MOVE} component={GetFoodMove} />
        <Stack.Screen name={ROUTES.RECEIVED} component={ReceivedFood} />
        <Stack.Screen name={ROUTES.DEMO_END} component={DemoEnd} />
        <Stack.Screen name={ROUTES.HOME_SELECT} component={HomeSelect} />
        <Stack.Screen
          name={ROUTES.HOME_DEMO}
          component={DemoScreen}
          initialParams={{
            mainText: '가정 환경에서는 온도, 습도, 조도를 제어할 수 있습니다.',
            subText: '원하시는 항목을 선택해주세요',
            nextRoute: ROUTES.HOME_SELECT,
          }}
        />
        <Stack.Screen
          name={ROUTES.RESTAURANT_DEMO}
          component={DemoScreen}
          initialParams={{
            mainText: '식당 환경에서는 좌석 선택 및 음식 주문이 가능합니다.',
            subText: '원하시는 좌석을 선택해주세요.',
            nextRoute: ROUTES.SEAT_SELECT,
          }}
        />
        <Stack.Screen name={ROUTES.HOME_CONTROL} component={ControlSliderScreen} />
        <Stack.Screen name={ROUTES.HOME_RESULT} component={ControlResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
