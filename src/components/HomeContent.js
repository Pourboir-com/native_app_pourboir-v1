import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import { GET_RESTAURANT } from '../queries';

import { placesList as LIST } from '../dummyData/DummyData';
import { Colors } from '../constants/Theme';
import HomeCard from './HomeCard';
import { useQuery, useMutation } from 'react-query';
import { reactQueryConfig } from '../constants';
import i18n from '../li8n';
import { isLoading } from 'expo-font';
import { distributeInArray } from '../util';
import { getAsyncStorageValues } from '../constants';
export default function HomeScreenContent({
  searchIconPress,
  setSearchIconPress,
  route,
}) {
  const navigation = useNavigation();
  const NoListImg = require('../assets/images/emptyRestaurantList.png');
  const [saveLocation, setSaveLocation] = useState('');
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
  } = useQuery(['GET_RESTAURANT', { location: saveLocation }], GET_RESTAURANT, {
    ...reactQueryConfig,
    enabled: saveLocation,
    onSuccess: res => {
      setData(res?.restaurants?.results || []);
      console.log(res.restaurants.results)
    },
  });

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const dummyArray = [1, 2, 3];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  const onDeleteCard = (index, even) => {
    let indexToRemove = even ? index * 2 : index * 2 + 1;
    let tempArr = data;
    tempArr.splice(indexToRemove, 1);

    setData([...tempArr]);
  };

  if (!data.length && !restaurantLoading && !resIsFetching) {
    return (
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
    );
  }

  return (
    <>
      <ScrollView
        // bounces={true}
        //   alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        style={{ backgroundColor: '#f9f9f9' }}
      >
        {loading
          ? null
          : !route.params.crossIcon && (
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
            data={
              restaurantLoading
                ? dummyArray
                : distributeInArray(data).firstArray
            }
            showsVerticalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            bounces={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={itemData => (
              <HomeCard
                navigation={navigation}
                // id={itemData.item.id}
                img={restaurantLoading ? null : itemData.item.photos[0]}
                rating={restaurantLoading ? null : itemData.item.rating}
                name={restaurantLoading ? null : itemData.item.name}
                distance={restaurantLoading ? null : '300m'}
                services={restaurantLoading ? null : itemData.item.servers}
                loading={restaurantLoading}
                crossIcon={route.params.crossIcon}
                place_id={restaurantLoading ? null : itemData.item.place_id}
                deleteCall={() => onDeleteCard(itemData.index, true)}
              />
            )}
          />
          <FlatList
            data={
              restaurantLoading
                ? dummyArray
                : distributeInArray(data).secondArray
            }
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 15 }}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            bounces={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={itemData => (
              <HomeCard
                navigation={navigation}
                // key={item._id}
                img={restaurantLoading ? null : itemData.item.photos[0]}
                rating={restaurantLoading ? null : itemData.item.rating}
                name={restaurantLoading ? null : itemData.item.name}
                distance={restaurantLoading ? null : '300m'}
                services={restaurantLoading ? null : itemData.item.servers}
                loading={restaurantLoading}
                crossIcon={route.params.crossIcon}
                place_id={restaurantLoading ? null : itemData.item.place_id}
                deleteCall={() => onDeleteCard(itemData.index, false)}
              />
            )}
          />
        </View>
      </ScrollView>
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
