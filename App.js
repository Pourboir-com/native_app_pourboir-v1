import React, { useContext, useReducer, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/AppNavigator';
import Context from './src/contextApi/context';
import Reducer from './src/contextApi/reducer';
import axios from 'axios';
import { getAsyncStorageValues } from './src/constants';
import moment from 'moment';
import 'moment/locale/fr';
// import 'moment/locale/en';
import * as Localization from 'expo-localization';
import AppLoading from 'expo-app-loading';
import { loadAsync } from 'expo-font';

export default function App() {
  const [loading, setLoading] = useState(true);

  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(Reducer, initialState);
  useEffect(() => {
    try {
      (async () => {
        const { locale } = await Localization.getLocalizationAsync();
        moment.locale(locale.includes('fr') ? 'fr' : 'en');
        const { manager_details = {} } = await getAsyncStorageValues();
        if (manager_details?.token)
          axios.defaults.headers.common.Authorization = `Bearer ${manager_details?.token}`;
        async function loadFont() {
          await loadAsync({
            ProximaNova: require('./src/assets/fonts/ProximaNova/ProximaNova-Regular.otf'),
            ProximaNovaBold: require('./src/assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
            ProximaNovaSemiBold: require('./src/assets/fonts/ProximaNova/ProximaNova-Semibold.otf'),
          });
        }
        loadFont();
        setLoading(false);
      })();
    } catch {
      alert('App.js Error');
    }
  }, []);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <Context.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Context.Provider>
  );
}
