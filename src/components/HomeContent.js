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

export default function HomeScreenContent({
  restaurantLoading,
  refetchRestaurant,
  resIsFetching,
  Data,
  // isFetch,
  // handleLoadMore,
  saveLocation,
  route,
}) {
  // const data = [...Data];
  const [data, setData] = useState([]);
  const navigation = useNavigation();
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
      let userInfo = {
        id: waiter_id,
        user_id: state.userDetails.user_id,
      };
      let Restaurants = [...data];
      Restaurants = Restaurants.filter(item => item?.waiter?._id !== waiter_id);
      updateRestaurants(state, place_id);
      dispatch({
        type: actionTypes.YOUR_RESTAURANTS,
        payload: Restaurants,
      });
      await deleteRestaurant(userInfo);
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
          // bounces={true}
          //   alwaysBounceVertical={true}
          showsVerticalScrollIndicator={false}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          style={{ backgroundColor: '#F9F9F9', flex: 1 }}
        >
          {!route.params.crossIcon && (
            <Text
              style={[styles.txtHeading, { fontFamily: 'ProximaNovaBold' }]}
            >
              {i18n.t('around_you')}
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
          {!route.params.crossIcon && (
            <Text
              style={[styles.txtHeading, { fontFamily: 'ProximaNovaBold' }]}
            >
              {i18n.t('around_you')}
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
                        img={itemData?.item?.photos[0]}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputSearch: {
    height: 45,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 0,
    flex: 1,
  },
  viewHeader2: {
    width: '100%',
    height: 110,
    backgroundColor: Colors.yellow,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  viewInputSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '90%',
    marginTop: 45,
    alignSelf: 'center',
    borderRadius: 7,
    overflow: 'hidden',
  },
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
  btnCross: {
    backgroundColor: '#fff',
    position: 'absolute',
    alignSelf: 'flex-end',
    borderRadius: 20,
    margin: -1,
    right: 0,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view2Card: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txt2Card: {
    color: '#EDEFEE',
    fontSize: 13,
  },
  imgCard: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  viewItemConatier: {
    width: Dimensions.get('window').width * 0.45,
    height: Dimensions.get('window').width * 0.56,
    margin: Dimensions.get('window').width * 0.02,
    backgroundColor: 'red',
    borderRadius: 12,
    overflow: 'hidden',
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
