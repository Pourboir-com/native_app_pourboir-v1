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
import { getAsyncStorageValues } from '../../constants';
import { GET_RESTAURANT } from '../../queries';
import { reactQueryConfig } from '../../constants';
import { useQuery } from 'react-query';
import { View, Text } from 'react-native-animatable';

const HomeScreen = props => {
  const [Fontloading, setFontLoading] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [searchIconPress, setSearchIconPress] = useState(false);
  const [data, setData] = useState([]);
  const [saveLocation, setSaveLocation] = useState('');
  const [nextPageToken, setnextPageToken] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    async function loadFont() {
      await loadAsync({
        // Load a font `Montserrat` from a static resource
        ProximaNova: require('../../assets/fonts/ProximaNova/ProximaNova-Regular.otf'),
        ProximaNovaBold: require('../../assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
      });
      setFontLoading(true);
    }
    loadFont();
  }, []);

  useEffect(() => {
    (async () => {
      const { location } = await getAsyncStorageValues();
      setSaveLocation(location);
    })();
  }, []);

  const {
    data: restaurantData,
    isLoading: restaurantLoading,
    refetch: refetchRestaurant,
    isFetching: resIsFetching,
  } = useQuery(
    [
      'GET_RESTAURANT',
      {
        location: saveLocation,
        search: searchVal.split(' ').join('').length >= 3 ? searchVal : '',
        // pageToken: nextPageToken,
        // maxResults: 20,
      },
    ],
    GET_RESTAURANT,
    {
      ...reactQueryConfig,
      enabled: saveLocation,
      onSuccess: res => {
        setData(res?.restaurants?.results || []);
      },
    },
  );

  const handleLoadMore = () => {
    setnextPageToken(restaurantData.restaurants.next_page_token);
    console.log('next page load');
  };

  return (
    <>
      {/* <StatusBar /> */}
      {!props.route.params.crossIcon ? (
        <>
          {!searchIconPress ? (
            Fontloading ? (
              <Header
                setsearchIconPress={setSearchIconPress}
                searchIconPress={searchIconPress}
                searchVal={searchVal}
                setSearchVal={setSearchVal}
                navigation={props.navigation}
                saveLocation={saveLocation}
                nextPageToken={nextPageToken}
                Data={data}
              >
                <StatusBar translucent={true} style="dark" />

                <HomeScreenContent
                  restaurantLoading={restaurantLoading}
                  refetchRestaurant={refetchRestaurant}
                  resIsFetching={resIsFetching}
                  Data={data}
                  route={props.route}
                  handleLoadMore={handleLoadMore}
                />
              </Header>
            ) : (
              <View>
                <Text>Loading..</Text>
              </View>
            )
          ) : (
            <>
              <HeaderSimple
                setSearchIconPress={setSearchIconPress}
                searchIconPress={searchIconPress}
                searchVal={searchVal}
                setSearchVal={setSearchVal}
              />
              <StatusBar translucent={true} style="dark" />
              <HomeScreenContent
                restaurantLoading={restaurantLoading}
                refetchRestaurant={refetchRestaurant}
                resIsFetching={resIsFetching}
                Data={data}
                route={props.route}
                handleLoadMore={handleLoadMore}
              />
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
