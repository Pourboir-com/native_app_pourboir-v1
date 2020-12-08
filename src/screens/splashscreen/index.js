import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  Animated,
  StatusBar
} from 'react-native';
import { CommonActions } from '@react-navigation/native';

import { useFonts } from 'expo-font'

export default function SplashScreen(props) {

  let [fontsLoaded] = useFonts({
    'Inter-Black': require('../../assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
  });

  const [springValue] = React.useState(new Animated.Value(0.5))

  React.useEffect(() => {
    // setTimeout(() => {
    //   props.navigation.dispatch(
    //     CommonActions.reset({
    //       index: 0,
    //       routes: [{ name: 'socialLogin' }],
    //     }),
    //   );
    // }, 3200)

    // const spring = () => {
    Animated.spring(springValue, {
      toValue: 1,
      friction: 1,
    }).start()
    // }
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#fee684"
        barStyle={'dark-content'}
      />
      {
        !fontsLoaded ?
          <View>
            <Text>
              Font loading
        </Text>
          </View>
          :
          <Animated.View
            style={{
              transform: [{ scale: springValue }],
              justifyContent: "center", alignItems: "center"
            }}>
            <Text style={styles.text}>POURBOIR'</Text>
            <Text style={styles.tagline}>More than tips</Text>
          </Animated.View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fee684',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontFamily: 'Inter-Black'
  },
  tagline: {
    fontFamily: 'Inter-Black'
  }
});


