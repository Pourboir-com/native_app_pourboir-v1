import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  FlatList,
  Image,
  Platform,
} from 'react-native';
import { Colors } from '../constants/Theme';
import HomeCard from './HomeCard';
import { filteredMinusRestaurant, sortRestaurant } from '../util';
import { HomeCardSkeleton } from '../components/skeleton';
import NoListImg from '../assets/images/emptyRestaurantList.png';
import { DELETE_RES } from '../queries';
import { useMutation } from 'react-query';
import Context from '../contextApi/context';
import * as actionTypes from '../contextApi/actionTypes';
import Spinner from 'react-native-loading-spinner-overlay';
import NoFavRestaurant from './no-fav-card';
import get from 'lodash/get';

export default function HomeScreenContent({
  restaurantLoading,
  refetchRestaurant,
  resIsFetching,
  searchEnter,
  Data,
  saveLocation,
  route,
  title,
  searchTitle,
  favoriteRes,
  refetchAll,
}) {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [deleteLoading, setdeleteLoading] = useState(false);
  const { state, dispatch, localizationContext } = useContext(Context);
  const [deleteRestaurant] = useMutation(DELETE_RES);
  useEffect(() => {
    setData(Data);
  }, [Data]);

  const updateRestaurants = (state, placeId) => {
    let FilteredRestaurant = filteredMinusRestaurant(state, placeId);
    dispatch({
      type: actionTypes.RESTAURANTS_DETAILS,
      payload: FilteredRestaurant,
    });
  };

  const dummyArray = [1, 2];

  const DeleteRestaurant = async (waiter_id, place_id) => {
    if (state.userDetails.user_id) {
      setdeleteLoading(true);
      let userInfo = {
        id: waiter_id,
        user_id: state.userDetails.user_id,
      };
      await deleteRestaurant(userInfo, {
        onSuccess: async () => {
          await refetchRestaurant();
          updateRestaurants(state, place_id);
          setdeleteLoading(false);
        },
        onError: () => {
          setdeleteLoading(false);
        },
      });
    }
  };

  const noData =
    !data.length && !restaurantLoading && !resIsFetching && saveLocation;
  if (noData) {
    return (
      <>
        {route?.params?.crossIcon ? (
          <View style={styles.viewEmptyList}>
            <View
              style={{
                backgroundColor: '#fff',
                width: 160,
                height: 160,
                borderRadius: 100,
                marginVertical: 20,
              }}
            >
              <Image
                source={NoListImg}
                style={{
                  width: 260,
                  height: 350,
                  marginTop: -115,
                  marginLeft: -40,
                }}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.textBold}>
                {localizationContext.t('no_restaurant')}
              </Text>
              <Text style={[styles.textLight, { width: 320 }]}>
                {localizationContext.t('search_rest')}:{' '}
                <Text style={{ fontFamily: 'ProximaNovaBold' }}>
                  {localizationContext.t('you_waiter')}
                </Text>
              </Text>
            </View>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: '#F9F9F9',
              // marginTop: 0,
              // flex: 1,
            }}
          >
            <Text
              style={[styles.txtHeading, { fontFamily: 'ProximaNovaBold' }]}
            >
              {searchEnter && !favoriteRes
                ? localizationContext.t('result_distance')
                : localizationContext.t(title)}
            </Text>
            {!favoriteRes ? (
              <Text
                style={[
                  styles.txt2NoRest,
                  { fontFamily: 'ProximaNovaSemiBold' },
                ]}
              >
                {localizationContext.t('no_restaurant_found')}
              </Text>
            ) : (
              <View style={{ marginTop: 20, marginLeft: 5 }}>
                <NoFavRestaurant />
              </View>
            )}
          </View>
        )}
      </>
    );
  }
  return (
    <>
      {/* {resIsFetching && <BallIndicator style={{ marginTop: 25 }} size={25} color="black" />} */}
      {/* <Spinner visible={deleteLoading} /> */}
      {!route.params.crossIcon && (
        <Text style={[styles.txtHeading, { fontFamily: 'ProximaNovaBold' }]}>
          {searchEnter
            ? localizationContext.t(searchTitle)
            : localizationContext.t(title)}
        </Text>
      )}
      <View
        style={{
          marginTop: 17,
          marginLeft: 2,
        }}
      >
        {restaurantLoading || !saveLocation ? (
          <FlatList
            data={dummyArray}
            showsVerticalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            scrollEnabled={false}
            alwaysBounceVertical={false}
            bounces={false}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => <HomeCardSkeleton />}
          />
        ) : (
          <FlatList
            data={restaurantLoading ? dummyArray : sortRestaurant(data)}
            showsHorizontalScrollIndicator={false}
            // onEndReached={handleLoadMore}
            // onEndReachedThreshold={0.5}
            alwaysBounceHorizontal={false}
            horizontal={true}
            keyboardShouldPersistTaps={'handled'}
            alwaysBounceVertical={false}
            // numColumns={2}
            // bounces={false}
            keyExtractor={(item, index) => index}
            renderItem={itemData => {
              if (Object.keys(itemData.item).length) {
                return (
                  <HomeCard
                    navigation={navigation}
                    key={itemData?.item?.place_id}
                    img={
                      itemData?.item?.store_details?.background_image ||
                      get(itemData?.item, 'photos[0]')
                    }
                    rating={
                      Number(itemData?.item?.our_rating) > 0
                        ? itemData?.item?.our_rating
                        : itemData?.item?.rating
                    }
                    name={itemData?.item?.name}
                    DeleteRestaurant={
                      (data,
                      i =>
                        DeleteRestaurant(
                          itemData?.item?.waiter?._id,
                          itemData?.item?.place_id,
                        ))
                    }
                    distance={itemData?.item?.distance?.meter}
                    services={itemData?.item.servers}
                    loading={restaurantLoading}
                    crossIcon={route.params.crossIcon}
                    place_id={itemData?.item?.place_id}
                    vicinity={itemData?.item?.vicinity}
                    our_rating={String(itemData?.item?.our_rating) || '0'}
                    restaurant_id={
                      itemData?.item._id || itemData?.item?.restaurant_id
                    }
                    geometry={
                      itemData?.item?.geometry?.location ||
                      itemData?.item?.location
                    }
                    refetchRestaurant={refetchRestaurant}
                    refetchAll={refetchAll}
                  />
                );
              }
            }}
          />
        )}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  txt1NoRest: {
    fontSize: 16,
    color: Colors.fontDark,
    textAlign: 'center',
    width: '55%',
    marginTop: 20,
  },
  txt2NoRest: {
    fontSize: 16,
    color: Colors.fontLight,
    width: '90%',
    alignSelf: 'center',
    marginTop: 15,
  },
  extra_line: {
    fontSize: 16,
    color: Colors.fontLight,
    width: '80%',
    marginTop: 15,
    textAlign: 'center',
  },
  viewEmptyList: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  txtHeading: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 0,
    width: '90%',
    alignSelf: 'center',
    color: '#1E272E',
  },
  textBold: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
    // marginHorizontal: 37,
    width: 200,
    alignSelf: 'center',
  },
  textLight: {
    fontFamily: 'ProximaNova',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
    paddingTop: 10,
    alignSelf: 'center',
    marginTop: -4,
  },
});
