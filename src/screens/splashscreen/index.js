import React, { useContext, useRef } from 'react';
import { Animated, ActivityIndicator, Platform } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { getAsyncStorageValues } from '../../constants';
import Context from '../../contextApi/context';
import { Colors } from '../../constants/Theme';
import * as actionTypes from '../../contextApi/actionTypes';
var getCountry = require('country-currency-map').getCountry;
var formatCurrency = require('country-currency-map').formatCurrency;
import * as Notifications from 'expo-notifications';
import { useMutation } from 'react-query';
import { SEND_PUSH_TOKEN } from '../../queries';
import * as Localization from 'expo-localization';
import { getTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { upperTitleCase } from '../../util';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function SplashScreen(props) {
  const { dispatch } = useContext(Context);
  const [sendNotificationToken] = useMutation(SEND_PUSH_TOKEN);
  const notificationListener = useRef();
  const responseListener = useRef();

  const checkNotificationPermission = async () => {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      if (existingStatus !== 'granted') {
        props.navigation.replace('Notification');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: true,
      });
    }
    return token;
  };

  const InitializeStates = async () => {
    const { userInfo = {} } = await getAsyncStorageValues();
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
      };
      dispatch({
        type: actionTypes.USER_DETAILS,
        payload: userDetails,
      });
      props.navigation.replace('Home', { crossIcon: false, ad: true });
    } else {
      props.navigation.replace('socialLogin');
    }
  };

  const setCurrency = async () => {
    let values = await Location.requestForegroundPermissionsAsync();
    Location.getCurrentPositionAsync().then(pos => {
      Location.reverseGeocodeAsync({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }).then(async res => {
        let currency = getCountry(res[0]?.country);
        let formattedCurrency = formatCurrency('', currency?.currency);
        await AsyncStorage.setItem(
          '@Currency',
          JSON.stringify({
            currency: formattedCurrency || '',
          }),
        );
        await AsyncStorage.setItem(
          '@City',
          JSON.stringify({
            city: res[0]?.city || '',
          }),
        );
      });
    });
  };

  const checkTrackingPermission = async () => {
    if (Platform.OS === 'ios') {
      const { granted } = await getTrackingPermissionsAsync();
      if (!granted) {
        props.navigation.replace('NoTracking');
        return;
      }
    }
  };

  const locationFunction = async () => {
    const isLocation = await Location.hasServicesEnabledAsync();
    if (isLocation) {
      setCurrency();
      InitializeStates();
    } else {
      props.navigation.replace('NoLocation');
      return;
    }
  };

  const [springValue] = React.useState(new Animated.Value(0.5));

  React.useEffect(() => {
    try {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          checkTrackingPermission();
          locationFunction();
          checkNotificationPermission().then(async token => {
            const { userInfo = {} } = await getAsyncStorageValues();
            const { locale } = await Localization.getLocalizationAsync();
            if (userInfo?.user_id) {
              await sendNotificationToken({
                id: userInfo?.user_id || '',
                expo_notification_token: token || '',
                lang: locale || '',
              });
              notificationListener.current = Notifications.addNotificationReceivedListener(
                notification => {
                  props.navigation.navigate('WaiterProfile', {
                    crossIcon: true,
                  });
                },
              );
              responseListener.current = Notifications.addNotificationResponseReceivedListener(
                response => {
                  props.navigation.navigate('WaiterProfile', {
                    crossIcon: true,
                  });
                },
              );
            }
          });

          Animated.spring(springValue, {
            toValue: 1,
            friction: 1,
          }).start();
        } else {
          props.navigation.replace('NoWiFi');
        }
      });
    } catch {}
  }, []);

  return (
    <>
      <ActivityIndicator style={{ flex: 1 }} size={70} color={Colors.yellow} />
    </>
  );
}
