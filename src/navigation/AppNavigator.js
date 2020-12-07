import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import socialLogin from '../screens/socialLogin';
import splashScreen from '../screens/splashscreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="splashScreen" headerMode="none">
      <Stack.Screen name="socialLogin" component={socialLogin} />
      <Stack.Screen name="splashScreen" component={splashScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
