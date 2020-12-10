import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import socialLogin from '../screens/socialLogin';
import splashScreen from '../screens/splashscreen';
import Home from '../screens/home';
import RateYourService from '../screens/rateYourService';
import Setting from '../screens/setting';
import OpenCardReviews from '../screens/openCardReviews'

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="RateYourService" headerMode="none">
      <Stack.Screen name="socialLogin" component={socialLogin} />
      <Stack.Screen name="splashScreen" component={splashScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="RateYourService" component={RateYourService} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="OpenCardReviews" component={OpenCardReviews} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
