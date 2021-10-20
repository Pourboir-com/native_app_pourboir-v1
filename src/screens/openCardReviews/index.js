import React, { useContext, useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Animated,
  Platform,
  Linking,
  Alert,
  Share,
} from 'react-native';
import * as actionTypes from '../../contextApi/actionTypes';
import StarCard from '../../components/star-card';
import RBSheet from 'react-native-raw-bottom-sheet';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import RefferedWaiterModal from '../../components/modals/ConfirmModal';
import CheckInModal from '../../components/modals/ThanksRatingModal';
import { Feather } from '@expo/vector-icons';
import CommonModal from '../../components/modals/HelpUsImproveModal';
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
  MANAGER_APPROVAL,
  GET_REVIEWS,
  ADD_FAVORITE,
  GET_FAVORITES,
  ADD_CHECKIN,
} from '../../queries';
import { ReviewsSkeleton } from '../../components/skeleton';
import { SvgHeaderUserIcon } from '../../components/svg/header_user_icon';
import Context from '../../contextApi/context';
const imgSitting = require('../../assets/images/sittingtable.png');
const waiter = require('../../assets/images/waiter2.png');
// import * as actionTypes from '../../contextApi/actionTypes
const noCheckIn = require('../../assets/images/no-checkin.png');
// import { filteredRestaurant, yourFilteredRestaurant } from '../../util';
import Spinner from 'react-native-loading-spinner-overlay';
import ManagerApprovalModal from '../../components/modals/manager-approval-modal';
import ReceivedModal from '../../components/modals/received-modal';
import TourModal from '../../components/modals/tour-modal';
// import LeaveReviewModal from '../../components/modals/leave-review-modal';
import { Review } from '../../components/open-card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAsyncStorageValues } from '../../constants';
import * as Localization from 'expo-localization';

const ReviewDetails = ({ navigation, route }) => {
  const { state, dispatch, localizationContext } = useContext(Context);

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
  const [checkInModal, setcheckInModal] = useState(false);
  const [checkInModalText, setcheckInModalText] = useState(
    localizationContext.t('not_near'),
  );

  const [notCheckInModal, setnotCheckInModal] = useState(false);
  const [refferedThanksModalVisible, setRefferedThanksModalVisible] = useState(
    false,
  );
  const [IAMWAITER] = useMutation(I_AM_WAITER);
  const [addCheckIn] = useMutation(ADD_CHECKIN);
  const [AddWaiters] = useMutation(ADDING_WAITERS);
  const [Refferedloading, setRefferedLoading] = useState(false);
  const [Userloading, setUserLoading] = useState(false);
  const [cellPhone, setCellPhone] = useState('');
  const [token, setToken] = useState(0);
  const [siretNumber, setSiretNumber] = useState(parseInt());
  const [termsChecked, setTermsChecked] = useState(false);
  const [approvalModal, setApprovalModal] = useState(false);
  const [receivedModal, setReceivedModal] = useState(false);
  const [tourModal, setTourModal] = useState(false);
  const [AddFavorite, { isLoading: favLoading }] = useMutation(ADD_FAVORITE);
  const [section, setSection] = useState(1);
  const [locale, setLocale] = useState(1);
  const [countryCode, setCountryCode] = useState('+33');

  useEffect(() => {
    (async () => {
      const { ExplanatoryScreen, language } = await getAsyncStorageValues();
      setLocale(language);
      if (!ExplanatoryScreen?.explanatory_screen) {
        setTimeout(() => {
          setTourModal(true);
        }, 2000);
        await AsyncStorage.setItem(
          '@ExplanatoryScreen',
          JSON.stringify({
            explanatory_screen: true,
          }),
        );
      }
    })();
  }, []);

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
    refetchRestaurant,
  } = route?.params || {};

  const refRBSheet = useRef();

  const {
    data: reviewData,
    isLoading: reviewDataLoading,
    refetch: reviewRefetch,
  } = useQuery(
    [
      'GET_REVIEWS',
      {
        google_place_id: place_id,
        user_id: state.userDetails.user_id,
        language: locale,
      },
    ],
    GET_REVIEWS,
    {
      ...reactQueryConfig,
      enabled: locale && place_id,
      onError: e => {
        alert(e?.response?.data?.message);
      },
    },
  );
  const {
    data: waitersData,
    isLoading: waitersLoading,
    refetch: refetchWaiters,
    isFetching: waitersIsFetching,
  } = useQuery(
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
    refetch: refetchRestaurantDetails,
    isFetching: RestaurantDetailsIsFetching,
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

  const handleUserModalClose = () => {
    setUserLoading(false);
    setUserWaiterModalVisible(false);
  };

  const handleUserModalOpen = () => {
    const isUserAlreadyWaiter = data.find(
      item => item?.user_id?._id === state.userDetails.user_id,
    );
    if (isUserAlreadyWaiter) {
      alert(localizationContext.t('already_waiter'));
    } else {
      setUserWaiterModalVisible(true);
    }
  };
  const restaurant = {
    place_id: place_id,
    rating: rating,
    photos: [img],
    name: name,
    formatted_address: vicinity || 'city',
    our_rating: String(our_rating),
    location: geometry,
    international_phone_number:
      RestaurantDetails?.data?.international_phone_number || '',
  };

  const handleAddWaiter = async (fullName, email) => {
    if (state.userDetails.user_id) {
      setRefferedLoading(true);
      let newWaiter = {
        created_by: state.userDetails.user_id,
        full_name: fullName,
        restaurant,
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
          alert(e.response?.data?.message);
        },
      });
    } else {
      handleRefferedModalClose();
      navigation.navigate('socialLogin', { confirmWaiter: true });
    }
  };

  const handleCheckIn = async () => {
    if (Number(distance) < 300) {
      await addCheckIn(
        {
          place: restaurant,
          user_id: state.userDetails.user_id,
        },
        {
          onSuccess: res => {
            setcheckInModal(true);
            setToken(res?.data?.token || 0);
          },
          onError: e => {
            setcheckInModalText(localizationContext.t('check_in_limit'));
            setnotCheckInModal(true);
          },
        },
      );
    } else {
      setnotCheckInModal(true);
    }
  };

  const handleIAMWAITER = async () => {
    if (state.userDetails.user_id) {
      setUserLoading(true);
      let IWaiter = {
        user_id: state.userDetails.user_id,
        restaurant,
      };
      await IAMWAITER(IWaiter, {
        onSuccess: async res => {
          handleUserModalClose();
          setUserLoading(false);
          setUserThanksModalVisible(true);
        },
        onError: e => {
          setUserLoading(false);
          Alert.alert(
            'Error',
            e.response?.data?.message,
            [
              {
                text: 'Cancel',
                onPress: () => handleUserModalClose(),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => handleUserModalClose() },
            ],
            { cancelable: false },
          );
        },
      });
    } else {
      handleUserModalClose();
      navigation.navigate('socialLogin', { confirmWaiter: true });
    }
  };
  const [managerApproval, { isLoading: managerApprovalLoading }] = useMutation(
    MANAGER_APPROVAL,
  );
  // console.log('rest ', RestaurantDetails.data._id)
  const submitApproval = async () => {
    await managerApproval(
      {
        user_id: state.userDetails.user_id,
        siret_number: siretNumber,
        cell_number: `${countryCode}${cellPhone}`,
        restaurant,
      },
      {
        onSuccess: async () => {
          setApprovalModal(false);
          setReceivedModal(true);
        },
        onError: e => {
          alert(e.response?.data?.message);
        },
      },
    );
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: name,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddFavorite = async () => {
    if (state.userDetails.user_id) {
      let newFavorite = {
        user_id: state.userDetails.user_id,
        restaurant,
      };
      await AddFavorite(newFavorite, {
        onSuccess: async () => {
          await refetchFavorites();
          await refetchRestaurant();
          dispatch({
            type: actionTypes.REFRESH_ANIMATION,
            payload: !state.refreshAnimation,
          });
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

  return (
    <View style={styles.container}>
      <Spinner
        visible={
          (waitersIsFetching &&
            !Refferedloading &&
            !Userloading &&
            !reviewDataLoading &&
            !waitersLoading) ||
          RestaurantDetailsIsFetching ||
          RestaurantDetailsLoading
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
        settingBtn={section === 1 && tourModal ? false : true}
        settingBtnFunc={() =>
          RestaurantDetails?.data?.manager?.user_id?._id ===
            state.userDetails.user_id &&
          RestaurantDetails?.data?.manager?.status === 'pending'
            ? alert('We are reviewing your application for manager position.')
            : RestaurantDetails?.data?.manager?.user_id?._id !=
                state.userDetails.user_id &&
              RestaurantDetails?.data?.manager?.status == 'active'
            ? alert('This restaurant already has a manager.')
            : RestaurantDetails?.data?.manager?.user_id?._id ===
                state.userDetails.user_id &&
              RestaurantDetails?.data?.manager?.status === 'active'
            ? navigation.navigate('Braserri', {
                restaurant_id: RestaurantDetails?.data?._id || '',
                img,
                name,
                place_id,
                refetchWaiters,
              })
            : setApprovalModal(true)
        }
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
            style={{ flex: 1, justifyContent: 'space-between', height: '100%' }}
          >
            <LinearGradient
              style={{
                // zIndex: 101,
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
              colors={['black', 'transparent', 'black']}
            ></LinearGradient>
            <View
              style={[
                styles.viewBottom,
                {
                  position: 'relative',
                  height: '100%',
                  justifyContent: 'space-between',
                },
              ]}
            >
              <View
                pointerEvents="none"
                style={{ flexDirection: 'row', zIndex: 99999 }}
              >
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
              {/* <View>
                <TouchableOpacity
                  onPress={onShare}
                  style={{ marginRight: 15 }}
                  activeOpacity={0.5}
                >
                  <FontAwesome name="share-square-o" size={24} color="white" />
                </TouchableOpacity>
              </View> */}
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
        style={{ marginTop: -55 }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={{ marginHorizontal: 24, marginTop: 75 }}>
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
                {localizationContext.t('fav')}
              </Text>
            </TouchableOpacity>
            {section != 2 && (
              <TouchableOpacity
                activeOpacity={0.6}
                disabled={favoritesLoading || isFavoriteLoading}
                style={{
                  backgroundColor: checkFavorite() ? '#E6E6E6' : Colors.yellow,
                  paddingVertical: Platform.OS === 'ios' ? 20 : 14,
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
                    {checkFavorite()
                      ? localizationContext.t('added')
                      : localizationContext.t('add_fav')}
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>
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
            {localizationContext.t('fav_list')}
          </Text>

          <View
            style={{ alignItems: 'center', marginTop: 15, marginBottom: 30 }}
          >
            {favoritesLoading || isFavoriteLoading ? (
              <View style={{ width: '90%', alignSelf: 'center' }}>
                <ReviewsSkeleton />
                <ReviewsSkeleton />
              </View>
            ) : (
              <FlatList
                data={favoritesLoading ? null : favoritesData?.data[0]?.user_id}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item._id}
                renderItem={itemData => (
                  <StarCard
                    itemData={itemData}
                    state={state}
                    navigation={navigation}
                    place_id={place_id}
                    restaurant_id={restaurant_id}
                    navigationDisable={true}
                  />
                )}
              />
            )}
          </View>
        </RBSheet>

        <View
          style={{
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent:
              tourModal && section == 3 ? 'space-between' : 'space-evenly',
            marginHorizontal: 8,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              navigation.navigate('MapScreen', {
                geometry,
                name,
              })
            }
            style={[styles.viewItem]}
          >
            <View style={styles.viewIcon}>
              <Feather name="send" size={26} color={Colors.yellow} />
            </View>
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={{
                fontFamily: 'ProximaNova',
                color: Colors.fontDark,
                fontSize: 12,
                width: '70%',
                lineHeight: 17,
                textAlign: 'center',
              }}
            >
              {/* {vicinity || name} */}
              {localizationContext.t('address')}
            </Text>
          </TouchableOpacity>
          {!tourModal || section !== 3 ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleCheckIn}
              style={[styles.viewItem, { zIndex: 9999999 }]}
            >
              <View style={styles.viewIcon}>
                <Feather name="check-square" size={26} color={Colors.yellow} />
              </View>
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={{
                  fontFamily: 'ProximaNova',
                  color: Colors.fontDark,
                  fontSize: 12,
                  width: '70%',
                  lineHeight: 17,
                  textAlign: 'center',
                }}
              >
                {/* {vicinity || name} */}
                {localizationContext.t('check_in')}
              </Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              RestaurantDetails?.data?.international_phone_number &&
              openDialScreen()
            }
            style={[
              styles.viewItem,
              {
                paddingVertical: 10,
              },
            ]}
          >
            <View style={styles.viewIcon}>
              <Feather name="phone" size={23} color={Colors.yellow} />
            </View>
            <Text
              style={{
                fontFamily: 'ProximaNova',
                color: Colors.fontDark,
                fontSize: 12,
                textAlign: 'center',
              }}
            >
              {/* {RestaurantDetailsLoading
                ? localizationContext.t('please_wait')
                : RestaurantDetails?.data?.international_phone_number ||
                  localizationContext.t('none')} */}
              {localizationContext.t('telephone')}
            </Text>

            {/* <View
              style={{
                flex: 1,
                flexDirection: 'row-reverse',
              }}
            >
              <View style={[styles.viewIcon2]}>
                <FontAwesome name="angle-right" size={26} color={'grey'} />
              </View>
            </View> */}
          </TouchableOpacity>
        </View>
        {!reviewDataLoading && (
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
            }}
          >
            <Review
              route={route}
              navigation={navigation}
              reviewData={reviewData}
              reviewRefetch={reviewRefetch}
              restaurant={restaurant}
              distance={distance}
              tourModal={tourModal}
              section={section}
              handleOpenModal={() => setnotCheckInModal(true)}
            />
          </View>
        )}
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
            {localizationContext.t('waiters')}
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
            {localizationContext.t('no_waiter_found')}
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
              <TouchableOpacity
                activeOpacity={0.5}
                key={itemData?.item?._id}
                onPress={() => {
                  if (
                    state.userDetails.user_id !== itemData.item?.user_id?._id
                  ) {
                    navigation.navigate('RateYourService', {
                      name:
                        itemData?.item?.user_id?.full_name ||
                        itemData?.item.full_name ||
                        'name missing',
                      image:
                        itemData?.item?.user_id &&
                        itemData?.item?.user_id?.picture,
                      restaurant_id: place_id,
                      waiter_id: itemData?.item?._id,
                      place_id: restaurant_id,
                    });
                  } else {
                    alert(localizationContext.t('cannot_vote'));
                  }
                }}
                style={styles.viewItemConatier}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {itemData?.item?.user_id ? (
                    <Image
                      style={{ width: 55, height: 55, borderRadius: 30 }}
                      source={{ uri: itemData?.item?.user_id.picture }}
                    />
                  ) : (
                    <SvgHeaderUserIcon height={45} width={45} />
                  )}

                  <View style={{ marginLeft: 10 }}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={styles.txtItemName}
                    >
                      {itemData?.item?.user_id?.full_name ||
                        itemData?.item?.full_name ||
                        'name missing'}
                    </Text>
                    <View
                      pointerEvents="none"
                      style={{ flexDirection: 'row', marginTop: 7 }}
                    >
                      {obj.map((v, i) => {
                        return (
                          <TouchableOpacity style={{ marginRight: 3 }} key={i}>
                            <RatingStar
                              starSize={16}
                              type={
                                v <= itemData.item.rating
                                  ? 'filled'
                                  : v === itemData.item.rating + 0.5
                                  ? 'half'
                                  : 'empty'
                              }
                              notRatedStarColor="rgba(0,0,0,0.1)"
                            />
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={28} color="grey" />
              </TouchableOpacity>
            )}
          />
        )}
        <View style={styles.viewAddReview}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[styles.txtAddReview, { fontFamily: 'ProximaNovaBold' }]}
            >
              {localizationContext.t('add_your_server')}
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
        disabled={Number(RestaurantDetails?.data?.menuCount) > 0 ? false : true}
        // onPress={() => {
        //   if (RestaurantDetails?.data?.menu_url) {
        //     WebBrowser.openBrowserAsync(RestaurantDetails?.data?.menu_url);
        //   }
        // }}
        onPress={() =>
          navigation.navigate('MenuScreen', {
            restaurant_id: RestaurantDetails?.data?._id || '',
            name,
          })
        }
        style={[
          styles.viewLastBtn,
          { marginBottom: 10 },
          Number(RestaurantDetails?.data?.menuCount) > 0 && section != 5
            ? { backgroundColor: Colors.yellow }
            : section == 5
            ? { backgroundColor: 'transparent' }
            : { backgroundColor: '#f0f0f0' },
        ]}
      >
        {section != 5 && (
          <Text
            style={{
              fontFamily: 'ProximaNova',
              fontSize: 16,
              color: Colors.fontDark,
            }}
          >
            {localizationContext.t('see_the_menu')}
          </Text>
        )}
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
          {localizationContext.t('are_you_waiter')}
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
          heading={localizationContext.t('thank_collaboration')}
          subHeadingText={localizationContext.t('waiter_our_database')}
          buttonText={localizationContext.t('close')}
        />
      )}
      {userWaiterModalVisible && (
        <CommonModal
          isVisible={userWaiterModalVisible}
          handleModalClose={handleUserModalClose}
          loading={Userloading}
          onPress={handleIAMWAITER}
          image={waiter}
          buttonText={localizationContext.t('i_confirm')}
          subHeadingText={localizationContext.t('confrm_you_are_server')}
          restaurant={name}
        />
      )}
      {userThanksModalVisible && (
        <CommonModal
          isVisible={userThanksModalVisible}
          handleModalClose={() => setUserThanksModalVisible(false)}
          image={waiter}
          onPress={() => setUserThanksModalVisible(false)}
          subHeadingText={localizationContext.t('check_profile')}
          buttonText={localizationContext.t('Thank_you')}
        />
      )}
      {notCheckInModal && (
        <CommonModal
          isVisible={notCheckInModal}
          handleModalClose={() => setnotCheckInModal(false)}
          image={noCheckIn}
          heading={localizationContext.t('sorry')}
          subHeadingText={checkInModalText}
        />
      )}
      {checkInModal && (
        <CheckInModal
          isVisible={checkInModal}
          handleModalClose={() => setcheckInModal(false)}
          LotteryNumber={token}
          heading={'thank_here'}
          subText={'confirm_here'}
        />
      )}
      {approvalModal && (
        <ManagerApprovalModal
          siretNumber={siretNumber}
          setSiretNumber={setSiretNumber}
          cellPhone={cellPhone}
          setCellPhone={setCellPhone}
          termsChecked={termsChecked}
          setTermsChecked={setTermsChecked}
          approvalModal={approvalModal}
          setApprovalModal={setApprovalModal}
          receivedModal={receivedModal}
          setReceivedModal={setReceivedModal}
          submitApproval={submitApproval}
          loading={managerApprovalLoading}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
        />
      )}
      {receivedModal && (
        <ReceivedModal
          receivedModal={receivedModal}
          setReceivedModal={setReceivedModal}
          refetchRestaurantDetails={refetchRestaurantDetails}
        />
      )}
      {tourModal && (
        <TourModal
          tourModal={tourModal}
          setTourModal={setTourModal}
          section={section}
          setSection={setSection}
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
  txtItemName: {
    fontFamily: 'ProximaNova',
    fontSize: 17,
    letterSpacing: 0,
    lineHeight: 24,
    width: 180,
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
    // top: 125,
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    bottom: 10,
    position: 'absolute',
    width: '100%',
    zIndex: 999999,
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
    position: 'relative',
    // top: 0,
    // left: 0,
    // right: 0,
  },
  viewItemConatier: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    height: 80,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
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
    width: '100%',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: -45,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    // flexDirection:'row'
  },
  viewItem: {
    width: 100,
    height: 55,
    backgroundColor: '#fff',
    marginBottom: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 9,
    justifyContent: 'center',
  },
});
