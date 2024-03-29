import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import GlobalHeader from '../../components/GlobalHeader';
import { Colors } from '../../constants/Theme';
import ThankRatingModal from '../../components/modals/ThanksRatingModal';
import RatingStar from '../../components/RatingComponent';
import Context from '../../contextApi/context';
import { ADD_RATINGS } from '../../queries';
import { useMutation } from 'react-query';
const imgBg = require('../../assets/images/Group5.png');
import { getAsyncStorageValues } from '../../constants';
// import TipModal from '../../components/modals/TipModal';
import CommonModal from '../../components/modals/HelpUsImproveModal';
const waiter = require('../../assets/images/no-checkin.png');

const RateService = ({ navigation, route }) => {
  const { state, localizationContext } = useContext(Context);
  const [hospitality, setHospitality] = useState();
  const [currency, setCurrency] = useState();
  const [speed, setSpeed] = useState();
  const [service, setService] = useState();
  const [professionalism, setProfessionalism] = useState();
  const [remarks, setRemarks] = useState('');
  const [PayMethodsIsVisible, setPayMethodsIsVisible] = useState(false);
  const [isEnoughBalance, setIsEnoughBalance] = useState(false);
  const [TokenModalIsVisible, setTokenModalIsVisible] = useState(false);
  const [addRatings] = useMutation(ADD_RATINGS);
  const [loading, setLoading] = useState(false);
  const scrollRef = React.useRef(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [lotteryNo, setlotteryNo] = useState();
  useEffect(() => {
    (async () => {
      const { Currency } = await getAsyncStorageValues();
      setCurrency(JSON.parse(Currency));
    })();
  }, []);

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     () => {
  //       // setKeyboardVisible(true); // or some other action
  //       scrollRef.current.scrollToEnd();
  //     },
  //   );

  //   return () => {
  //     // keyboardDidHideListener.remove();
  //     keyboardDidShowListener.remove();
  //   };
  // }, []);
  const handlePayMethodClose = () => {
    setPayMethodsIsVisible(false);
  };
  const handleTokenModalClose = () => {
    setTokenModalIsVisible(false);
    navigation.navigate('Home', { crossIcon: false });
  };
  const handlePayDigital = () => {
    setPayMethodsIsVisible(false);
    navigation.navigate('addCard');
  };

  // useEffect(() => {
  //   if (isVisible) {
  //     setTimeout(() => {
  //       handleModalClose();
  //     }, 5000);
  //   }
  // }, [isVisible]);

  const { name, image, restaurant_id, waiter_id, place_id } = route.params;

  const handleAddRatings = async () => {
    if (state.userDetails.user_id) {
      setLoading(true);
      let ratingDetails = {
        rating: {
          hospitality: hospitality || '',
          speed: speed || '',
          service: service || '',
          professionalism: professionalism || '',
        },
        tip: remarks || '',
        user_id: state.userDetails.user_id || '',
        waiter_id: waiter_id || '',
        restaurant_id: restaurant_id || '',
        currency: currency.currency.split(' ').join('') || '',
        place_id,
      };
      await addRatings(ratingDetails, {
        onSuccess: async e => {
          setTokenModalIsVisible(true);
          setPayMethodsIsVisible(false);
          setlotteryNo(e.data.data.token);
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
          setIsEnoughBalance(true);
        },
      });
    } else {
      navigation.navigate('socialLogin', { vote: true });
    }
  };

  const obj = [1, 2, 3, 4, 5];

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        ref={scrollRef}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        style={[
          styles.container,
          Platform.OS === 'ios'
            ? isKeyboardVisible
              ? { marginBottom: Dimensions.get('window').height * 0.4 }
              : null
            : null,
        ]}
      >
        <View style={styles.viewProfile}>
          <ImageBackground
            style={{ width: '100%', height: 'auto', paddingBottom: 70 }}
            source={imgBg}
            resizeMode="stretch"
          >
            <GlobalHeader
              arrow={true}
              headingText={localizationContext.t('rate_your_server')}
              fontSize={17}
              color={Colors.fontDark}
              backgroundColor={'transparent'}
              navigation={navigation}
            />
            <View>
              <View style={styles.viewImg}>
                {image ? (
                  <Image
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                    source={{ uri: image }}
                  />
                ) : (
                  <FontAwesome name="user-circle-o" size={100} color="#fff" />
                )}
              </View>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[styles.txtName, { fontFamily: 'ProximaNovaBold' }]}
              >
                {name}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          style={styles.viewFlatlist}
        >
          <View style={styles.viewListCard}>
            <Text style={[styles.txtCard, { fontFamily: 'ProximaNovaBold' }]}>
              {localizationContext.t('hospitality')}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              {obj.map((v, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      setHospitality(v);
                    }}
                  >
                    <RatingStar
                      padding={true}
                      starSize={25}
                      type={
                        v <= hospitality
                          ? 'filled'
                          : v === hospitality + 0.5
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
          <View style={styles.viewListCard}>
            <Text style={[styles.txtCard, { fontFamily: 'ProximaNovaBold' }]}>
              {localizationContext.t('speed')}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              {obj.map((v, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      setSpeed(v);
                    }}
                  >
                    <RatingStar
                      padding={true}
                      starSize={25}
                      type={
                        v <= speed
                          ? 'filled'
                          : v === speed + 0.5
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
          <View style={styles.viewListCard}>
            <Text style={[styles.txtCard, { fontFamily: 'ProximaNovaBold' }]}>
              {localizationContext.t('service')}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              {obj.map((v, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      setService(v);
                    }}
                  >
                    <RatingStar
                      padding={true}
                      starSize={25}
                      type={
                        v <= service
                          ? 'filled'
                          : v === service + 0.5
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
          <View style={styles.viewListCard}>
            <Text style={[styles.txtCard, { fontFamily: 'ProximaNovaBold' }]}>
              {localizationContext.t('professionalism')}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              {obj.map((v, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      setProfessionalism(v);
                    }}
                  >
                    <RatingStar
                      padding={true}
                      starSize={25}
                      type={
                        v <= professionalism
                          ? 'filled'
                          : v === professionalism + 0.5
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
          <View style={{ alignItems: 'center' }}>
            <View style={styles.viewTip}>
              <Text style={[styles.txtCard, { fontFamily: 'ProximaNovaBold' }]}>
                {localizationContext.t('your_tip_to_waiter')}
              </Text>
              <TextInput
                returnKeyLabel="Validate"
                returnKeyType="done"
                onSubmitEditing={
                  hospitality &&
                  speed &&
                  professionalism &&
                  service &&
                  remarks.replace(/[^0-9]/g, '') &&
                  handleAddRatings
                }
                keyboardType="number-pad"
                value={remarks}
                onFocus={() => {
                  setKeyboardVisible(true);
                  setTimeout(() => {
                    scrollRef.current.scrollToEnd({ animated: true });
                  }, 100);
                }}
                onBlur={() => {
                  setKeyboardVisible(false);
                }}
                onChangeText={e => {
                  scrollRef.current.scrollToEnd({ animated: true });
                  setRemarks(e);
                }}
                //  onFocus={() => setonHandleFocus(!onHandleFocus)}
                style={[
                  styles.inputStyle,
                  { fontFamily: 'ProximaNova', textAlign: 'center' },
                ]}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleAddRatings}
            disabled={
              loading
                ? true
                : hospitality &&
                  speed &&
                  professionalism &&
                  service &&
                  remarks.replace(/[^0-9]/g, '')
                ? false
                : true
            }
            style={[
              styles.btnValider,
              hospitality &&
                speed &&
                professionalism &&
                service &&
                remarks.replace(/[^0-9]/g, '') && {
                  backgroundColor: Colors.yellow,
                },
            ]}
          >
            {loading ? (
              <ActivityIndicator size={25} color="#EBC11B" />
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'ProximaNova',
                  color: Colors.fontLight,
                }}
              >
                {localizationContext.t('validate')}
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
        {TokenModalIsVisible && (
          <ThankRatingModal
            isVisible={TokenModalIsVisible}
            LotteryNumber={lotteryNo}
            handleModalClose={handleTokenModalClose}
            checkBalance
            balanceType={'leaveAReview'}
            navigation={navigation}
            setModalClose={() => {
              setTokenModalIsVisible(false);
              navigation.goBack();
            }}
          />
        )}
        {/* {PayMethodsIsVisible && (
          <TipModal
            loading={loading}
            isVisible={PayMethodsIsVisible}
            handleModalClose={handlePayMethodClose}
            handlePayCash={handleAddRatings}
            handlePayDigital={handlePayDigital}
          />
        )} */}
        {isEnoughBalance && (
          <CommonModal
            isVisible={isEnoughBalance}
            handleModalClose={() => setIsEnoughBalance(false)}
            image={waiter}
            heading={localizationContext.t('sorry')}
            buttonText={localizationContext.t('top_up')}
            onPress={() => navigation.navigate('Balance')}
            subHeadingText={localizationContext.t('not_enough_miams')}
          />
        )}
      </ScrollView>
    </>
  );
};
export default RateService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  inputStyle: {
    height: 45,
    width: '80%',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    marginTop: 12,
    fontSize: 18,
    paddingVertical: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  viewTip: {
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    height: 120,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  txtCard: {
    fontSize: 18,
    marginTop: 15,
    letterSpacing: 1,
  },
  viewFlatlist: {
    backgroundColor: 'transparent',
    width: '100%',
    flex: 1,
    marginTop: -40,
  },
  btnValider: {
    backgroundColor: '#EAEAEA',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    marginBottom: Platform.OS === 'ios' ? 25 : 15,
    marginTop: 2,
    alignSelf: 'center',
  },
  viewListCard: {
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    height: 100,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  txtName: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 24,
    color: Colors.fontDark,
    maxWidth: '80%',
  },
  viewImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#bbb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  viewProfile: {
    backgroundColor: Colors.yellow,
    width: '100%',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
});
