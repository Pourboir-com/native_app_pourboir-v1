import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native';

import * as Facebook from 'expo-auth-session/providers/facebook';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { FontAwesome } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box';
import { Colors } from '../../constants/Theme';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { googleLoginConfig } from '../../constants';
import { userSignUp, iPhoneLoginName, upperTitleCase } from '../../util';
import { useMutation } from 'react-query';
import { GOOGLE_SIGNUP, SEND_PUSH_TOKEN } from '../../queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from '../../contextApi/context';
import * as actionTypes from '../../contextApi/actionTypes';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Device from 'expo-device';
import { getAsyncStorageValues } from '../../constants';
import * as Notifications from 'expo-notifications';
import CommonButton from '../../components/common-button';

const logo = require('../../assets/images/logo.png');
const mail = require('../../assets/images/mail.png');
const lock = require('../../assets/images/lock.png');

// const redirectUri = AuthSession.makeRedirectUri({
//   useProxy: true,
// });
// Alert.alert(redirectUri);
WebBrowser.maybeCompleteAuthSession();

const Input = ({ icon, placeholder, warperStyles }) => {
  return (
    <View style={[styles.inputWarper, warperStyles]}>
      <Image source={icon} />
      <TextInput
        placeholderTextColor="#485460"
        placeholder={placeholder}
        style={styles.input}
      />
    </View>
  );
};

const SocialLogin = ({ navigation, route }) => {
  const [city, setCity] = useState();
  const [loading, setLoading] = useState(false);
  const [googleSignup] = useMutation(GOOGLE_SIGNUP);
  const [vote, setVote] = useState(false);
  const [confirmWaiter, setconfirmWaiter] = useState(false);
  const [HelpUs, setHelpUs] = useState();
  const [termsChecked, setTermsChecked] = useState(false);
  const [sendNotificationToken] = useMutation(SEND_PUSH_TOKEN);
  const { dispatch, localizationContext } = useContext(Context);
  const os = Platform.OS === 'android' ? 'android' : 'apple';
  // const useProxy = Platform.select({ web: false, default: true });
  // const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
  // let discovery = {
  //   authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  // };
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    ...googleLoginConfig,
  });

  // AuthSession.loadAsync(
  //   {
  //     redirectUri,
  //     clientId:
  //       '849073051273-98gj33amn2p0a9apup5ogfktdl22a4tc.apps.googleusercontent.com',
  //     scopes: ['openid', 'profile', 'email'],
  //   },
  //   discovery,
  // ).then(request => {
  //   console.log(request);
  //   request.promptAsync(discovery);
  // })

  const [
    facebookRequest,
    facebookResponse,
    facebookPromptAsync,
  ] = Facebook.useAuthRequest({
    clientId: '771555200360518',
  });

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
        alert('Failed to get push token for push notification!');
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

  useEffect(() => {
    if (response?.type === 'success') {
      handleGoogleSignIn(response.params.id_token);
    }
  }, [response]);
  // Alert.alert(`${response?.params?.access_token} ${response?.type}`);

  useEffect(() => {
    if (facebookResponse?.type === 'success') {
      facebookLogin(facebookResponse.params.id_token);
    }
  }, [facebookResponse]);

  const handleGoogleSignIn = async accessToken => {
    try {
      setLoading(true);
      let userInfoResponse = await userSignUp(accessToken);

      let userSignInDetails = {
        email: userInfoResponse.data.email,
        family_name: userInfoResponse.data?.family_name,
        given_name: userInfoResponse.data?.given_name,
        id: userInfoResponse.data.sub,
        locale: userInfoResponse.data.locale,
        name: userInfoResponse.data.name,
        picture: userInfoResponse.data?.picture,
        city: city,
        login_type: 'Google',
        mobile_type: Device.deviceName,
        verified_email: `${userInfoResponse.data.email_verified}`,
        os,
      };
      await googleSignup(userSignInDetails, {
        onSuccess: async res => {
          let userDetails = {
            name: upperTitleCase(res?.user?.full_name),
            // ? userGivenName(res?.user?.full_name)
            // : '',
            image: res?.user?.picture || '',
            email: res?.user?.email || '',
            accessToken: response?.params?.id_token || '',
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

          if (!res?.user?.username) {
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
            // navigation.replace('Setting', { login: true });
          }
          registerForPushNotifications(res?.user?._id);
          setLoading(false);
        },
        onError: error => {
          setLoading(false);
          alert(`Google Login Error: ${error}`);
        },
      }).catch(error => {
        setLoading(false);
        alert(`Google Login Error: ${error}`);
      });
    } catch (e) {
      setLoading(false);
      alert(`Google Login Error: ${e}`);
    }
  };

  const facebookLogin = async token => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}&fields=id,name,first_name,last_name,middle_name,email,picture.height(500)`,
      )
        .then(response => response.json())
        .then(async data => {
          setLoading(true);
          let user = {
            name: data?.name || '',
            email: data?.email || '',
            family_name: data?.last_name || '',
            id: data?.id || '',
            picture: data?.picture?.data?.url || '',
            city: city,
            login_type: 'Facebook',
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
                accessToken: token || '',
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
              if (!res?.user?.username) {
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
                // navigation.replace('Setting', { login: true });
              }
              registerForPushNotifications(res?.user?._id);
              setLoading(false);
            },
            onError: e => {
              setLoading(false);
              alert(`Facebook Login Error: ${e}`);
            },
          });
        })
        .catch(e => {
          setLoading(false);
          alert(`Facebook Login Error: ${e}`);
        });
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <ScrollView
      alwaysBounceHorizontal={false}
      alwaysBounceVertical={false}
      bounces={false}
      contentContainerStyle={[styles.container, { backgroundColor: '#f9f9f9' }]}
    >
      {loading ? (
        <ActivityIndicator size={70} color={Colors.yellow} />
      ) : (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={styles.viewImg}>
            <Image style={styles.imgStyle} source={logo} resizeMode="contain" />
          </View>
          {/* <TouchableOpacity
            activeOpacity={0.5}
            disabled={!facebookRequest}
            onPress={() =>
              termsChecked
                ? facebookPromptAsync()
                : alert('Please accept condition to continue.')
            }
            style={styles.btnFb}
          >
            <FontAwesome name="facebook" color="#fff" size={20} />
            <Text
              style={[
                styles.textFb,
                {
                  fontSize: 16,
                  fontFamily: 'ProximaNova',
                },
              ]}
            >
              {localizationContext.t('continue_with_fb')}
            </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            activeOpacity={0.5}
            disabled={!request}
            onPress={() =>
              termsChecked
                ? promptAsync()
                : alert('Please accept condition to continue.')
            }
            style={styles.btnGoogle}
          >
            <FontAwesome name="google" color="#fff" size={20} />
            <Text
              style={[
                styles.textFb,
                {
                  fontSize: 16,
                  fontFamily: 'ProximaNova',
                },
              ]}
            >
              {localizationContext.t('continue_with_google')}
            </Text>
          </TouchableOpacity> */}
          {/* {Platform.OS === 'ios' && (
            <React.Fragment>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={async () => {
                  if (termsChecked) {
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
                        login_type: 'Facebook',
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

                          if (!res?.user?.username) {
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
                            // navigation.replace('Setting', { login: true });
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
                  } else {
                    alert('Please accept condition to continue.');
                  }
                }}
                style={styles.btnApple}
              >
                <FontAwesome name="apple" color="#fff" size={20} />
                <Text
                  style={[
                    styles.textFb,
                    {
                      fontSize: 16,
                      fontFamily: 'ProximaNova',
                    },
                  ]}
                >
                  {localizationContext.t('continue_with_apple')}
                </Text>
              </TouchableOpacity>
            </React.Fragment>
          )} */}
          <Text style={styles.txtSignIn}>Sign in</Text>
          <View style={styles.controlsWarper}>
            <Input
              icon={mail}
              placeholder="Email Address"
              warperStyles={{ marginBottom: 20, marginTop: 42 }}
            />
            <Input
              icon={lock}
              placeholder="Password"
              warperStyles={{ marginBottom: 20 }}
            />
            <CommonButton title="Sign In" />
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
                  fontSize: '16px',
                  color: '#485460',
                  marginHorizontal: 20,
                  fontFamily: 'ProximaNovaSemiBold',
                }}
              >
                Or Sign in with
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

            <View
              style={{
                backgroundColor: '#000',
                height: 50,
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                marginTop: 20,
              }}
            >
              <FontAwesome name="apple" color="#fff" size={30} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 96,
              }}
            >
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                  <Text
                    style={{
                      fontSize: '14px',
                      color: '#485460',
                      fontFamily: 'ProximaNovaSemiBold',
                    }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: '14px',
                  color: '#485460',
                  fontFamily: 'ProximaNovaSemiBold',
                }}
              >
                Forgot Password ?
              </Text>
            </View>
          </View>

          {/* <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 80,
                textAlign: 'center',
              }}
            >
              <CheckBox
                style={{
                  zIndex: 9999,
                  marginTop: Platform.OS === 'ios' ? -10 : -2,
                }}
                onClick={() => setTermsChecked(!termsChecked)}
                isChecked={termsChecked}
                checkedImage={
                  <Image
                    style={{ width: 18, marginTop: -4 }}
                    resizeMode={'contain'}
                    source={require('../../assets/images/checked.png')}
                  />
                }
                unCheckedImage={
                  <Image
                    style={{ width: 16 }}
                    resizeMode={'contain'}
                    source={require('../../assets/images/unchecked.png')}
                  />
                }
              />
              <Text
                style={[
                  {
                    textAlign: 'center',
                  },
                ]}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      color: Colors.fontLight,
                      textAlign: 'center',
                      fontSize: 14,
                      marginLeft: Platform.OS === 'android' ? 15 : 5,
                    }}
                    onPress={() => setTermsChecked(!termsChecked)}
                  >
                    {localizationContext.t('I_accept')}{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      WebBrowser.openBrowserAsync(
                        'https://pourboir.com/fr/need-help/privacy-policy/',
                      )
                    }
                  >
                    <Text
                      style={{
                        color: '#0050A0',
                        fontSize: 14,
                        fontFamily: 'ProximaNova',
                        lineHeight: 24,
                        textAlign: 'center',
                        marginTop: Platform.OS === 'android' ? -1 : -2.5,
                      }}
                    >
                      {localizationContext.t('terms_of_use')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Text>
            </View>

            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: -27,
                marginLeft: 30,
              }}
            >
              <Text
                style={{ color: Colors.fontLight, fontFamily: 'ProximaNova' }}
              >
                {localizationContext.t('et_la')}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  WebBrowser.openBrowserAsync(
                    'https://pourboir.com/fr/need-help/privacy-policy/',
                  )
                }
              >
                <Text style={{ color: '#0050A0', fontFamily: 'ProximaNova' }}>
                  {localizationContext.t('confidential')}
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </View>
      )}
    </ScrollView>
  );
};
export default SocialLogin;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 45,
  },
  txtSignIn: {
    color: '#1E272E',
    fontSize: 36,
    fontWeight: '400',
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
