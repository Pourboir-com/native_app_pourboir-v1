import React, { useState, useEffect, useContext, useRef } from 'react';
import Header from './HeaderAnimated';
import HomeScreenContent from '../../components/HomeContent';
import { StatusBar } from 'expo-status-bar';
import { GET_RESTAURANT, GET_FAVORITE_RESTAURANT } from '../../queries';
import { reactQueryConfig } from '../../constants';
import { useQuery } from 'react-query';
import Context from '../../contextApi/context';
// import * as actionTypes from '../../contextApi/actionTypes';
import { isSearch } from '../../util';
// import * as FacebookAds from 'expo-ads-facebook';
import * as Location from 'expo-location';
<<<<<<< HEAD
import AdModal from '../../components/modals/AdModal';
import NoFavRestaurant from '../../components/no-fav-card';
import Discover from '../../components/open-card/discover';
=======
// import AdModal from '../../components/modals/AdModal';
// import NoFavRestaurant from '../../components/no-fav-card';
import { AppState } from 'react-native';
import * as actionTypes from '../../contextApi/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInSeconds } from 'date-fns';
>>>>>>> c6e9cfc1dfcf56b73178bd42736c9909c8490689

const HomeScreen = props => {
  const [searchVal, setSearchVal] = useState('');
  const [searchEnter, setsearchEnter] = useState('');
  const [refreshAnimation, setRefreshAnimation] = useState(false);

  const [saveLocation, setSaveLocation] = useState('');
  // const [nextPageToken, setnextPageToken] = useState();
  const { state, dispatch } = useContext(Context);
  // const { restaurantsDetails: data } = state;
  // const [adModalVisible, setAdModalVisible] = useState(false);
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const currentLocation = async () => {
    const isLocation = await Location.hasServicesEnabledAsync();
    const isLocationOn = await Location.getForegroundPermissionsAsync();
    if (isLocation && isLocationOn.granted) {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
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
  };

  const recordStartTime = async () => {
    try {
      const now = new Date();
      await AsyncStorage.setItem('@start_time', now.toISOString());
    } catch (err) {
      // TODO: handle errors from setItem properly
    }
  };
  const getElapsedTime = async () => {
    try {
      const startTime = await AsyncStorage.getItem('@start_time');
      const now = new Date();
      return differenceInSeconds(now, Date.parse(startTime));
    } catch (err) {
      // TODO: handle errors from setItem properly
    }
  };

  const _handleAppStateChange = async nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // if (props?.route?.name == 'Home') {
      //   setAdModalVisible(true);
      // }
      const elapsed = await getElapsedTime();
      if (elapsed > 300) {
        currentLocation();
      }
      setRefreshAnimation(prev => !prev);
    }
    if (nextAppState === 'background') {
      recordStartTime();
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    currentLocation();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: actionTypes.REFRESH_ANIMATION,
        payload: !state.refreshAnimation,
      });
    }, 10);
  }, [refreshAnimation]);

  // useEffect(() => {
  //   if (props?.route?.params?.ad) {
  //     setTimeout(() => {
  //       setAdModalVisible(true);
  //     }, 500);
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
      // onSuccess: res => {
      // console.log(res?.restaurants?.results);
      // dispatch({
      //   type: actionTypes.RESTAURANTS_DETAILS,
      //   payload: res?.restaurants?.results || [],
      // });
      // },
    },
  );

  const {
    data: userFavRestaurantData,
    isLoading: userFavRestaurantLoading,
    refetch: refetchUserFavRestaurant,
    isFetching: userFavResIsFetching,
  } = useQuery(
    [
      'GET_FAVORITE_RESTAURANT',
      {
        user_id: state.userDetails.user_id,
        location: saveLocation,
        isAll: true,
      },
    ],
    GET_FAVORITE_RESTAURANT,
    { enabled: saveLocation, ...reactQueryConfig },
  );

  const {
    data: favRestaurantData,
    isLoading: favRestaurantLoading,
    refetch: refetchFavRestaurant,
    isFetching: favResIsFetching,
  } = useQuery(
    [
      'GET_FAVORITE_RESTAURANT',
      { popular: true, location: saveLocation, isAll: true },
    ],
    GET_FAVORITE_RESTAURANT,
    { enabled: saveLocation, ...reactQueryConfig },
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
        Data={restaurantData?.restaurants?.results || []}
        // nextPageToken={nextPageToken}
      >
        <StatusBar translucent={true} style="dark" />
        {/* <Media /> */}
        <Discover />
        {/* <HomeScreenContent
          restaurantLoading={restaurantLoading}
          searchVal={searchVal}
          refetchRestaurant={() => {
            refetchUserFavRestaurant();
            refetchFavRestaurant();
          }}
          resIsFetching={resIsFetching}
          saveLocation={saveLocation}
          searchEnter={searchEnter}
          title="around_you"
          searchTitle="result_distance"
          Data={restaurantData?.restaurants?.results || []}
          route={props?.route}
        />
        <HomeScreenContent
          restaurantLoading={userFavRestaurantLoading}
          searchVal={searchVal}
          refetchRestaurant={() => {
            refetchUserFavRestaurant();
            refetchFavRestaurant();
          }}
          resIsFetching={userFavResIsFetching}
          saveLocation={saveLocation}
          searchEnter={searchEnter}
          Data={userFavRestaurantData?.data || []}
          route={props?.route}
          title="fav_restaurant"
          searchTitle="fav_restaurant"
          favoriteRes
          noRefresh
        />
        <HomeScreenContent
          restaurantLoading={favRestaurantLoading}
          searchVal={searchVal}
          refetchRestaurant={() => {
            refetchUserFavRestaurant();
            refetchFavRestaurant();
          }}
          resIsFetching={favResIsFetching}
          saveLocation={saveLocation}
          searchEnter={searchEnter}
          Data={favRestaurantData?.data || []}
          route={props?.route}
          title="popular_restaurant"
          searchTitle="popular_restaurant"
<<<<<<< HEAD
        /> */}
=======
          noRefresh
        />
>>>>>>> c6e9cfc1dfcf56b73178bd42736c9909c8490689
      </Header>
      {/* {adModalVisible && (
        <AdModal
          adModalVisible={adModalVisible}
          setAdModalVisible={setAdModalVisible}
        />
      )} */}
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
