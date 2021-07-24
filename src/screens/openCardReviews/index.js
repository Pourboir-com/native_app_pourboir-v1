import React, { useContext, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  Platform,
  Linking,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import RefferedWaiterModal from '../../components/modals/ConfirmModal';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import CommonModal from '../../components/modals/HelpUsImproveModal';
import StarCard from '../../components/star-card';
import { Colors } from '../../constants/Theme';
import RatingStar from '../../components/RatingComponent';
import GlobalHeader from '../../components/GlobalHeader';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation, useQuery } from 'react-query';
import { reactQueryConfig } from '../../constants';
import {
  GET_WAITERS,
  I_AM_WAITER,
  ADDING_WAITERS,
  GET_RESTAURANT_DETAILS,
  ADD_FAVORITE,
  GET_FAVORITES,
} from '../../queries';
import { ReviewsSkeleton } from '../../components/skeleton';
import { SvgHeaderUserIcon } from '../../components/svg/header_user_icon';
import Context from '../../contextApi/context';
const imgSitting = require('../../assets/images/sittingtable.png');
const waiter = require('../../assets/images/waiter2.png');
// import * as actionTypes from '../../contextApi/actionTypes';
import i18n from '../../li8n';
// import { filteredRestaurant, yourFilteredRestaurant } from '../../util';
import Spinner from 'react-native-loading-spinner-overlay';
// import { set } from 'react-native-reanimated';
import RBSheet from 'react-native-raw-bottom-sheet';

const ReviewDetails = ({ navigation, route }) => {
  const [added, setAdded] = useState(false);
  const refRBSheet = useRef();
  const openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${RestaurantDetails?.data?.international_phone_number}`;
    } else {
      number = `tel:${RestaurantDetails?.data?.international_phone_number}`;
    }
    Linking.openURL(number);
  };

  // Star arrayyyyyyyy
  const obj = [1, 2, 3, 4, 5];
  const [data, setData] = useState([]);
  const [userWaiterModalVisible, setUserWaiterModalVisible] = useState(false);
  const [RefferedWaiterModalVisible, setRefferedWaiterModalVisible] = useState(
    false,
  );
  const [userThanksModalVisible, setUserThanksModalVisible] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [refferedThanksModalVisible, setRefferedThanksModalVisible] = useState(
    false,
  );
  const { state, dispatch } = useContext(Context);
  const [IAMWAITER] = useMutation(I_AM_WAITER);
  const [AddWaiters] = useMutation(ADDING_WAITERS);
  const [AddFavorite] = useMutation(ADD_FAVORITE);
  const [Refferedloading, setRefferedLoading] = useState(false);
  const [Userloading, setUserLoading] = useState(false);

  const {
    img,
    name,
    rating,
    distance,
    services,
    place_id,
    vicinity,
    our_rating,
    restaurant_id,
    geometry,
  } = route?.params;

  const { isLoading: waitersLoading, isFetching: waitersIsFetching } = useQuery(
    ['GET_WAITERS', { restaurant_id: place_id, statuses: ['active'] }],
    GET_WAITERS,
    {
      ...reactQueryConfig,
      enabled: place_id,
      onSuccess: res => {
        setData(res.data);
      },
    },
  );

  const {
    data: RestaurantDetails,
    isLoading: RestaurantDetailsLoading,
  } = useQuery(
    ['GET_RESTAURANT_DETAILS', { _id: place_id }],
    GET_RESTAURANT_DETAILS,
    {
      ...reactQueryConfig,
    },
  );

  const {
    data: favoritesData,
    refetch: refetchFavorites,
    isLoading: favoritesLoading,
    isFetching: isFavoriteLoading,
  } = useQuery(
    ['GET_FAVORITES', { google_place_id: place_id }],
    GET_FAVORITES,
    {
      ...reactQueryConfig,
      enabled: place_id,
    },
  );

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 55);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
  });

  const handleRefferedModalClose = () => {
    setRefferedLoading(false);
    setRefferedWaiterModalVisible(false);
  };

  const handleRefferedModalOpen = () => {
    setRefferedWaiterModalVisible(true);
  };

  // const handleUserModalClose = () => {
  //   setUserLoading(false);
  //   setUserWaiterModalVisible(false);
  // };

  // const handleUserModalOpen = () => {
  //   const isUserAlreadyWaiter = data.find(
  //     item => item?.user_id?._id === state.userDetails.user_id,
  //   );
  //   if (isUserAlreadyWaiter) {
  //     alert(i18n.t('already_waiter'));
  //   } else {
  //     setUserWaiterModalVisible(true);
  //   }
  // };

  const handleAddWaiter = async (fullName, email) => {
    if (state.userDetails.user_id) {
      setRefferedLoading(true);
      let newWaiter = {
        created_by: state.userDetails.user_id,
        full_name: fullName,
        restaurant: {
          place_id: place_id,
          rating: rating,
          photos: [img],
          name: name,
          formatted_address: vicinity,
          our_rating: String(our_rating),
          location: geometry,
          international_phone_number:
            RestaurantDetails?.data?.international_phone_number,
        },
        email: email,
      };
      await AddWaiters(newWaiter, {
        onSuccess: () => {
          handleRefferedModalClose();
          setRefferedLoading(false);
          setRefferedThanksModalVisible(true);
        },
        onError: e => {
          handleRefferedModalClose();
          setRefferedLoading(false);
          alert(e);
        },
      });
    } else {
      handleRefferedModalClose();
      navigation.navigate('socialLogin', { confirmWaiter: true });
    }
  };

  const handleAddFavorite = async () => {
    if (state.userDetails.user_id) {
      setFavLoading(true);
      let newFavorite = {
        user_id: state.userDetails.user_id,
        restaurant: {
          place_id: place_id,
          rating: rating,
          photos: [img],
          name: name,
          formatted_address: vicinity,
          our_rating: String(our_rating),
          location: geometry,
          international_phone_number:
            RestaurantDetails?.data?.international_phone_number,
        },
      };
      await AddFavorite(newFavorite, {
        onSuccess: async () => {
          await refetchFavorites();
          setFavLoading(false);
        },
        onError: () => {
          setFavLoading(false);
        },
      });
    } else {
      navigation.navigate('socialLogin', { confirmWaiter: true });
    }
  };

  const checkFavorite = () =>
    (favoritesData?.data[0]?.user_id || []).find(
      item => item?._id === state?.userDetails?.user_id,
    );

  // const handleIAMWAITER = async () => {
  //   if (state.userDetails.user_id) {
  //     setUserLoading(true);
  //     let IWaiter = {
  //       user_id: state.userDetails.user_id,
  //       restaurant: {
  //         place_id: place_id,
  //         rating: rating,
  //         photos: [img],
  //         name: name,
  //         formatted_address: vicinity,
  //         our_rating: String(our_rating),
  //         location: geometry,
  //         international_phone_number:
  //           RestaurantDetails?.data?.international_phone_number,
  //       },
  //     };
  //     await IAMWAITER(IWaiter, {
  //       onSuccess: async res => {
  //         handleUserModalClose();
  //         setUserLoading(false);
  //         setUserThanksModalVisible(true);
  //       },
  //       onError: e => {
  //         setUserLoading(false);
  //         Alert.alert(
  //           'Error',
  //           e.response?.data?.message,
  //           [
  //             {
  //               text: 'Cancel',
  //               onPress: () => handleUserModalClose(),
  //               style: 'cancel',
  //             },
  //             { text: 'OK', onPress: () => handleUserModalClose() },
  //           ],
  //           { cancelable: false },
  //         );
  //       },
  //     });
  //   } else {
  //     handleUserModalClose();
  //     navigation.navigate('socialLogin', { confirmWaiter: true });
  //   }
  // };

  return (
    <View style={styles.container}>
      <Spinner
        visible={
          waitersIsFetching &&
          !Refferedloading &&
          !Userloading &&
          !waitersLoading
        }
      />
      <StatusBar translucent={true} style="light" />
      <GlobalHeader
        arrow={true}
        headingText={name}
        fontSize={17}
        color={'#fff'}
        bold={true}
        BackIconColor={'#fff'}
        backgroundColor={'transparent'}
        position="absolute"
        navigation={navigation}
      />
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          elevation: 0,
          zIndex: 9,
        }}
      >
        <View style={styles.viewImg}>
          <ImageBackground
            source={{ uri: img }}
            style={{ flex: 1, justifyContent: 'space-between' }}
          >
            <LinearGradient
              style={{
                zIndex: 101,
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
              colors={['black', 'transparent', 'black']}
            ></LinearGradient>
            <View style={[styles.viewBottom, { zIndex: 102 }]}>
              <View pointerEvents="none" style={{ flexDirection: 'row' }}>
                {obj.map((v, i) => {
                  return (
                    <TouchableOpacity style={{ marginRight: 3 }} key={i}>
                      <RatingStar
                        starSize={17}
                        type={
                          v <= rating
                            ? 'filled'
                            : v === rating + 0.5
                            ? 'half'
                            : 'empty'
                        }
                        notRatedStarColor="rgba(255,255,255, 0.6)"
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'ProximaNova',
                    fontSize: 16,
                  }}
                >
                  {Number(distance) > 2000
                    ? Number(distance) / 1000 + 'km'
                    : distance
                    ? distance + 'm'
                    : ''}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </Animated.View>
      <ScrollView
        onScroll={e => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View
          style={{ marginTop: 220, marginHorizontal: 24, marginBottom: 20 }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 29,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ marginLeft: '12%' }}
              onPress={() => refRBSheet.current.open()}
            >
              <Text
                style={{
                  fontFamily: 'ProximaNovaBold',
                  fontWeight: 'bold',
                  fontSize: 24,
                  textAlign: 'center',
                }}
              >
                {favoritesData?.data[0]?.user_id?.length || '0'}
              </Text>
              <Text tyle={{ fontFamily: 'ProximaNova', fontSize: 18 }}>
                {i18n.t('fav')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              disabled={favoritesLoading || isFavoriteLoading}
              style={{
                backgroundColor: checkFavorite() ? '#EAEAEA' : Colors.yellow,
                paddingVertical: 14,
                width: 156,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handleAddFavorite}
            >
              {favLoading ? (
                <ActivityIndicator size={23} color="#EBC11B" />
              ) : (
                <Text style={{ fontSize: 15, fontFamily: 'ProximaNova' }}>
                  {checkFavorite() ? i18n.t('added') : i18n.t('add_fav')}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={350}
            customStyles={{
              wrapper: {
                backgroundColor: 'rgba(52, 52, 52, 0.8)',
              },
              draggableIcon: {
                backgroundColor: '#000',
              },
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'ProximaNova',
                fontSize: 16,
              }}
            >
              {i18n.t('fav_list')}
            </Text>

            <View style={{ alignItems: 'center', marginVertical: 15 }}>
              {favoritesLoading || isFavoriteLoading ? (
                <View style={{ width: '90%', alignSelf: 'center' }}>
                  <ReviewsSkeleton />
                  <ReviewsSkeleton />
                </View>
              ) : (
                <FlatList
                  data={
                    favoritesLoading ? null : favoritesData?.data[0]?.user_id
                  }
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item._id}
                  renderItem={itemData => (
                    <StarCard
                      itemData={itemData}
                      state={state}
                      navigation={navigation}
                      place_id={place_id}
                      restaurant_id={restaurant_id}
                    />
                  )}
                />
              )}
            </View>
          </RBSheet>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate('MapScreen', {
                geometry,
                name,
              })
            }
            style={[
              styles.viewItem,
              {
                borderBottomColor: '#f9f9f9',
                borderBottomWidth: 1,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              },
            ]}
          >
            <View style={styles.viewIcon}>
              <Feather name="send" size={18} color={Colors.yellow} />
            </View>
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={{
                fontFamily: 'ProximaNova',
                color: Colors.fontDark,
                fontSize: 14,
                width: '70%',
                lineHeight: 17,
              }}
            >
              {vicinity || name}
            </Text>

            <View
              style={{
                flex: 1,
                flexDirection: 'row-reverse',
              }}
            >
              <View style={[styles.viewIcon2]}>
                <FontAwesome name="angle-right" size={26} color={'grey'} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              RestaurantDetails?.data?.international_phone_number &&
              openDialScreen()
            }
            style={[
              styles.viewItem,
              {
                marginBottom: 0,
                borderBottomRightRadius: 12,
                borderBottomLeftRadius: 12,
              },
            ]}
          >
            <View style={styles.viewIcon}>
              <Feather name="phone" size={18} color={Colors.yellow} />
            </View>
            <Text
              style={{
                fontFamily: 'ProximaNova',
                color: Colors.fontDark,
                fontSize: 14,
              }}
            >
              {RestaurantDetailsLoading
                ? i18n.t('please_wait')
                : RestaurantDetails?.data?.international_phone_number ||
                  i18n.t('none')}
            </Text>

            <View
              style={{
                flex: 1,
                flexDirection: 'row-reverse',
              }}
            >
              <View style={[styles.viewIcon2]}>
                <FontAwesome name="angle-right" size={26} color={'grey'} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            // marginTop: 220,
            marginHorizontal: 15,
            marginBottom: 10,
            alignItems: 'center',
          }}
        >
          <Text style={[styles.txtHeading, { fontFamily: 'ProximaNovaBold' }]}>
            {i18n.t('waiters')}
          </Text>
          <View style={styles.viewNumRaters}>
            <Text style={[styles.txtNumRaters, { fontFamily: 'ProximaNova' }]}>
              {data?.length || '0'}
            </Text>
          </View>
        </View>
        {!data.length && !waitersLoading && !waitersIsFetching && (
          <Text
            style={[
              styles.no_waiter_found,
              { fontFamily: 'ProximaNovaSemiBold' },
            ]}
          >
            {i18n.t('no_waiter_found')}
          </Text>
        )}
        {waitersLoading ? (
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <ReviewsSkeleton />
            <ReviewsSkeleton />
          </View>
        ) : (
          <FlatList
            data={waitersLoading ? null : data}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item._id}
            renderItem={itemData => (
              <StarCard
                itemData={itemData}
                state={state}
                navigation={navigation}
                place_id={place_id}
                restaurant_id={restaurant_id}
              />
            )}
          />
        )}
        <View style={styles.viewAddReview}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[styles.txtAddReview, { fontFamily: 'ProximaNovaBold' }]}
            >
              {i18n.t('add_your_server')}
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleRefferedModalOpen}
              style={styles.btnAdd}
            >
              <AntDesign name="plus" size={16} color={Colors.fontDark} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.5}
        disabled={RestaurantDetails?.data?.menu_url ? false : true}
        onPress={() => {
          if (RestaurantDetails?.data?.menu_url) {
            WebBrowser.openBrowserAsync(RestaurantDetails?.data?.menu_url);
          }
        }}
        style={[
          styles.viewLastBtn,
          { marginBottom: 10 },
          !RestaurantDetails?.data?.menu_url && { backgroundColor: '#f0f0f0' },
        ]}
      >
        <Text
          style={{
            fontFamily: 'ProximaNova',
            fontSize: 16,
            color: Colors.fontDark,
          }}
        >
          {i18n.t('see_the_menu')}
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleUserModalOpen}
        style={styles.viewLastBtn}
      >
        <Text
          style={{
            fontFamily: 'ProximaNova',
            fontSize: 16,
            color: Colors.fontDark,
          }}
        >
          {i18n.t('are_you_waiter')}
        </Text>
      </TouchableOpacity> */}

      {RefferedWaiterModalVisible && (
        <RefferedWaiterModal
          isVisible={RefferedWaiterModalVisible}
          handleModalClose={handleRefferedModalClose}
          loading={Refferedloading}
          postData={handleAddWaiter}
        />
      )}
      {refferedThanksModalVisible && (
        <CommonModal
          isVisible={refferedThanksModalVisible}
          handleModalClose={() => setRefferedThanksModalVisible(false)}
          image={imgSitting}
          onPress={() => setRefferedThanksModalVisible(false)}
          heading={i18n.t('thank_collaboration')}
          subHeadingText={i18n.t('waiter_our_database')}
          buttonText={i18n.t('close')}
        />
      )}
      {/* {userWaiterModalVisible && (
        <CommonModal
          isVisible={userWaiterModalVisible}
          handleModalClose={handleUserModalClose}
          loading={Userloading}
          onPress={handleIAMWAITER}
          image={waiter}
          buttonText={i18n.t('i_confirm')}
          subHeadingText={i18n.t('confrm_you_are_server')}
          restaurant={name}
        />
      )} */}
      {userThanksModalVisible && (
        <CommonModal
          isVisible={userThanksModalVisible}
          handleModalClose={() => setUserThanksModalVisible(false)}
          image={waiter}
          onPress={() => setUserThanksModalVisible(false)}
          subHeadingText={i18n.t('check_profile')}
          buttonText={i18n.t('Thank_you')}
        />
      )}
    </View>
  );
};
export default ReviewDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  btnAdd: {
    backgroundColor: Colors.yellow,
    padding: 4,
    borderRadius: 6,
    marginLeft: 10,
  },
  txtAddReview: {
    fontSize: 16,
    color: Colors.fontDark,
  },
  txtCantFind: {
    fontSize: 16,
    color: Colors.fontLight,
  },
  viewAddReview: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#DADADA',
  },
  viewLastBtn: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.yellow,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: Platform.OS === 'ios' ? 25 : 15,
    marginTop: 1,
  },
  txtNumRaters: {
    fontSize: 18,
  },
  viewNumRaters: {
    backgroundColor: Colors.yellow,
    marginLeft: 23,
    borderRadius: 9,
    paddingTop: 1,
    paddingLeft: 7,
    paddingRight: 8,
    width: 'auto',
    height: 25,
    paddingVertical: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtHeading: {
    alignSelf: 'center',
    fontSize: 24,
    lineHeight: 32,
  },
  viewHeader: {
    flexDirection: 'row',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  viewBottom: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
  txtName: {
    textAlign: 'center',
    marginLeft: -25,
    color: '#fff',
    fontSize: 20,
  },
  viewImg: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  no_waiter_found: {
    fontSize: 16,
    color: Colors.fontLight,
    width: '91.8%',
    alignSelf: 'center',
    marginTop: 7,
    marginBottom: 25,
  },
  viewIcon: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewIcon2: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBtnConatiner: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: -45,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  viewItem: {
    width: '100%',
    height: 55,
    backgroundColor: '#fff',
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
