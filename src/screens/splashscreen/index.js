import React, { useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
const imgSplash = require('../../assets/images/splash.png');
import * as Font from 'expo-font';
import NetInfo from '@react-native-community/netinfo';
import { getAsyncStorageValues } from '../../constants';
import Context from '../../contextApi/context';
import * as actionTypes from '../../contextApi/actionTypes';

export default function SplashScreen(props) {
  const [Internet, setInternet] = React.useState(false);
  const [location, setLocation] = React.useState(false);
  const { dispatch } = useContext(Context);

  // let [fontsLoaded] = useFonts({
  //   Proximabold: require('../../assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
  // });

  // useEffect(() => {
  //   (async () => {
  //     const { userInfo } = await getAsyncStorageValues();
  //     let userDetails = {
  //       name: userInfo.name,
  //       image: userInfo.picture,
  //       email: userInfo.email,
  //       accessToken: userInfo.accessToken,
  //     };
  //     dispatch({
  //       type: actionTypes.USER_DETAILS,
  //       payload: userDetails,
  //     });
  //   })();
  // }, []);

  // const checkInternet = () => {
  //   NetInfo.fetch().then(state => {
  //     if (state.isConnected) {
  //       setInternet(true);
  //     } else {
  //       setInternet(false);
  //     }
  //   });
  // };

  const [springValue] = React.useState(new Animated.Value(0.5));
  const locationFunction = async () => {
    const isLocation = await Location.hasServicesEnabledAsync();
    if (isLocation) {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      await AsyncStorage.setItem(
        '@location',
        JSON.stringify({
          lat: location?.coords.latitude,
          log: location?.coords.longitude,
        }),
      );
      console.log(Internet);
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          props.navigation.replace('Home', { crossIcon: false });
        } else {
          props.navigation.replace('NoWiFi');
        }
      });
    } else {
      try {
        let values = await Location.requestPermissionsAsync();
        if (values === 'granted') {
          props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'NoLocation' }],
            }),
          );
        } else {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
          });
          await AsyncStorage.setItem(
            '@location',
            JSON.stringify({
              lat: location?.coords.latitude,
              log: location?.coords.longitude,
            }),
          );

          NetInfo.fetch().then(state => {
            if (state.isConnected) {
              props.navigation.replace('Home', { crossIcon: false });
            } else {
              props.navigation.replace('NoWiFi');
            }
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
    <ImageBackground
      style={{
        width: Dimensions.get('window').width * 1,
        height: Dimensions.get('screen').height * 1,
      }}
      resizeMode="stretch"
      source={imgSplash}
    ></ImageBackground>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fee684',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 30,
//     fontFamily: 'Proximabold',
//   },
//   tagline: {
//     fontFamily: 'Proximabold',
//   },
// });
