import React, { useEffect, useContext } from 'react';
import { Animated, ActivityIndicator } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { getAsyncStorageValues } from '../../constants';
import Context from '../../contextApi/context';
import { Colors } from '../../constants/Theme';
import * as actionTypes from '../../contextApi/actionTypes';
var getCountry = require('country-currency-map').getCountry;
var formatCurrency = require('country-currency-map').formatCurrency;
import { loadAsync } from 'expo-font';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { useMutation } from 'react-query';
import { SEND_PUSH_TOKEN } from '../../queries';

export default function SplashScreen(props) {
  const { dispatch } = useContext(Context);
  const [sendNotificationToken] = useMutation(SEND_PUSH_TOKEN);
  Notifications.addListener(notification => {
    // let { path } = notification.data;
    props.navigation.navigate('Remove', {
      crossIcon: true,
    });    // send user to screen
  });

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
    // console.log(userInfo?.user_id);
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

  useEffect(() => {
    (async () => {
      const { userInfo = {} } = await getAsyncStorageValues();
      let userDetails = {
        name: userInfo?.name,
        image: userInfo?.image,
        email: userInfo?.email,
        accessToken: userInfo?.accessToken,
        user_id: userInfo?.user_id,
      };
      dispatch({
        type: actionTypes.USER_DETAILS,
        payload: userDetails,
      });
      async function loadFont() {
        await loadAsync({
          // Load a font `Montserrat` from a static resource
          ProximaNova: require('../../assets/fonts/ProximaNova/ProximaNova-Regular.otf'),
          ProximaNovaBold: require('../../assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
          ProximaNovaSemiBold: require('../../assets/fonts/ProximaNova/ProximaNova-Semibold.otf'),
        });
      }
      loadFont();
    })();
  }, []);

  const [springValue] = React.useState(new Animated.Value(0.5));
  const locationFunction = async () => {
    try {
      let values = await Location.requestPermissionsAsync();
      if (values === 'granted') {
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'NoLocation' }],
          }),
        );
      }

      const isLocation = await Location.hasServicesEnabledAsync();
      if (isLocation) {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            props.navigation.replace('Home', { crossIcon: false });
          } else {
            props.navigation.replace('NoWiFi');
          }
        });

        await AsyncStorage.setItem(
          '@location',
          JSON.stringify({
            lat: location?.coords.latitude,
            log: location?.coords.longitude,
          }),
        );

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
      } else {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            props.navigation.replace('Home', { crossIcon: false });
          } else {
            props.navigation.replace('NoWiFi');
          }
        });

        await AsyncStorage.setItem(
          '@location',
          JSON.stringify({
            lat: location?.coords.latitude,
            log: location?.coords.longitude,
          }),
        );

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
      }
    } catch (error) {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'NoLocation' }],
        }),
      );
    }
  };
  React.useEffect(() => {
    locationFunction();
    // const spring = () => {
    Animated.spring(springValue, {
      toValue: 1,
      friction: 1,
    }).start();
    // }
  }, []);

  return (
    <ActivityIndicator style={{ flex: 1 }} size={70} color={Colors.yellow} />
  );
}
