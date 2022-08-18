import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/Theme';
import { iPhoneLoginName, upperTitleCase } from '../../util';
import { useMutation } from 'react-query';
import { GOOGLE_SIGNUP, SEND_PUSH_TOKEN, LOGIN_USER } from '../../queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../../contextApi/context';
import * as actionTypes from '../../contextApi/actionTypes';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Device from 'expo-device';
import { getAsyncStorageValues } from '../../constants';
import * as Notifications from 'expo-notifications';
import CommonButton from '../../components/common-button';
import CommonModal from '../../components/modals/HelpUsImproveModal';
const waiter = require('../../assets/images/error-icon.png');
const logo = require('../../assets/images/logo.png');
const mail = require('../../assets/images/mail.png');
const lock = require('../../assets/images/lock.png');
const balanceBg = require('../../assets/images/modalBG.png');

WebBrowser.maybeCompleteAuthSession();

const Input = ({
  icon,
  placeholder,
  warperStyles,
  onChangeText,
  secureTextEntry,
}) => {
  return (
    <View style={[styles.inputWarper, warperStyles]}>
      <Image source={icon} />
      <TextInput
        placeholderTextColor="#485460"
        placeholder={placeholder}
        style={styles.input}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const SocialLogin = ({ navigation, route }) => {
  const [city, setCity] = useState();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [signInError, setSignInError] = useState(false);
  const [googleSignup] = useMutation(GOOGLE_SIGNUP);
  const [vote, setVote] = useState(false);
  const [confirmWaiter, setconfirmWaiter] = useState(false);
  const [HelpUs, setHelpUs] = useState();
  const [sendNotificationToken] = useMutation(SEND_PUSH_TOKEN);
  const [loginUser, { isLoading: loginLoading }] = useMutation(LOGIN_USER);
  const { dispatch, localizationContext } = useContext(Context);
  const os = Platform.OS === 'android' ? 'android' : 'apple';

  const notificationListener = useRef();
  const responseListener = useRef();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  React.useEffect(() => {
    const handleBackButtonClick = () => {
      BackHandler.exitApp();
      return true;
    };

    navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    });
    navigation.addListener('blur', () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    });
  });

  const registerForPushNotifications = async user_id => {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        // alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: true,
      });
    }
    const { language } = await getAsyncStorageValues();
    await sendNotificationToken(
      {
        id: user_id,
        expo_notification_token: token,
        lang: language || '',
      },
      {
        enabled: user_id ? true : false,
      },
    );
    notificationListener.current = Notifications.addNotificationReceivedListener(
      notification => {
        navigation.navigate('WaiterProfile', {
          crossIcon: true,
        });
      },
    );
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      response => {
        navigation.navigate('WaiterProfile', {
          crossIcon: true,
        });
      },
    );
  };
  const handleChange = (name, value) => {
    setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setVote(route?.params?.vote ? route?.params?.vote : false);
    setconfirmWaiter(
      route?.params?.confirmWaiter ? route?.params?.confirmWaiter : false,
    );
    setHelpUs(route?.params?.HelpUs ? route?.params?.HelpUs : false);
  }, [route.params]);

  useEffect(() => {
    async function loadCity() {
      const { City } = await getAsyncStorageValues();
      setCity(City?.city);
    }
    loadCity();
  }, []);

  const handleLogin = async () => {
    await loginUser(
      {
        ...state,
      },
      {
        onSuccess: async res => {
          let {
            _id,
            email,
            full_name,
            picture,
            last_name,
            username,
            calling_code,
            phone_number,
            description,
          } = res?.data?.data?.user || {};

          let userDetails = {
            name: upperTitleCase(full_name),
            image: picture || '',
            email: email || '',
            accessToken: res?.data?.data?.access_token || '',
            user_id: _id || '',
            username: username || '',
            description: description || '',
            last_name: last_name || '',
            calling_code: calling_code || '',
            phone_number: phone_number || '',
            os,
          };

          dispatch({
            type: actionTypes.USER_DETAILS,
            payload: userDetails,
          });

          await AsyncStorage.setItem(
            '@userInfo',
            JSON.stringify({
              ...userDetails,
            }),
          );

          if (!username) {
            navigation.replace('personalDetails', {
              login: true,
            });
          } else if (vote) {
            navigation.replace('RateYourService');
            setVote(false);
          } else if (confirmWaiter || HelpUs) {
            navigation.replace('OpenCardReviews');
          } else {
            navigation.navigate('Home', { crossIcon: false });
          }
          registerForPushNotifications(_id);
          setLoading(false);
        },
        onError: () => {
          setSignInError(true);
        },
      },
    );
  };

  return (
    <ScrollView
      alwaysBounceHorizontal={false}
      alwaysBounceVertical={false}
      bounces={false}
      contentContainerStyle={{ backgroundColor: '#f9f9f9', flexGrow: 1 }}
    >
      <View style={styles.container}>
        <Spinner visible={loading} />
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={styles.viewImg}>
            <Image style={styles.imgStyle} source={logo} resizeMode="contain" />
          </View>
          <Text style={styles.txtSignIn}>
            {localizationContext.t('sign_in')}
          </Text>
          <View style={styles.controlsWarper}>
            <Input
              icon={mail}
              placeholder={localizationContext.t('email_address')}
              warperStyles={{ marginBottom: 20, marginTop: 42 }}
              value={state.email}
              onChangeText={e => handleChange('email', e)}
            />
            <Input
              icon={lock}
              placeholder={localizationContext.t('password')}
              warperStyles={{ marginBottom: 20 }}
              value={state.password}
              onChangeText={e => handleChange('password', e)}
              secureTextEntry={true}
            />
            <CommonButton
              disable={loginLoading}
              title={localizationContext.t('sign_in')}
              loading={loginLoading}
              onPress={handleLogin}
              fontFamily="ProximaNovaBold"
            />
            {Platform.OS === 'ios' && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 24,
                  }}
                >
                  <View
                    style={{
                      height: 1,
                      width: 40,
                      borderWidth: 1,
                      borderColor: '#000',
                    }}
                  ></View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#485460',
                      marginHorizontal: 20,
                      fontFamily: 'ProximaNovaBold',
                    }}
                  >
                    {localizationContext.t('sign_in_with')}
                  </Text>
                  <View
                    style={{
                      height: 1,
                      width: 40,
                      borderWidth: 1,
                      borderColor: '#000',
                    }}
                  ></View>
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#000',
                    height: 50,
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginTop: 20,
                  }}
                  activeOpacity={0.5}
                  onPress={async () => {
                    try {
                      const credential = await AppleAuthentication.signInAsync({
                        requestedScopes: [
                          AppleAuthentication.AppleAuthenticationScope
                            .FULL_NAME,
                          AppleAuthentication.AppleAuthenticationScope.EMAIL,
                        ],
                      });

                      let user = {
                        name: iPhoneLoginName(credential.fullName) || '',
                        email: credential.email || '',
                        family_name: credential.fullName?.familyName || '',
                        id: credential.user || '',
                        picture: credential.image || '',
                        city: city,
                        login_type: 'apple',
                        mobile_type: Device.deviceName || '',
                        os,
                      };

                      await googleSignup(user, {
                        onSuccess: async res => {
                          let userDetails = {
                            name: upperTitleCase(res?.user?.full_name),
                            // ? userGivenName(res?.user?.full_name)
                            // : '',
                            image: res?.user?.picture || '',
                            email: res?.user?.email || '',
                            accessToken: credential.authorizationCode || '',
                            user_id: res?.user?._id || '',
                            username: res?.user?.username || '',
                            description: res?.user?.description || '',
                            last_name: res?.user?.last_name || '',
                            calling_code: res?.user?.calling_code || '',
                            phone_number: res?.user?.phone_number || '',
                            os,
                          };

                          dispatch({
                            type: actionTypes.USER_DETAILS,
                            payload: userDetails,
                          });

                          await AsyncStorage.setItem(
                            '@userInfo',
                            JSON.stringify({
                              ...userDetails,
                            }),
                          );

                          if (vote) {
                            navigation.replace('RateYourService');
                            setVote(false);
                          } else if (confirmWaiter || HelpUs) {
                            navigation.replace('OpenCardReviews');
                          } else {
                            navigation.navigate('Home', { crossIcon: false });
                          }
                          registerForPushNotifications(res?.user?._id);
                          setLoading(false);
                        },
                        onError: e => {
                          setLoading(false);
                          alert(`Apple Login Error: ${e}`);
                        },
                      });
                      // signed in
                    } catch (e) {
                      if (e.code === 'ERR_CANCELED') {
                        // handle that the user canceled the sign-in flow
                      } else {
                        // handle other errors
                      }
                    }
                  }}
                >
                  <FontAwesome name="apple" color="#fff" size={30} />
                </TouchableOpacity>
              </>
            )}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginVertical: 40,
                marginTop: 60,
              }}
            >
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#485460',
                      fontFamily: 'ProximaNovaBold',
                    }}
                  >
                    {localizationContext.t('sign_up_small')}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: '#485460',
                  fontFamily: 'ProximaNovaSemiBold',
                }}
              >
                {localizationContext.t('forget_password')}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {signInError && (
        <CommonModal
          isVisible={signInError}
          handleModalClose={() => setSignInError(false)}
          image={waiter}
          bgImage={balanceBg}
          imageSyles={[
            {
              height: 160,
              marginTop: 20,
            },
          ]}
          bgImageStyles={[
            {
              height: 400,
              marginBottom: -170,
            },
          ]}
          onPress={() => {
            setSignInError(false);
            navigation.navigate('signup');
          }}
          heading={localizationContext.t('sorry')}
          subHeadingText={localizationContext.t('signin_error')}
          buttonText={localizationContext.t('sign_up')}
        />
      )}
    </ScrollView>
  );
};
export default SocialLogin;

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  txtSignIn: {
    color: '#1E272E',
    fontSize: 36,
    fontFamily: 'ProximaNovaBold',
  },
  controlsWarper: {
    width: 276,
    alignItems: 'center',
  },
  inputWarper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingLeft: 10,
    borderRadius: 10,
  },
  input: {
    backgroundColor: 'transparent',
    width: '92%',
    height: 50,
    paddingLeft: 10,
  },
  txtCreatingAcc: {
    color: Colors.fontLight,
    fontSize: 12,
    marginLeft: 4,
    marginTop: 25,
  },
  viewImg: {
    width: '100%',
  },
  viewbtns: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    marginLeft: Dimensions.get('window').width * 0.05,
    alignSelf: 'center',
    marginTop: 15,
    height: 160,
  },
  imgLogoStyle: {
    width: 200,
    height: 50,
    position: 'relative',
  },
  btnFb: {
    width: '90%',
    flexDirection: 'row',
    backgroundColor: '#4267B2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 15,
    marginTop: -35,
  },
  btnGoogle: {
    width: '90%',
    flexDirection: 'row',
    backgroundColor: '#DD4B39',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 15,
  },
  btnApple: {
    width: '90%',
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginBottom: 15,
  },
  textFb: {
    color: '#fff',
    marginLeft: 10,
  },
  cross: {
    width: '18%',
    alignSelf: 'flex-start',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
  },
});
