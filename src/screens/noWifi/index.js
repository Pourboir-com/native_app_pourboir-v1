import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import WiFi from '../../assets/images/WiFi.png';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Context from '../../contextApi/context';

const fetchFont = () => {
  return Font.loadAsync({
    ProximaNovaBold: require('../../assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
  });
};

const NoWiFi = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const { localizationContext } = useContext(Context);

  return (
    <>
      {!fontLoaded ? (
        <AppLoading
          startAsync={fetchFont}
          onFinish={() => {
            setFontLoaded(true);
          }}
          onError={() => {}}
        />
      ) : (
        <View style={styles.container}>
          <Image source={WiFi} />
          <Text
            style={{
              marginTop: 30,
              fontFamily: 'ProximaNovaSemiBold',
              fontSize: 18,
              maxWidth: 190,
              textAlign: 'center',
            }}
          >
            {localizationContext.t('must_loggedIn')}
          </Text>
        </View>
      )}
    </>
  );
};
export default NoWiFi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
});
