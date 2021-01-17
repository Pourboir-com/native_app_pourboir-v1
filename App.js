import React, { useContext, useReducer, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/AppNavigator';
import Context from './src/contextApi/context';
import Reducer from './src/contextApi/reducer';
// import { getAsyncStorageValues } from './src/constants';
import NoWiFi from './src/screens/noWifi';

export default function App() {
  // const [userDetails, setuserDetails] = useState();
  // useEffect(() => {
  //   (async () => {
  //     const { userInfo } = await getAsyncStorageValues();
  //     setuserDetails(userInfo);
  //   })();
  // }, []);

  // useEffect(() => {
  //   console.log('User Details = ', userDetails);
  // }, [userDetails]);

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
