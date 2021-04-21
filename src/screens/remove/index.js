import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { Colors } from '../../constants/Theme';
import GlobalHeader from '../../components/GlobalHeader';
import HomeScreenContent from '../../components/HomeContent';
import i18n from '../../li8n';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
// import Context from '../../contextApi/context';
import { getAsyncStorageValues } from '../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GET_YOUR_RES } from '../../queries';
import { reactQueryConfig } from '../../constants';
import { useQuery } from 'react-query';
// import * as actionTypes from '../../contextApi/actionTypes';

const Remove = props => {
  // const { state, dispatch } = useContext(Context);
  const [saveLocation, setSaveLocation] = useState('');
  const [userInfo, setuserInfo] = useState();
  // const { yourRestaurants: data } = state;

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
        // pageToken: nextPageToken,
        // max_results: 1,
        // page_no: 1,
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
        // handleLoadMore={handleLoadMore}
      />
      <View style={{ backgroundColor: '#f9f9f9' }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('FindJob')}
          style={styles.viewLastBtn}
        >
          <Text
            style={{
              fontFamily: 'ProximaNova',
              fontSize: 16,
              color: Colors.fontDark,
            }}
          >
            {i18n.t('looking_for_job')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default Remove;
const styles = StyleSheet.create({
  viewLastBtn: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.yellow,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: Platform.OS === 'ios' ? 25 : 15,
  },
});
