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
        console.log(res?.restaurants?.results);

        dispatch({
          type: actionTypes.RESTAURANTS_DETAILS,
          payload: res?.restaurants?.results || [],
        });
      },
    },
  );

  const {
    data: favRestaurantData,
    isLoading: favRestaurantLoading,
    refetch: refetchFavRestaurant,
    isFetching: favResIsFetching,
  } = useQuery(
    [
      'GET_FAVORITE_RESTAURANT',
      {
        google_place_id: 'ChIJ_027a6Y_sz4R68RBIw0-daQ',
        // pageToken: nextPageToken,
      },
    ],
    GET_FAVORITE_RESTAURANT,
    {
      enabled: saveLocation,
      ...reactQueryConfig,
      onSuccess: res => {
        alert('Get Favorites Restaurants..');
        console.log(res);
      },
    },
  );

  // console.log(restaurantData);

  // const handleLoadMore = () => {
  //   setnextPageToken(restaurantData.restaurants.next_page_token);
  //   // console.log('next page load');
  // };

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
          Data={data}
          route={props?.route}
          favRestaurantData={favRestaurantData}
          refetchFavRestaurant={refetchFavRestaurant}
        />
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
