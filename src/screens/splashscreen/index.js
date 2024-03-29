import React, { useRef } from 'react';
import { Animated, ActivityIndicator, Platform } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { getAsyncStorageValues } from '../../constants';
import { Colors } from '../../constants/Theme';
var getCountry = require('country-currency-map').getCountry;
var formatCurrency = require('country-currency-map').formatCurrency;
import * as Notifications from 'expo-notifications';
import { useMutation } from 'react-query';
import { SEND_PUSH_TOKEN } from '../../queries';
import { getTrackingPermissionsAsync } from 'expo-tracking-transparency';
import Constants from 'expo-constants';
import {
  validateNavigationIOS,
  validateNavigationAndroid,
} from '../../util/validateNavigation';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function SplashScreen(props) {
  const [sendNotificationToken] = useMutation(SEND_PUSH_TOKEN);
  const notificationListener = useRef();
  const responseListener = useRef();
  // const [notification, setNotification] = useState(false);
  // const [checkLocation, setCheckLocation] = useState(false);
  // const [tracking, setTracking] = useState(false);

  const checkNotificationPermission = async () => {
    let token = false;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      if (existingStatus === 'granted') {
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            sound: true,
          });
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
      }
    }
    return token;
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
        return false;
      } else {
        return true;
      }
    }
  };

  const locationFunction = async () => {
    const isLocation = await Location.hasServicesEnabledAsync();
    const isLocationOn = await Location.getForegroundPermissionsAsync();

    if (isLocation && isLocationOn.granted) {
      setCurrency();
      return true;
    } else {
      return false;
    }
  };

  const [springValue] = React.useState(new Animated.Value(0.5));

  React.useEffect(() => {
    try {
      NetInfo.fetch().then(async state => {
        if (state.isConnected) {
          const { userInfo = {}, language } = await getAsyncStorageValues();
          let tracking = '';
          if (Platform.OS === 'ios') {
            tracking = await checkTrackingPermission();
          }
          let location = await locationFunction();
          const token = await checkNotificationPermission();

          if (Platform.OS === 'ios') {
            const firstLogin = await AsyncStorage.getItem('isFirstLogin');
            const { isFirstLogin } = JSON.parse(firstLogin || '{}');
            if (isFirstLogin) {
              if (userInfo?.user_id) {
                props.navigation.replace('Home', {
                  crossIcon: false,
                });
              } else {
                props.navigation.replace('socialLogin');
              }
            } else
              await validateNavigationIOS(
                props.navigation,
                tracking,
                location,
                token,
                userInfo,
              );
            await AsyncStorage.setItem(
              'isFirstLogin',
              JSON.stringify({
                isFirstLogin: true,
              }),
            );
          } else {
            validateNavigationAndroid(props.navigation, location, userInfo);
          }

          if (userInfo?.user_id) {
            await sendNotificationToken({
              id: userInfo?.user_id || '',
              expo_notification_token: token || '',
              lang: language || '',
            });
            notificationListener.current = Notifications.addNotificationReceivedListener(
              notification => {
                // props.navigation.navigate('WaiterProfile', {
                //   crossIcon: true,
                // });
              },
            );
            responseListener.current = Notifications.addNotificationResponseReceivedListener(
              response => {
                // props.navigation.navigate('WaiterProfile', {
                //   crossIcon: true,
                // });
              },
            );
          }

          Animated.spring(springValue, {
            toValue: 1,
            friction: 1,
          }).start();
        } else {
          props.navigation.replace('NoWiFi');
        }
      });
    } catch {
      props.navigation.replace('Home', {
        crossIcon: false,
      });
    }
  }, []);

  return (
    <>
      <ActivityIndicator style={{ flex: 1 }} size={70} color={Colors.yellow} />
    </>
  );
}
