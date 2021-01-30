import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { ImageBackground } from 'react-native';

import { Colors } from '../../constants/Theme';
import GlobalHeader from '../../components/GlobalHeader';
import { GET_YOUR_RES } from '../../queries';
import HomeScreenContent from '../../components/HomeContent';
import { reactQueryConfig } from '../../constants';
import { getAsyncStorageValues } from '../../constants';
import { useQuery } from 'react-query';
import i18n from '../../li8n';
import { View } from 'react-native';
import { Dimensions } from 'react-native';
import Context from '../../contextApi/context';

const Remove = props => {
  const [saveLocation, setSaveLocation] = useState('');
  const [data, setData] = useState([]);
  const { state } = useContext(Context);

  useEffect(() => {
    (async () => {
      const { location } = await getAsyncStorageValues();
      setSaveLocation(location);
    })();
  }, []);
  const {
    RefetchRestaurant,
  } = props.route.params;

  const navigation = useNavigation();
  const {
    data: restaurantData,
    isLoading: restaurantLoading,
    refetch: refetchRestaurant,
    isFetching: resIsFetching,
  } = useQuery(
    [
      'GET_YOUR_RES',
      {
        location: saveLocation,
        user_id: state.userDetails.user_id,
        // pageToken: nextPageToken,
        // max_results: 1,
        // page_no: 1,
      },
    ],
    GET_YOUR_RES,
    {
      ...reactQueryConfig,
      enabled: saveLocation,
      onSuccess: res => {
        setData(res?.restaurants?.results || []);
      },
    },
  );

  // const handleLoadMore = () => {
  //   // setnextPageToken(restaurantData.restaurants.next_page_token);
  //   console.log('next page load');
  // };

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
        restaurantLoading={restaurantLoading}
        refetchRestaurant={refetchRestaurant}
        isFetch={true}
        resIsFetching={resIsFetching}
        RefetchRestaurant={RefetchRestaurant}
        // DeleteRestaurant={DeleteRestaurant}
        Data={data}
        // handleLoadMore={handleLoadMore}
      />
    </>
  );
};
export default Remove;
