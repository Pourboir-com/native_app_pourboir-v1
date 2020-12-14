import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import splashScreen from '../screens/splashscreen';
import socialLogin from '../screens/socialLogin';
import Home from '../screens/home';
import RateYourService from '../screens/rateYourService';
import Setting from '../screens/setting';
import OpenCardReviews from '../screens/openCardReviews'
import NoLocation from '../screens/NoLocationFound'

import { spacing } from "../constants/layout";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="splashScreen" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="splashScreen" component={splashScreen} />
      <Stack.Screen name="socialLogin" component={socialLogin} />
      <Stack.Screen name="Home" component={Home}
        options={() => ({
          headerShown: true,
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
        })}
      />
      <Stack.Screen name="RateYourService" component={RateYourService} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="OpenCardReviews" component={OpenCardReviews} />
      <Stack.Screen name="NoLocation" component={NoLocation} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
