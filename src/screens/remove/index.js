import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { getAsyncStorageValues } from '../../constants';
import { Colors } from '../../constants/Theme';
import GlobalHeader from '../../components/GlobalHeader';
import HomeScreenContent from '../../components/HomeContent';
import i18n from '../../li8n';
import { View } from 'react-native';
import { Dimensions } from 'react-native';
import Context from '../../contextApi/context';
import { useQuery } from 'react-query';
import { reactQueryConfig } from '../../constants';
import * as actionTypes from '../../contextApi/actionTypes';
import { GET_YOUR_RES } from '../../queries';

const Remove = props => {
  const [saveLocation, setSaveLocation] = useState('');
  const { state, dispatch } = useContext(Context);
  const { yourRestaurants: data, userDetails } = state;
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { location } = await getAsyncStorageValues();
      setSaveLocation(location);
    })();
  }, []);

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
      enabled: saveLocation && userDetails.user_id && !data.length,
      onSuccess: res => {
        console.log('Your restaurants fetched!!');
        dispatch({
          type: actionTypes.YOUR_RESTAURANTS,
          payload: res?.restaurants?.results || [],
        });
      },
    },
  );

  return (
    <>
      <View
        style={{
          width: '100%',
          height: 110,
          backgroundColor: '#f9f9f9',
        }}
      >
        <View
          style={{
            width: '100%',
            height: 110,
            borderBottomLeftRadius: Dimensions.get('window').width * 0.06,
            borderBottomRightRadius: Dimensions.get('window').width * 0.06,
            overflow: 'hidden',
            backgroundColor: '#f9f9f9',
          }}
        >
          <ImageBackground
            style={{
              width: '100%',
              height: 110,
            }}
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
              borderRadius={true}
            />
          </ImageBackground>
        </View>
      </View>

      <HomeScreenContent
        route={props.route}
        restaurantLoading={yourRestaurantLoading}
        refetchRestaurant={yourRefetchRestaurant}
        isFetch={true}
        resIsFetching={yourResIsFetching}
        Data={data}
        // handleLoadMore={handleLoadMore}
      />
    </>
  );
};
export default Remove;
