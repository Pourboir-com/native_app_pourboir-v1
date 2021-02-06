import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  RefreshControl,
  Animated,
} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import ConfirmationModal from '../../components/modals/ConfirmModal';
import HelpUsImproveModal from '../../components/modals/HelpUsImproveModal';
import { Colors } from '../../constants/Theme';
import RatingStar from '../../components/RatingComponent';
import GlobalHeader from '../../components/GlobalHeader';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useMutation, useQuery } from 'react-query';
import { reactQueryConfig } from '../../constants';
import { GET_WAITERS, I_AM_WAITER } from '../../queries';
import { ReviewsSkeleton } from '../../components/skeleton';
import { SvgHeaderUserIcon } from '../../components/svg/header_user_icon';
import Context from '../../contextApi/context';
import * as actionTypes from '../../contextApi/actionTypes';
import i18n from '../../li8n';
import { filteredRestaurant, yourfilteredRestaurant } from '../../util';

const ReviewDetails = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const [confirmModalVisible, setconfirmModalVisible] = useState(false);
  const [helpUsModalVisible, sethelpUsModalVisible] = useState(false);
  const [starSelect, setstarSelect] = useState();
  const { state, dispatch } = useContext(Context);
  const [IAMWAITER] = useMutation(I_AM_WAITER);
  const [loading, setLoading] = useState(false);

  const {
    img,
    name,
    rating,
    distance,
    services,
    place_id,
    vicinity,
  } = route?.params;

  const updateRestaurants = (state, placeId) => {
    let FilteredRestaurant = filteredRestaurant(state, placeId);
    // let YourFilteredRestaurant = yourfilteredRestaurant(state, placeId);
    dispatch({
      type: actionTypes.RESTAURANTS_DETAILS,
      payload: FilteredRestaurant,
    });
    // dispatch({
    //   type: actionTypes.YOUR_RESTAURANTS,
    //   payload: YourFilteredRestaurant,
    // });
  };

  const {
    data: waitersData,
    isLoading: waitersLoading,
    refetch: refetchWaiters,
    isFetching: waitersIsFetching,
  } = useQuery(['GET_WAITERS', { restaurant_id: place_id }], GET_WAITERS, {
    ...reactQueryConfig,
    enabled: place_id,
    onSuccess: res => {
      setData(res.data);
    },
  });

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 55);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
  });

  const handleModalClose = () => {
    setconfirmModalVisible(false);
    sethelpUsModalVisible(false);
  };

  const handleConfirmModalOpen = () => {
    const isUserAlreadyWaiter = data.find(
      item => item?.user_id?._id === state.userDetails.user_id,
    );
    if (isUserAlreadyWaiter) {
      alert('You are already waiter in this restaurant.');
    } else {
      setconfirmModalVisible(true);
    }
  };

  const handleHelpUsModalOpen = () => {
    //   alert('working')
    sethelpUsModalVisible(true);
  };

  // Star arrayyyyyyyy
  const obj = [1, 2, 3, 4, 5];

  const handleIAMWAITER = async () => {
    if (state.userDetails.user_id) {
      setLoading(true);
      updateRestaurants(state, place_id);
      let IWaiter = {
        user_id: state.userDetails.user_id,
        restaurant: {
          place_id: place_id,
          rating: rating,
          photos: [img],
          name: name,
          vicinity: vicinity,
        },
      };
      await IAMWAITER(IWaiter, {
        onSuccess: async res => {
          dispatch({
            type: actionTypes.YOUR_RESTAURANTS,
            payload: [
              ...state.yourRestaurants,
              { ...res.data.data, distance, servers: services },
            ],
          });
          await refetchWaiters();
          handleModalClose();
          setLoading(false);
        },
        onError: () => {
          handleModalClose();
          setLoading(false);
          alert('You are already waiter in this restaurant.');
        },
      });
    } else {
      handleModalClose();
      navigation.navigate('socialLogin', { confirmWaiter: true });
    }
  };
  return (
    <View style={styles.container}>
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
              <View style={{ alignItems: 'flex-end' }}>
                <Text
                  style={{
                    color: '#fff',
                    marginBottom: 10,
                    fontFamily: 'ProximaNova',
                    fontSize: 16,
                  }}
                >
                  {distance}m
                </Text>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 7,
                  }}
                >
                  <Text style={{ color: '#fff' }}>
                    {i18n.t('see_the_menu')}
                  </Text>
                </TouchableOpacity>
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
      >
        <View
          style={{
            flexDirection: 'row',
            marginTop: 220,
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
              {data.length}
            </Text>

            {/* <Text style={[styles.txtNumRaters, { fontFamily: 'ProximaNova' }]}>{services.length * 2}</Text> */}
          </View>
        </View>
        {waitersLoading ? (
          <>
            <ReviewsSkeleton />
            <ReviewsSkeleton />
          </>
        ) : (
          <FlatList
            data={waitersLoading ? null : data}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item._id}
            renderItem={itemData => (
              <TouchableOpacity
                key={itemData?.item?._id}
                onPress={() =>
                  navigation.navigate('RateYourService', {
                    name: itemData?.item?.user_id
                      ? itemData?.item?.user_id?.full_name
                      : itemData?.item.full_name,
                    image: itemData?.item?.user_id
                      ? itemData?.item?.user_id?.picture
                      : itemData?.item?.imgAvatar,
                    restaurant_id: place_id,
                    waiter_id: itemData?.item?._id,
                    refetchWaiters: refetchWaiters,
                  })
                }
                style={styles.viewItemConatier}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {itemData?.item?.user_id ? (
                    <Image
                      style={{ width: 45, height: 45, borderRadius: 30 }}
                      source={{ uri: itemData?.item?.user_id.picture }}
                    />
                  ) : itemData?.item?.imgAvatar ? (
                    <Image
                      style={{ width: 45, height: 45, borderRadius: 30 }}
                      source={{ uri: itemData?.item?.imgAvatar }}
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
                      {itemData?.item?.user_id
                        ? itemData?.item?.user_id?.full_name
                        : itemData?.item.full_name}
                    </Text>
                    <View
                      pointerEvents="none"
                      style={{ flexDirection: 'row', marginTop: 8 }}
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
          <Text style={[styles.txtCantFind, { fontFamily: 'ProximaNova' }]}>
            {i18n.t('cant_find_your_server')}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[styles.txtAddReview, { fontFamily: 'ProximaNovaBold' }]}
            >
              {i18n.t('add_your_server')}
            </Text>
            <TouchableOpacity
              onPress={handleHelpUsModalOpen}
              style={styles.btnAdd}
            >
              <AntDesign name="plus" size={16} color={Colors.fontDark} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={handleConfirmModalOpen}
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

      <ConfirmationModal
        isVisible={confirmModalVisible}
        handleModalClose={handleModalClose}
        refetchWaiters={refetchWaiters}
        place_id={place_id}
        navigation={navigation}
        name={name}
        loading={loading}
        handleIAMWAITER={handleIAMWAITER}
      />
      {/* <KeyboardAvoidingView>
        <ScrollView> */}
      {helpUsModalVisible && (
        <HelpUsImproveModal
          place_id={place_id}
          refetchWaiters={refetchWaiters}
          isVisible={helpUsModalVisible}
          handleModalClose={handleModalClose}
          navigation={navigation}
        />
      )}
      {/* </ScrollView>
        </KeyboardAvoidingView> */}
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
    fontSize: 18,
    color: Colors.fontLight,
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
    backgroundColor: 'transparent',
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
    marginBottom: 15,
    marginTop: 1,
  },
  txtNumRaters: {
    // backgroundColor: Colors.yellow, paddingVertical: 3, paddingHorizontal: 9,
    // marginLeft: 10,
    fontSize: 18,
    //  borderRadius: 15
  },
  viewNumRaters: {
    backgroundColor: Colors.yellow,
    marginLeft: 23,
    borderRadius: 9,
    // paddingHorizontal:8,
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
    alignItems: 'center',
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
});
