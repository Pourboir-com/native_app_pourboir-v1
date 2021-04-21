import React, { useContext, useReducer, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/AppNavigator';
import Context from './src/contextApi/context';
import Reducer from './src/contextApi/reducer';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { useMutation } from 'react-query';
import { getAsyncStorageValues } from './src/constants';
import { SEND_PUSH_TOKEN } from './src/queries';
export default function App() {
  const [sendNotificationToken] = useMutation(SEND_PUSH_TOKEN);
  const registerForPushNotifications = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      alert('No notification permissions!');
      return;
    }

    // Get the token that identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    const { userInfo = {} } = await getAsyncStorageValues();
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    await sendNotificationToken(
      {
        id: userInfo?.user_id,
        expo_notification_token: token,
      },
      {
        enabled: userInfo?.user_id ? true : false,
      },
    );
  };

  useEffect(() => {
    registerForPushNotifications();
  }, []);

  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Context.Provider>
  );
}
