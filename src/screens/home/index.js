import React, { useState, useEffect, useContext } from 'react';
import Header from './HeaderAnimated';
import HeaderSimple from './HeaderSimple';
import HomeScreenContent from '../../components/HomeContent';
import { StatusBar } from 'expo-status-bar';
import { getAsyncStorageValues } from '../../constants';
import { GET_RESTAURANT } from '../../queries';
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
  const [data, setData] = useState(
    state?.restaurantsDetails ? state?.restaurantsDetails : [],
  );

  useEffect(() => {
    setData(state?.restaurantsDetails);
  }, [state?.restaurantsDetails]);

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
        dispatch({
          type: actionTypes.RESTAURANTS_DETAILS,
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
          refetchRestaurant={refetchRestaurant}
          resIsFetching={resIsFetching}
          saveLocation={saveLocation}
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
