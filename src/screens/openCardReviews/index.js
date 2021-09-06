import React, { useContext, useState } from 'react';
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
} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import RefferedWaiterModal from '../../components/modals/ConfirmModal';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
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
import ManagerApprovalModal from '../../components/modals/manager-approval-modal';
import ReceivedModal from '../../components/modals/received-modal';
import LeaveReviewModal from '../../components/modals/leave-review-modal';
import { Review } from '../../components/open-card';
// import { set } from 'react-native-reanimated';

const ReviewDetails = ({ navigation, route }) => {
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
  const [refferedThanksModalVisible, setRefferedThanksModalVisible] = useState(
    false,
  );
  const { state, dispatch } = useContext(Context);
  const [IAMWAITER] = useMutation(I_AM_WAITER);
  const [AddWaiters] = useMutation(ADDING_WAITERS);
  const [Refferedloading, setRefferedLoading] = useState(false);
  const [Userloading, setUserLoading] = useState(false);
  const [cellPhone, setCellPhone] = useState('');
  const [siretNumber, setSiretNumber] = useState(parseInt());
  const [termsChecked, setTermsChecked] = useState(false);
  const [approvalModal, setApprovalModal] = useState(false);
  const [receivedModal, setReceivedModal] = useState(false);

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
  } = route?.params || {};
  const {
    data: reviewData,
    isLoading: reviewDataLoading,
    refetch: reviewRefetch,
  } = useQuery(['GET_REVIEWS', { google_place_id: place_id }], GET_REVIEWS, {
    ...reactQueryConfig,

    onError: e => {
      alert(e?.response?.data?.message);
    },
  });
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
      alert(i18n.t('already_waiter'));
    } else {
      setUserWaiterModalVisible(true);
    }
  };
  const restaurant = {
    place_id: place_id,
    rating: rating,
    photos: [img],
    name: name,
    formatted_address: vicinity,
    our_rating: String(our_rating),
    location: geometry,
    international_phone_number:
      RestaurantDetails?.data?.international_phone_number,
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
          alert(e);
        },
      });
    } else {
      handleRefferedModalClose();
      navigation.navigate('socialLogin', { confirmWaiter: true });
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
  const [managerApproval, { isLoading: publishMenuLoading }] = useMutation(
    MANAGER_APPROVAL,
  );

  const submitApproval = async () => {
    await managerApproval(
      {
        user_id: state.userDetails.user_id,
        siret_number: siretNumber,
        cell_number: cellPhone,
        restaurant,
      },
      {
        onSuccess: () => {
          setApprovalModal(false);
          setReceivedModal(true);
          // navigation.navigate('Braserri', {
          //   restaurant_id: restaurant_id || '',
          //   img,
          //   name,
          // });
        },
        onError: e => {
          alert(e.response?.data?.message);
          // navigation.navigate('Braserri', {
          //   restaurant_id: restaurant_id || '',
          //   img,
          //   name,
          // });
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <Spinner
        visible={
          waitersIsFetching &&
          !Refferedloading &&
          !Userloading &&
          !reviewDataLoading &&
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
        settingBtn={true}
        settingBtnFunc={() =>
          RestaurantDetails?.data?.manager?.user_id ===
            state.userDetails.user_id &&
          RestaurantDetails?.data?.manager?.status === 'pending'
            ? alert('We are reviewing your application for manager position.')
            : RestaurantDetails?.data?.manager?.user_id !=
                state.userDetails.user_id &&
              RestaurantDetails?.data?.manager?.status === 'active'
            ? alert('This restaurant already has a manager.')
            : RestaurantDetails?.data?.manager?.user_id ===
                state.userDetails.user_id &&
              RestaurantDetails?.data?.manager?.status === 'active'
            ? navigation.navigate('Braserri', {
                restaurant_id: RestaurantDetails?.data?._id || '',
                img,
                name,
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
                <TouchableOpacity
                  style={{ marginRight: 15, zIndex: 99999 }}
                  activeOpacity={0.6}
                >
                  <FontAwesome name="share-square-o" size={24} color="white" />
                </TouchableOpacity>
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
          style={{
            marginTop: 220,
            width: '95%',
            alignSelf: 'center',
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
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
                fontSize: 14,
                width: '70%',
                lineHeight: 17,
                textAlign: 'center',
              }}
            >
              {/* {vicinity || name} */}
              Address
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            // onPress={() =>
            //   navigation.navigate('MapScreen', {
            //     geometry,
            //     name,
            //   })
            // }
            style={[styles.viewItem]}
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
                fontSize: 14,
                width: '70%',
                lineHeight: 17,
                textAlign: 'center',
              }}
            >
              {/* {vicinity || name} */}
              Check-in
            </Text>
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
                fontSize: 14,
                textAlign: 'center',
              }}
            >
              {/* {RestaurantDetailsLoading
                ? i18n.t('please_wait')
                : RestaurantDetails?.data?.international_phone_number ||
                  i18n.t('none')} */}
              Telephone
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
              // marginTop: 220,
              marginHorizontal: 15,
              marginBottom: 10,
              alignItems: 'center',
            }}
          >
            <Review
              route={route}
              navigation={navigation}
              reviewData={reviewData}
              reviewRefetch={reviewRefetch}
              restaurant={restaurant}
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
                    alert(i18n.t('cannot_vote'));
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

      <TouchableOpacity
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
      </TouchableOpacity>

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
      {userWaiterModalVisible && (
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
      )}
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
      />
      <ReceivedModal
        receivedModal={receivedModal}
        setReceivedModal={setReceivedModal}
      />
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
    width: 110,
    marginHorizontal: 10,
    height: 55,
    backgroundColor: '#fff',
    marginBottom: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
