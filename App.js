import React, {
  useContext,
  useReducer,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/AppNavigator';
import Context from './src/contextApi/context';
import Reducer from './src/contextApi/reducer';
import axios from 'axios';
import { getAsyncStorageValues } from './src/constants';
import moment from 'moment';
import 'moment/locale/fr';
import i18n from './src/li8n';
// import * as Linking from 'expo-linking';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [locale, setLocale] = useState();
  // const redirectUrl = Linking.makeUrl('/');
  const linking = {
    prefixes: [
      'https://www.miams.app',
      'https://www.miams.app/',
      'https://miams.app/',
      'https://miams.app',
      'https://',
      // redirectUrl,
    ],
    config: {
      screens: {
        OpenCardReviews: 'OpenCardReviews',
      },
    },
  };

  useEffect(() => {
    (async () => {
      try {
        const {
          manager_details = {},
          language,
        } = await getAsyncStorageValues();
        let lng = language.includes('fr') ? 'fr' : 'en';
        moment.locale(lng);
        setLocale(lng);
        if (manager_details?.token) {
          axios.defaults.headers.common.Authorization = `Bearer ${manager_details?.token}`;
        }
      } catch {
        // console.log('App.js Error');
      }
    })();
  }, []);

  const localizationContext = useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale],
  );

  const [loaded] = useFonts({
    // Load a font `Montserrat` from a static resource
    ProximaNova: require('./src/assets/fonts/ProximaNova/ProximaNova-Regular.otf'),
    ProximaNovaBold: require('./src/assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
    ProximaNovaSemiBold: require('./src/assets/fonts/ProximaNova/ProximaNova-Semibold.otf'),
  });

  if (!loaded) {
    return <AppLoading />;
  }
  return (
    <Context.Provider value={{ state, dispatch, localizationContext }}>
      <NavigationContainer
        linking={linking}
        fallback={
          <View>
            <Text>Loading...</Text>
          </View>
        }
      >
        <RootNavigator />
      </NavigationContainer>
    </Context.Provider>
  );
}
