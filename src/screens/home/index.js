import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';

import { Colors } from '../../constants/Theme';
import Header from './HeaderAnimated';
import HeaderSimple from './HeaderSimple';
import GlobalHeader from '../../components/GlobalHeader';

import HomeScreenContent from '../../components/HomeContent';
import { StatusBar } from 'expo-status-bar';

import i18n from '../../li8n';
import { ImageBackground } from 'react-native';
import { loadAsync } from 'expo-font';

const HomeScreen = props => {
  // const [loading, setLoading] = useState(false);
  const [searchIconPress, setSearchIconPress] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadFont() {
      await loadAsync({
        // Load a font `Montserrat` from a static resource
        ProximaNova: require('../../assets/fonts/ProximaNova/ProximaNova-Regular.otf'),
        ProximaNovaBold: require('../../assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
      });
    }

    loadFont();

    // setTimeout(() => {
    //   setLoading(false);
    // }, 2500);

  }, []);

  return (
    <>
      {/* <StatusBar /> */}
      {!props.route.params.crossIcon ? (
        <>
          {!searchIconPress ? (
            <Header
              setsearchIconPress={setSearchIconPress}
              searchIconPress={searchIconPress}
              navigation={props.navigation}
            >
              <StatusBar translucent={true} style="dark" />

              {
                <HomeScreenContent
                  // loading={loading}
                  // setLoading={setLoading}
                  searchIconPress={searchIconPress}
                  setSearchIconPress={setSearchIconPress}
                  route={props.route}
                />
              }
            </Header>
          ) : (
            <>
              <HeaderSimple
                setSearchIconPress={setSearchIconPress}
                searchIconPress={searchIconPress}
              />
              <StatusBar translucent={true} style="dark" />
              {
                <HomeScreenContent
                  // loading={loading}
                  // setLoading={setLoading}
                  searchIconPress={searchIconPress}
                  setSearchIconPress={setSearchIconPress}
                  route={props.route}
                />
              }
            </>
          )}
        </>
      ) : (
        <>
          <ImageBackground
            style={{ backgroundColor: 'red', width: '100%', height: 110 }}
            resizeMode="cover"
            source={require('../../assets/images/Group3.png')}
          >
            <GlobalHeader
              arrow={true}
              headingText={i18n.t('your_restaurant')}
              fontSize={17}
              color={Colors.fontDark}
              navigation={navigation}
              setting={true}
              backgroundColor={'transparent'}
            />
          </ImageBackground>
          <StatusBar translucent={true} style="dark" />
          <GlobalHeader
            arrow={true}
            headingText={i18n.t('your_restaurant')}
            fontSize={17}
            color={Colors.fontDark}
            navigation={navigation}
            setting={true}
            backgroundColor={'transparent'}
            borderRadius={true}
          />
        </>
      )}
    </>
  );
};
export default HomeScreen;
