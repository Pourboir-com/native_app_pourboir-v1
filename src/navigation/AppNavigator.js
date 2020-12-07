import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import socialLogin from '../screens/socialLogin';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="socialLogin" headerMode="none">
      <Stack.Screen name="socialLogin" component={socialLogin} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
