import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Animated,
  Dimensions,
  StatusBar
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { useFonts } from 'expo-font'

const imgSplash = require('../../assets/images/splash.png')


export default function SplashScreen(props) {

  let [fontsLoaded] = useFonts({
    'Proximabold': require('../../assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
  });

  const [springValue] = React.useState(new Animated.Value(0.5))

  React.useEffect(() => {
    setTimeout(() => {
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'socialLogin' }],
        }),
      );
    }, 3200)

    // const spring = () => {
    Animated.spring(springValue, {
      toValue: 1,
      friction: 1,
    }).start()
    // }
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground 
      style={{
        width:Dimensions.get('window').width*1,
        height:Dimensions.get('window').height*1
      }}
      resizeMode="cover"
      source={imgSplash}></ImageBackground>
      {/* <Animated.View
        style={{
          transform: [{ scale: springValue }],
          justifyContent: "center", alignItems: "center"
        }}>
        <Text style={styles.text}>POURBOIR'</Text>
        <Text style={styles.tagline}>More than tips</Text>
      </Animated.View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fee684',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontFamily: 'Proximabold'
  },
  tagline: {
    fontFamily: 'Proximabold'
  }
});


