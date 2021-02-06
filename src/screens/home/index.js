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

const HomeScreen = props => {
  const [searchVal, setSearchVal] = useState('');
  const [searchIconPress, setSearchIconPress] = useState(false);
  const [saveLocation, setSaveLocation] = useState('');
  const [nextPageToken, setnextPageToken] = useState();
  const { state, dispatch } = useContext(Context);
  const { restaurantsDetails: data, userDetails} = state;

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
      },
    ],
    GET_RESTAURANT,
    {
      ...reactQueryConfig,
      enabled: saveLocation,
      onSuccess: res => {
        console.log('Home Restaurats....');
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
        console.log('Your restaurants fetched!!');
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
          />
          <StatusBar translucent={true} style="dark" />
          <HomeScreenContent
            restaurantLoading={restaurantLoading}
            refetchRestaurant={refetchRestaurant}
            saveLocation={saveLocation}
            resIsFetching={resIsFetching}
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
