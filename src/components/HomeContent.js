import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import { Colors } from '../constants/Theme';
import HomeCard from './HomeCard';
import i18n from '../li8n';
import {
  distributeInArray,
  restaurantDistance,
  filteredMinusRestaurant,
} from '../util';
import { HomeCardSkeleton } from '../components/skeleton';
import NoListImg from '../assets/images/emptyRestaurantList.png';
import { DELETE_RES } from '../queries';
import { useMutation } from 'react-query';
import Context from '../contextApi/context';
import * as actionTypes from '../contextApi/actionTypes';
import Spinner from 'react-native-loading-spinner-overlay';

export default function HomeScreenContent({
  restaurantLoading,
  refetchRestaurant,
  resIsFetching,
  searchVal,
  Data,
  // isFetch,
  // handleLoadMore,
  saveLocation,
  route,
}) {
  // const data = [...Data];
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [deleteLoading, setdeleteLoading] = useState(false);
  const { state, dispatch } = useContext(Context);
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

  const dummyArray = [1, 2, 3];

  const DeleteRestaurant = async (waiter_id, place_id) => {
    if (state.userDetails.user_id) {
      setdeleteLoading(true);
      let userInfo = {
        id: waiter_id,
        user_id: state.userDetails.user_id,
      };

      await deleteRestaurant(userInfo, {
        onSuccess: () => {
          let Restaurants = [...data];
          Restaurants = Restaurants.filter(
            item => item?.waiter?._id !== waiter_id,
          );
          updateRestaurants(state, place_id);
          dispatch({
            type: actionTypes.YOUR_RESTAURANTS,
            payload: Restaurants,
          });
          setdeleteLoading(false);
        },
        onError: () => {
          setdeleteLoading(false);
        },
      });
    }
  };

  if (!data.length && !restaurantLoading && !resIsFetching && saveLocation) {
    return (
      <>
        <View style={styles.viewEmptyList}>
          <View
            style={{
              backgroundColor: '#fff',
              width: 160,
              height: 160,
              borderRadius: 100,
            }}
          >
            <Image
              source={NoListImg}
              style={{
                width: 260,
                height: 220,
                marginTop: -55,
                marginLeft: -50,
              }}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.txt1NoRest, { fontFamily: 'ProximaNovaBold' }]}>
            {i18n.t('you_have_no_restaurant')}
          </Text>
          <Text style={[styles.txt2NoRest, { fontFamily: 'ProximaNova' }]}>
            {i18n.t('search_for_rest_and_add')}
          </Text>
        </View>
        {/* )} */}
      </>
    );
  }
  return (
    <>
      {restaurantLoading ? (
        <View
          style={{ backgroundColor: '#F9F9F9'}}
        >
          {!route.params.crossIcon && (
            <Text
              style={[styles.txtHeading, { fontFamily: 'ProximaNovaBold' }]}
            >
              {searchVal ? i18n.t('result_distance') : i18n.t('around_you')}
            </Text>
          )}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 17,
            }}
          >
            <FlatList
              data={dummyArray}
              showsVerticalScrollIndicator={false}
              alwaysBounceHorizontal={false}
              scrollEnabled={false}
              alwaysBounceVertical={false}
              bounces={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={() => <HomeCardSkeleton />}
            />
            <FlatList
              data={dummyArray}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 15 }}
              alwaysBounceHorizontal={false}
              scrollEnabled={false}
              alwaysBounceVertical={false}
              bounces={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={() => <HomeCardSkeleton />}
            />
          </View>
        </View>
      ) : (
        <ScrollView
          // bounces={true}
          //   alwaysBounceVertical={true}
          showsVerticalScrollIndicator={false}
          alwaysBounceHorizontal={false}
          refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={resIsFetching}
              onRefresh={refetchRestaurant}
            />
          }
          alwaysBounceVertical={false}
          bounces={false}
          keyboardShouldPersistTaps={'handled'}
          style={{ backgroundColor: '#F9F9F9' }}
        >
          <Spinner visible={deleteLoading} />
          {!route.params.crossIcon && (
            <Text
              style={[styles.txtHeading, { fontFamily: 'ProximaNovaBold' }]}
            >
              {searchVal ? i18n.t('result_distance') : i18n.t('around_you')}
            </Text>
          )}
          <View
            style={{
              marginTop: 17,
            }}
          >
            <FlatList
              data={
                restaurantLoading ? dummyArray : distributeInArray(data).all
              }
              showsVerticalScrollIndicator={false}
              // onEndReached={handleLoadMore}
              // onEndReachedThreshold={0.5}
              alwaysBounceHorizontal={false}
              keyboardShouldPersistTaps={'handled'}
              alwaysBounceVertical={false}
              key={'_'}
              numColumns={2}
              bounces={false}
              keyExtractor={(item, index) => index}
              renderItem={itemData => {
                if (Object.keys(itemData.item).length) {
                  return (
                    <View
                      style={{ marginTop: itemData.index % 2 !== 0 ? 12 : 0 }}
                    >
                      <HomeCard
                        navigation={navigation}
                        key={itemData?.item?.place_id}
                        img={
                          itemData?.item?.photos[0]
                            ? itemData?.item?.photos[0]
                            : ''
                        }
                        rating={itemData?.item.rating}
                        name={itemData?.item.name}
                        DeleteRestaurant={
                          (data,
                          i =>
                            DeleteRestaurant(
                              itemData?.item?.waiter?._id,
                              itemData?.item?.place_id,
                            ))
                        }
                        distance={restaurantDistance(itemData)}
                        services={itemData?.item.servers}
                        loading={restaurantLoading}
                        crossIcon={route.params.crossIcon}
                        place_id={itemData?.item.place_id}
                        vicinity={itemData?.item.vicinity}
                      />
                    </View>
                  );
                }
              }}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  txt1NoRest: {
    fontSize: 16,
    color: Colors.fontDark,
    textAlign: 'center',
    maxWidth: 190,
    marginTop: 20,
  },
  txt2NoRest: {
    fontSize: 16,
    color: Colors.fontLight,
    textAlign: 'center',
    maxWidth: 320,
    marginTop: 15,
  },
  viewEmptyList: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtHeading: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 0,
    width: '90%',
    alignSelf: 'center',
    color: '#1E272E',
  },
});
