import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { Colors } from '../../constants/Theme';
import * as Google from 'expo-google-app-auth';
import i18n from '../../li8n';
import { loadAsync } from 'expo-font';
import { config } from '../../constants';
import { userSignUp, userGivenName, iPhoneLoginName } from '../../util';
import { useMutation } from 'react-query';
import { GOOGLE_SIGNUP } from '../../queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Context from '../../contextApi/context';
import * as actionTypes from '../../contextApi/actionTypes';
const imgLogo = require('../../assets/images/imgLogo.png');
const imgWaiter = require('../../assets/images/waiter2.png');
import * as Facebook from 'expo-facebook';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import { getAsyncStorageValues } from '../../constants';

const SocialLogin = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [googleSignup] = useMutation(GOOGLE_SIGNUP);
  const [vote, setVote] = useState(false);
  const [confirmWaiter, setconfirmWaiter] = useState(false);
  const [HelpUs, setHelpUs] = useState();
  useEffect(() => {
    setVote(route?.params?.vote ? route?.params?.vote : false);
    setconfirmWaiter(
      route?.params?.confirmWaiter ? route?.params?.confirmWaiter : false,
    );
    setHelpUs(route?.params?.HelpUs ? route?.params?.HelpUs : false);
  }, [route.params]);

  useEffect(() => {
    async function loadFont() {
      await loadAsync({
        // Load a font `Montserrat` from a static resource
        ProximaNova: require('../../assets/fonts/ProximaNova/ProximaNova-Regular.otf'),
        ProximaNovaBold: require('../../assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
      });
    }
    loadFont();
  }, []);
  const { state, dispatch } = useContext(Context);
  const handleGoogleSignIn = async () => {
    const { City } = await getAsyncStorageValues();
    // First- obtain access token from Expo's Google API
    const { type, accessToken, user } = await Google.logInAsync(config);
    if (type === 'success') {
      setLoading(true);
      // Then you can use the Google REST API
      let userInfoResponse = await userSignUp(accessToken);
      let userSignInDetails = {
        ...userInfoResponse.data,
        city: City?.city,
        login_type: 'Google',
        mobile_type: Device.deviceName,
        verified_email: `${userInfoResponse.data.verified_email}`,
      };
      await googleSignup(userSignInDetails, {
        onSuccess: async res => {
          console.log(res);
          if (vote) {
            navigation.navigate('RateYourService');
            setVote(false);
          } else if (confirmWaiter || HelpUs) {
            navigation.navigate('OpenCardReviews');
          } else {
            navigation.navigate('Home', { crossIcon: false });
          }
          let userDetails = {
            name: res?.user?.full_name
              ? userGivenName(res?.user?.full_name)
              : '',
            image: res?.user?.picture || '',
            email: res?.user?.email || '',
            accessToken: accessToken || '',
            user_id: res?.user?._id || '',
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
    }
  };

  const facebookLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '771555200360518',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      const { City } = await getAsyncStorageValues();
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
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
              city: City?.city,
              login_type: 'Facebook',
              mobile_type: Device.deviceName,
            };
            await googleSignup(user, {
              onSuccess: async res => {
                console.log(res);
                if (vote) {
                  navigation.navigate('RateYourService');
                  setVote(false);
                } else if (confirmWaiter || HelpUs) {
                  navigation.navigate('OpenCardReviews');
                } else {
                  navigation.navigate('Home', { crossIcon: false });
                }
                let userDetails = {
                  name: res?.user?.full_name
                    ? userGivenName(res?.user?.full_name)
                    : '',
                  image: res?.user?.picture || '',
                  email: res?.user?.email || '',
                  accessToken: token || '',
                  user_id: res?.user?._id || '',
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
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: loading ? '#fff' : Colors.yellow },
      ]}
    >
      {loading ? (
        <ActivityIndicator size={70} color={Colors.yellow} />
      ) : (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={styles.cross}
              onPress={() => {
                navigation.navigate('Home', { crossIcon: false });
                dispatch({
                  type: actionTypes.REFRESH_ANIMATION,
                  payload: !state.refreshAnimation,
                });
              }}
            >
              <Entypo name="cross" size={32} color="black" />
            </TouchableOpacity>
            <Image
              style={styles.imgLogoStyle}
              source={imgLogo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.viewImg}>
            <Image
              style={styles.imgStyle}
              source={imgWaiter}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity
            // onPress={() => navigation.navigate('Home', { crossIcon: false })}
            onPress={facebookLogin}
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
              {i18n.t('continue_with_fb')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleGoogleSignIn}
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
              {i18n.t('continue_with_google')}
            </Text>
          </TouchableOpacity>
          {Platform.OS === 'ios' && (
            <React.Fragment>
              <TouchableOpacity
                onPress={async () => {
                  try {
                    const credential = await AppleAuthentication.signInAsync({
                      requestedScopes: [
                        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                        AppleAuthentication.AppleAuthenticationScope.EMAIL,
                      ],
                    });
                    let user = {
                      name: iPhoneLoginName(credential.fullName) || '',
                      email: credential.email || '',
                      family_name: credential.fullName?.familyName || '',
                      id: credential.user || '',
                      picture: credential.image || '',
                    };

                    await googleSignup(user, {
                      onSuccess: async res => {
                        if (vote) {
                          navigation.navigate('RateYourService');
                          setVote(false);
                        } else if (confirmWaiter || HelpUs) {
                          navigation.navigate('OpenCardReviews');
                        } else {
                          navigation.navigate('Home', { crossIcon: false });
                        }
                        let userDetails = {
                          name: res?.user?.full_name
                            ? userGivenName(res?.user?.full_name)
                            : '',
                          image: res?.user?.picture || '',
                          email: res?.user?.email || '',
                          accessToken: credential.authorizationCode || '',
                          user_id: res?.user?._id || '',
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
                  {i18n.t('continue_with_apple')}
                </Text>
              </TouchableOpacity>
            </React.Fragment>
          )}
          <Text
            style={[
              styles.txtCreatingAcc,
              {
                fontSize: 14,
                fontFamily: 'ProximaNova',
                lineHeight: 24,
              },
            ]}
          >
            {i18n.t('by_creatin_your_acc')}
          </Text>
          <View style={styles.viewbtns}>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#0050A0',
                  fontSize: 14,
                  fontFamily: 'ProximaNova',
                  lineHeight: 24,
                }}
              >
                {i18n.t('terms_of_use')}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                width: 1,
                height: 10,
                backgroundColor: 'grey',
                marginHorizontal: 10,
              }}
            />
            <TouchableOpacity>
              <Text
                style={{
                  color: '#0050A0',
                  fontSize: 14,
                  fontFamily: 'ProximaNova',
                  lineHeight: 24,
                }}
              >
                {i18n.t('privacy_policy')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
export default SocialLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtCreatingAcc: {
    color: Colors.fontLight,
    fontSize: 12,
    marginTop: 10,
  },
  viewImg: {
    width: '100%',
    alignSelf: 'center',
    height: Dimensions.get('window').height * 0.5,
    marginBottom: 10,
    // backgroundColor:'black'
  },
  viewbtns: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    marginLeft: Dimensions.get('window').width * 0.05,
    height: Dimensions.get('window').height * 0.38,
    alignSelf: 'center',
    marginTop: 15,
  },
  imgLogoStyle: {
    width: 200,
    height: 50,
    position: 'relative',
    marginRight: '16%',
    // marginTop: 10,
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
