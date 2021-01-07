import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import splashScreen from '../screens/splashscreen';
import socialLogin from '../screens/socialLogin';
import Home from '../screens/home';
import Remove from '../screens/remove';

import RateYourService from '../screens/rateYourService';
import Setting from '../screens/setting';
import OpenCardReviews from '../screens/openCardReviews'
import NoLocation from '../screens/NoLocationFound'
import SelectLanguage from "../screens/selectLanguage"

import { spacing } from "../constants/layout";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="splashScreen" screenOptions={{ headerShown: false }} >
      <Stack.Screen name="splashScreen" component={splashScreen}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
        })} />
      <Stack.Screen name="socialLogin" component={socialLogin}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
        })} />
      <Stack.Screen name="Home" component={Home}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
        })}
      />
      <Stack.Screen name="Remove" component={Remove}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
        })}
      />
      <Stack.Screen name="RateYourService" component={RateYourService}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
        })}
      />
      <Stack.Screen name="Setting" component={Setting}

        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
        })}
      />
      <Stack.Screen name="OpenCardReviews" component={OpenCardReviews}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
        })} />
      <Stack.Screen name="NoLocation" component={NoLocation}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
        })} />
      <Stack.Screen name="SelectLanguage" component={SelectLanguage}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
        })} />

    </Stack.Navigator>
  );
}

export default AppNavigator;
