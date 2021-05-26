import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { Colors } from '../../constants/Theme';
import GlobalHeader from '../../components/GlobalHeader';
import HomeScreenContent from '../../components/HomeContent';
import i18n from '../../li8n';
import { Dimensions } from 'react-native';
import { getAsyncStorageValues } from '../../constants';
import { GET_YOUR_RES } from '../../queries';
import { reactQueryConfig } from '../../constants';
import { useQuery } from 'react-query';

const Remove = props => {
  const [saveLocation, setSaveLocation] = useState('');
  const [userInfo, setuserInfo] = useState();

  useEffect(() => {
    (async () => {
      const { location } = await getAsyncStorageValues();
      const { userInfo = {} } = await getAsyncStorageValues();
      setuserInfo(userInfo);
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
        user_id: userInfo?.user_id,
      },
    ],
    GET_YOUR_RES,
    {
      ...reactQueryConfig,
      enabled: saveLocation && userInfo?.user_id,
    },
  );

  return (
    <>
      <ImageBackground
        style={{
          width: '100%',
          height: 100,
          borderBottomLeftRadius: Dimensions.get('window').width * 0.06,
          borderBottomRightRadius: Dimensions.get('window').width * 0.06,
          overflow: 'hidden',
        }}
        source={require('../../assets/images/Group3.png')}
      >
        <GlobalHeader
          arrow={true}
          headingText={i18n.t('your_restaurant')}
          fontSize={17}
          color={Colors.fontDark}
          navigation={props.navigation}
          setting={true}
          backgroundColor={'transparent'}
          borderRadius={true}
        />
      </ImageBackground>
      <HomeScreenContent
        route={props?.route}
        restaurantLoading={yourRestaurantLoading}
        resIsFetching={yourResIsFetching}
        refetchRestaurant={yourRefetchRestaurant}
        isFetch={true}
        Data={yourRestaurantData?.restaurants?.results || []}
        saveLocation={saveLocation}
      />
    </>
  );
};
export default Remove;
