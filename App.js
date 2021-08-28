import React, { useContext, useReducer, useEffect } from 'react';
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
import { loadAsync } from 'expo-font';

export default function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(Reducer, initialState);
  useEffect(() => {
    (async () => {
      try {
        const { locale } = await Localization.getLocalizationAsync();
        moment.locale(locale.includes('fr') ? 'fr' : 'en');
        const { manager_details = {} } = await getAsyncStorageValues();
        if (manager_details?.token) {
          axios.defaults.headers.common.Authorization = `Bearer ${manager_details?.token}`;
        }
        await loadAsync({
          // Load a font `Montserrat` from a static resource
          ProximaNova: require('./src/assets/fonts/ProximaNova/ProximaNova-Regular.otf'),
          ProximaNovaBold: require('./src/assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
          ProximaNovaSemiBold: require('./src/assets/fonts/ProximaNova/ProximaNova-Semibold.otf'),
        });
      } catch {
        console.log('App.js Error');
      }
    })();
  }, []);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Context.Provider>
  );
}
