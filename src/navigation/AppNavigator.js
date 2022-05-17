import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import splashScreen from '../screens/splashscreen';
import socialLogin from '../screens/socialLogin';
import Home from '../screens/home';

import RateYourService from '../screens/rateYourService';
// import Setting from '../screens/setting';
import OpenCardReviews from '../screens/openCardReviews';
import NoLocation from '../screens/NoLocationFound';
// import SelectLanguage from '../screens/selectLanguage';
import NoWiFi from '../screens/noWifi';
import PersonalDetails from '../screens/personalDetails';
import Balance from '../screens/balance';

import { spacing } from '../constants/layout';
// import PaypalPayment from '../screens/paypal';
// import ApplePay from '../screens/apple-pay';
// import MasterCard from '../screens/master-card';
// import AddCard from '../screens/add-card';
import MapScreen from '../screens/map-screen';
// import FindJob from '../screens/find-job';
// import SignIn from '../screens/manager-signin';
// import ManagerStaff from '../screens/manager-staff';
// import ManagerSignUp from '../screens/manager-signup';
// import ServerProfile from '../screens/server-profile';
import NoAppTracking from '../screens/no-app-tracking';
// import ForgetPassword from '../screens/forget-password';
import Braserri from '../screens/braserri';
import PublicProfile from '../screens/public-profile';
import YourTickets from '../screens/your-tickets';
import NotificationPermission from '../screens/notification-permission';
import MenuScreen from '../screens/menu-screen';
import * as actionTypes from '../contextApi/actionTypes';
import Context from '../contextApi/context';
import { getAsyncStorageValues } from '../constants';
import { upperTitleCase } from '../util';

const Stack = createStackNavigator();

function AppNavigator() {
  const { dispatch } = useContext(Context);

  const InitializeStates = async () => {
    const { userInfo = {}, language } = await getAsyncStorageValues();
    if (userInfo?.user_id) {
      let userDetails = {
        name: upperTitleCase(userInfo?.name),
        image: userInfo?.image,
        email: userInfo?.email,
        accessToken: userInfo?.accessToken,
        user_id: userInfo?.user_id,
        phone_number: userInfo.phone_number || '',
        username: userInfo?.username || '',
        description: userInfo?.description || '',
        last_name: userInfo?.last_name || '',
        calling_code: userInfo?.calling_code || '',
      };
      dispatch({
        type: actionTypes.CHANGE_LANGUAGE,
        payload: language,
      });
      dispatch({
        type: actionTypes.USER_DETAILS,
        payload: userDetails,
      });
    }
  };

  useEffect(() => {
    InitializeStates();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="splashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="splashScreen"
        component={splashScreen}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      <Stack.Screen
        name="socialLogin"
        component={socialLogin}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: false,
        })}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      <Stack.Screen
        name="Balance"
        component={Balance}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationPermission}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      <Stack.Screen
        name="RateYourService"
        component={RateYourService}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      {/* <Stack.Screen
        name="Setting"
        component={Setting}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      /> */}
      <Stack.Screen
        name="OpenCardReviews"
        component={OpenCardReviews}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      <Stack.Screen
        name="NoLocation"
        component={NoLocation}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      {/* <Stack.Screen
        name="SelectLanguage"
        component={SelectLanguage}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      /> */}
      <Stack.Screen
        name="NoWiFi"
        component={NoWiFi}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      <Stack.Screen
        name="personalDetails"
        component={PersonalDetails}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      {/* <Stack.Screen
        name="paypalPayment"
        component={PaypalPayment}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      <Stack.Screen
        name="applePayment"
        component={ApplePay}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      <Stack.Screen
        name="masterCard"
        component={MasterCard}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      <Stack.Screen
        name="addCard"
        component={AddCard}
        options={() => ({
          headerShown: true,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      /> */}
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={() => ({
          headerShown: false,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      {/* <Stack.Screen
        name="FindJob"
        component={FindJob}
        options={() => ({
          headerShown: false,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      /> */}
      {/* <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={() => ({
          headerShown: false,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      /> */}
      {/* <Stack.Screen
        name="ManagerStaff"
        component={ManagerStaff}
        options={() => ({
          headerShown: false,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      <Stack.Screen
        name="ManagerSignUp"
        component={ManagerSignUp}
        options={() => ({
          headerShown: false,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      /> */}
      {/* <Stack.Screen
        name="WaiterProfile"
        component={ServerProfile}
        options={() => ({
          headerShown: false,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      /> */}
      <Stack.Screen
        name="NoTracking"
        component={NoAppTracking}
        options={() => ({
          headerShown: false,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      {/* <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={() => ({
          headerShown: false,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      /> */}
      <Stack.Screen
        name="Braserri"
        component={Braserri}
        options={() => ({
          headerShown: false,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      <Stack.Screen
        name="PublicProfile"
        component={PublicProfile}
        options={() => ({
          headerShown: false,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      <Stack.Screen
        name="YourTickets"
        component={YourTickets}
        options={() => ({
          headerShown: false,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={() => ({
          headerShown: false,
          title: '',
          headerLeft: null,
          headerTransparent: true,
          headerTitleAlign: 'left',
          headerRightContainerStyle: { paddingRight: spacing(2) },
          gestureEnabled: true,
        })}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
