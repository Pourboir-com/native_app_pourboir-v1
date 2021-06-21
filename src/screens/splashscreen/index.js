import React, { useEffect, useContext, useRef } from 'react';
import { Animated, ActivityIndicator, Platform } from 'react-native';
// import { CommonActions } from '@react-navigation/native';
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
import * as Notifications from 'expo-notifications';
import { useMutation } from 'react-query';
import { SEND_PUSH_TOKEN } from '../../queries';
import Constants from 'expo-constants';
import * as Localization from 'expo-localization';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

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

  const testID = Platform.select({
    // https://developers.google.com/admob/ios/test-ads
    ios: 'ca-app-pub-3940256099942544/1712485313',
    // https://developers.google.com/admob/android/test-ads
    android: 'ca-app-pub-3940256099942544/5224354917',
  });

  let productionID = Platform.select({
    // https://developers.google.com/admob/ios/test-ads
    ios: 'ca-app-pub-3940256099942544/1712485313',
    // https://developers.google.com/admob/android/test-ads
    android: 'ca-app-pub-3940256099942544/5224354917',
  });

  // Is a real device and running in production.
  const adUnitID = Constants.isDevice && !__DEV__ ? productionID : testID;

  let showAd = async () => {
    await AdMobInterstitial.setAdUnitID(adUnitID); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
  };

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
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
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(async token => {
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

  const checkInternet = userInfo => {
    NetInfo.fetch().then(state => {
      if (state.isConnected && userInfo?.user_id) {
        props.navigation.replace('Home', { crossIcon: false });
      } else if (state.isConnected && !userInfo?.user_id) {
        props.navigation.replace('socialLogin');
      } else {
        props.navigation.replace('NoWiFi');
      }
    });
  };

  const setCurrency = () => {
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

  const [springValue] = React.useState(new Animated.Value(0.5));
  const locationFunction = async () => {
    const { userInfo = {} } = await getAsyncStorageValues();
    try {
      if (Platform.OS === 'ios') {
        const { status } = await requestTrackingPermissionsAsync();
        if (status === 'granted') {
          console.log('Yay! I have user permission to track data');
        }
      }
      let values = await Location.requestForegroundPermissionsAsync();
      if (values === 'granted') {
        // props.navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: 'NoLocation' }],
        //   }),
        // );
        try {
          await showAd();
          props.navigation.replace('Home', { crossIcon: false });
        } catch {
          props.navigation.replace('Home', { crossIcon: false });
        }
      }

      const isLocation = await Location.hasServicesEnabledAsync();
      if (isLocation) {
        try {
          await showAd();
          checkInternet(userInfo);
          setCurrency();
        } catch {
          checkInternet(userInfo);
          setCurrency();
        }
      } else {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        try {
          await showAd();
          checkInternet(userInfo);
          setCurrency();
        } catch {
          checkInternet(userInfo);
          setCurrency();
        }
      }
    } catch (error) {
      // props.navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: 'NoLocation' }],
      //   }),
      // );
      try {
        await showAd();
        props.navigation.replace('Home', { crossIcon: false });
      } catch {
        props.navigation.replace('Home', { crossIcon: false });
      }
    }
  };
  React.useEffect(() => {
    locationFunction();
    Animated.spring(springValue, {
      toValue: 1,
      friction: 1,
    }).start();
  }, []);

  return (
    <ActivityIndicator style={{ flex: 1 }} size={70} color={Colors.yellow} />
  );
}
