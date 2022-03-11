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
// import 'moment/locale/en';
import { loadAsync } from 'expo-font';
import i18n from './src/li8n';
import * as Linking from 'expo-linking';

export default function App() {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [locale, setLocale] = useState();
  const [url, setUrl] = useState(null);
  let redirectUrl = Linking.createURL('www.miams.app');
  let redirectUrl2 = Linking.createURL('www.miams.app/');

  alert(redirectUrl);
  const linking = {
    prefixes: [
      redirectUrl,
      redirectUrl2,
      'https://www.miams.app',
      'https://www.miams.app/',
      'http://www.miams.app',
      'http://www.miams.app/',
      'https://miams.app/',
      'https://miams.app',
      'http://miams.app',
      'http://miams.app/',
      'https://',
      'http://',
    ],
    config: {
      screens: {
        OpenCardReviews: 'OpenCardReviews',
      },
    },
  };

  const handleUrl = ({ url }) => {
    let data = Linking.parse(url);
    setUrl(data);
  };

  const getInitialURL = async () => {
    const initialURL = await Linking.getInitialURL();
    if (initialURL) {
      setUrl(Linking.parse(initialURL));
    }
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
        await loadAsync({
          // Load a font `Montserrat` from a static resource
          ProximaNova: require('./src/assets/fonts/ProximaNova/ProximaNova-Regular.otf'),
          ProximaNovaBold: require('./src/assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
          ProximaNovaSemiBold: require('./src/assets/fonts/ProximaNova/ProximaNova-Semibold.otf'),
        });

        Linking.addEventListener('url', handleUrl);
        if (!url) {
          getInitialURL();
        }
        return () => {
          Linking.removeEventListener('url');
        };
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
