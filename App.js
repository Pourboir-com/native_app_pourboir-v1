import React, { useContext, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/AppNavigator';
import Context from './src/contextApi/context';
import Reducer from './src/contextApi/reducer';
import axios from 'axios';
import { getAsyncStorageValues } from './src/constants';

export default function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(Reducer, initialState);
  const { manager_details } = getAsyncStorageValues();
  if (manager_details?.token) axios.defaults.headers.common.Authorization = `bearer ${manager_details?.token}`;
  return (
    <Context.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Context.Provider>
  );
}
