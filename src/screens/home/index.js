import React, { useState, useEffect, useContext } from 'react';
import Header from './HeaderAnimated';
import HomeScreenContent from '../../components/HomeContent';
import { StatusBar } from 'expo-status-bar';
import { GET_RESTAURANT, GET_FAVORITE_RESTAURANT } from '../../queries';
import { reactQueryConfig } from '../../constants';
import { useQuery } from 'react-query';
import Context from '../../contextApi/context';
import * as actionTypes from '../../contextApi/actionTypes';
import { isSearch } from '../../util';
// import * as FacebookAds from 'expo-ads-facebook';
import * as Location from 'expo-location';
import AdModal from '../../components/modals/AdModal';
import { RefreshControl, ScrollView } from 'react-native';
const HomeScreen = props => {
  const [searchVal, setSearchVal] = useState('');
  const [searchEnter, setsearchEnter] = useState('');
  const [saveLocation, setSaveLocation] = useState('');
  // const [nextPageToken, setnextPageToken] = useState();
  const { state, dispatch } = useContext(Context);
  const { restaurantsDetails: data } = state;
  const [adModalVisible, setAdModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const isLocation = await Location.hasServicesEnabledAsync();
      if (isLocation) {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Lowest,
        });
        setSaveLocation(
          JSON.stringify({
            lat: location?.coords.latitude,
            log: location?.coords.longitude,
          }),
        );
      } else {
        setSaveLocation(JSON.stringify({ lat: 48.864716, log: 2.349014 }));
      }
    })();
  }, []);

  // useEffect(() => {
  //   if (props?.route?.params?.ad) {
  //     setTimeout(() => {
  //       setAdModalVisible(true);
  //     }, 300);
  //   }
  // }, []);

  useEffect(() => {
    if (!searchVal) {
      setsearchEnter('');
    }
  }, [searchVal]);

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
        search: isSearch(searchVal, searchEnter),
        // pageToken: nextPageToken,
      },
    ],
    GET_RESTAURANT,
    {
      enabled: saveLocation,
      ...reactQueryConfig,
      onSuccess: res => {
        // console.log(res?.restaurants?.results);

        dispatch({
          type: actionTypes.RESTAURANTS_DETAILS,
          payload: res?.restaurants?.results || [],
        });
      },
    },
  );

  const {
    data: userFavRestaurantData,
    isLoading: userFavRestaurantLoading,
    refetch: refetchUserFavRestaurant,
    isFetching: userFavResIsFetching,
  } = useQuery(
    ['GET_FAVORITE_RESTAURANT', { user_id: state.userDetails.user_id }],
    GET_FAVORITE_RESTAURANT,
    {
      ...reactQueryConfig,
    },
  );
  const {
    data: favRestaurantData,
    isLoading: favRestaurantLoading,
    refetch: refetchFavRestaurant,
    isFetching: favResIsFetching,
  } = useQuery(
    ['GET_FAVORITE_RESTAURANT', { popular: true }],
    GET_FAVORITE_RESTAURANT,
    {
      ...reactQueryConfig,
    },
  );
  return (
    <>
      <Header
        searchVal={searchVal}
        restaurantLoading={restaurantLoading}
        setSearchVal={setSearchVal}
        navigation={props?.navigation}
        resIsFetching={resIsFetching}
        saveLocation={saveLocation}
        refetchRestaurant={refetchRestaurant}
        setsearchEnter={setsearchEnter}
        // nextPageToken={nextPageToken}
        Data={data}
      >
        <StatusBar translucent={true} style="dark" />
        <HomeScreenContent
          restaurantLoading={restaurantLoading}
          searchVal={searchVal}
          refetchRestaurant={refetchRestaurant}
          resIsFetching={resIsFetching}
          saveLocation={saveLocation}
          searchEnter={searchEnter}
          title='around_you'
          searchTitle='result_distance'
          Data={data}
          route={props?.route}
        />
        {/* <HomeScreenContent
          restaurantLoading={userFavRestaurantLoading}
          searchVal={searchVal}
          refetchRestaurant={refetchUserFavRestaurant}
          resIsFetching={userFavResIsFetching}
          saveLocation={saveLocation}
          searchEnter={searchEnter}
          Data={userFavRestaurantData?.data || []}
          route={props?.route}
          title="fav_restaurant"
          searchTitle='fav_restaurant'
        />
        <HomeScreenContent
          restaurantLoading={favRestaurantLoading}
          searchVal={searchVal}
          refetchRestaurant={refetchFavRestaurant}
          resIsFetching={favResIsFetching}
          saveLocation={saveLocation}
          searchEnter={searchEnter}
          Data={favRestaurantData?.data || []}
          route={props?.route}
          title="popular_restaurant"
          searchTitle='popular_restaurant'
        /> */}
      </Header>
      {adModalVisible && (
        <AdModal
          adModalVisible={adModalVisible}
          setAdModalVisible={setAdModalVisible}
        />
      )}
    </>
  );
};
export default HomeScreen;

// FacebookAds.AdSettings.addTestDevice(
//   FacebookAds.AdSettings.currentDeviceHash,
// );
// FacebookAds.AdSettings.setAdvertisingTrackingEnabled(true);
// const VALID_ANDROID_PLACEMENT_ID = 'IMG_16_9_APP_INSTALL#YOUR_PLACEMENT_ID';
// useEffect(() => {
//   FacebookAds.InterstitialAdManager.showAd(VALID_ANDROID_PLACEMENT_ID)
//     .then(didClick => {
//     })
//     .catch(error => {
//       // call other ads
//     });
// }, []);
