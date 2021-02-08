import React, { useState, useEffect, useContext } from 'react';
import Header from './HeaderAnimated';
import HeaderSimple from './HeaderSimple';
import HomeScreenContent from '../../components/HomeContent';
import { StatusBar } from 'expo-status-bar';
import { getAsyncStorageValues } from '../../constants';
import { GET_RESTAURANT, GET_YOUR_RES } from '../../queries';
import { reactQueryConfig } from '../../constants';
import { useQuery } from 'react-query';
import Context from '../../contextApi/context';
import * as actionTypes from '../../contextApi/actionTypes';
import { isSearch } from '../../util';

const HomeScreen = props => {
  const [searchVal, setSearchVal] = useState('');
  const [searchEnter, setsearchEnter] = useState('');
  const [searchIconPress, setSearchIconPress] = useState(false);
  const [saveLocation, setSaveLocation] = useState('');
  const [nextPageToken, setnextPageToken] = useState();
  const { state, dispatch } = useContext(Context);
  const { restaurantsDetails: data, userDetails } = state;

  useEffect(() => {
    (async () => {
      const { location } = await getAsyncStorageValues();
      setSaveLocation(location);
    })();
  }, []);

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
      ...reactQueryConfig,
      enabled: saveLocation,
      onSuccess: res => {
        dispatch({
          type: actionTypes.RESTAURANTS_DETAILS,
          payload: res?.restaurants?.results || [],
        });
      },
    },
  );

  const {
    data: yourRestaurantData,
    isLoading: yourRestaurantLoading,
    refetch: yourRefetchRestaurant,
    isFetching: yourResIsFetching,
  } = useQuery(
    [
      'GET_YOUR_RES',
      {
        location: saveLocation,
        user_id: userDetails.user_id,
        // pageToken: nextPageToken,
        // max_results: 1,
        // page_no: 1,
      },
    ],
    GET_YOUR_RES,
    {
      ...reactQueryConfig,
      enabled: saveLocation && userDetails.user_id,
      onSuccess: res => {
        dispatch({
          type: actionTypes.YOUR_RESTAURANTS,
          payload: res?.restaurants?.results || [],
        });
      },
    },
  );

  // const handleLoadMore = () => {
  //   setnextPageToken(restaurantData.restaurants.next_page_token);
  //   // console.log('next page load');
  // };

  return (
    <>
      {!searchIconPress ? (
        <Header
          setsearchIconPress={setSearchIconPress}
          searchIconPress={searchIconPress}
          searchVal={searchVal}
          restaurantLoading={restaurantLoading}
          setSearchVal={setSearchVal}
          navigation={props?.navigation}
          resIsFetching={resIsFetching}
          saveLocation={saveLocation}
          yourRestaurantLoading={yourRestaurantLoading}
          yourRefetchRestaurant={yourRefetchRestaurant}
          yourResIsFetching={yourResIsFetching}
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
            // isFetch={searchVal === '' ? true : false}
            route={props?.route}
            // handleLoadMore={handleLoadMore}
          />
        </Header>
      ) : (
        <>
          <HeaderSimple
            setSearchIconPress={setSearchIconPress}
            searchIconPress={searchIconPress}
            searchVal={searchVal}
            setSearchVal={setSearchVal}
            setsearchEnter={setsearchEnter}
          />
          <StatusBar translucent={true} style="dark" />
          <HomeScreenContent
            restaurantLoading={restaurantLoading}
            refetchRestaurant={refetchRestaurant}
            saveLocation={saveLocation}
            searchVal={searchVal}
            resIsFetching={resIsFetching}
            searchEnter={searchEnter}
            Data={data}
            route={props?.route}
            // handleLoadMore={handleLoadMore}
          />
        </>
      )}
    </>
  );
};
export default HomeScreen;
