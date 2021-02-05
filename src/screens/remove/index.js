import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { ImageBackground } from 'react-native';

import { Colors } from '../../constants/Theme';
import GlobalHeader from '../../components/GlobalHeader';
import HomeScreenContent from '../../components/HomeContent';
import i18n from '../../li8n';
import { View } from 'react-native';
import { Dimensions } from 'react-native';
import Context from '../../contextApi/context';

const Remove = props => {
  const { state, dispatch } = useContext(Context);
  const { yourRestaurants: data } = state;
  const {
    yourRestaurantLoading,
    yourRefetchRestaurant,
    yourResIsFetching,
  } = props.route.params;

  const navigation = useNavigation();
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
