import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  BackHandler,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native';
import { useMutation } from 'react-query';
import { SIGN_UP_USER } from '../../queries';
import { GOOGLE_SIGNUP } from '../../queries';
import * as actionTypes from '../../contextApi/actionTypes';
import { getAsyncStorageValues } from '../../constants';

import * as WebBrowser from 'expo-web-browser';
import { FontAwesome } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box';
import { Colors } from '../../constants/Theme';
import * as Device from 'expo-device';
import { iPhoneLoginName, upperTitleCase } from '../../util';
import Context from '../../contextApi/context';
import * as Notifications from 'expo-notifications';
import CommonButton from '../../components/common-button';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logo = require('../../assets/images/logo.png');
const mail = require('../../assets/images/mail.png');
const lock = require('../../assets/images/lock.png');

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

const Signup = ({ navigation }) => {
  const [termsChecked, setTermsChecked] = useState(false);
  const [city, setCity] = useState();
  const os = Platform.OS === 'android' ? 'android' : 'apple';

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { dispatch, localizationContext } = useContext(Context);
  const [onSignUp, { isLoading: signupLoading }] = useMutation(SIGN_UP_USER);
  const [googleSignup] = useMutation(GOOGLE_SIGNUP);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const handleChange = (name, value) => {
    setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    async function loadCity() {
      const { City } = await getAsyncStorageValues();
      setCity(City?.city);
    }
    loadCity();
  }, []);

  useEffect(() => {
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

  const register = async () => {
    await onSignUp(
      {
        ...state,
        city,
        login_type: 'login',
        mobile_type: Device.deviceName || '',
        os,
      },
      {
        onSuccess: async res => {
          navigation.navigate('socialLogin');
        },
        onError: e => {
          Alert.alert(
            e?.response?.data?.error[0]?.message || e.response?.data?.message,
          );
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
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={styles.viewImg}>
            <Image style={styles.imgStyle} source={logo} resizeMode="contain" />
          </View>

          <Text style={styles.txtSignIn}>
            {localizationContext.t('sign_up')}
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
              disable={signupLoading}
              fontFamily="ProximaNovaBold"
              title={localizationContext.t('sign_up')}
              onPress={() =>
                termsChecked
                  ? register()
                  : alert('Please accept condition to continue.')
              }
              loading={signupLoading}
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
                    {localizationContext.t('sign_up_with')}
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
                      if (termsChecked) {
                        const credential = await AppleAuthentication.signInAsync(
                          {
                            requestedScopes: [
                              AppleAuthentication.AppleAuthenticationScope
                                .FULL_NAME,
                              AppleAuthentication.AppleAuthenticationScope
                                .EMAIL,
                            ],
                          },
                        );

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
                            } else {
                              navigation.navigate('Home', { crossIcon: false });
                              // navigation.replace('Setting', { login: true });
                            }
                          },
                          onError: e => {
                            alert(`Apple Login Error: ${e}`);
                          },
                        });
                      } else {
                        Alert.alert('Please accept condition to continue.');
                      }
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
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 55,
                textAlign: 'center',
                marginTop: 10,
              }}
            >
              <CheckBox
                style={{
                  zIndex: 9999,
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
                      color: Colors.fontLight,
                    }}
                  >
                    <Text
                      style={{
                        color: '#0050A0',
                        fontSize: 14,
                        fontFamily: 'ProximaNova',
                      }}
                    >
                      {localizationContext.t('terms_of_use')}
                    </Text>{' '}
                    {localizationContext.t('and')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: -10,
            }}
            onPress={() =>
              WebBrowser.openBrowserAsync(
                'https://pourboir.com/fr/need-help/privacy-policy/',
              )
            }
          >
            <Text
              style={{
                color: Colors.fontLight,
                textAlign: 'center',
                fontSize: 14,
              }}
              onPress={() => setTermsChecked(!termsChecked)}
            >
              {localizationContext.t('et_la')}
            </Text>
            <Text style={{ color: '#0050A0', fontFamily: 'ProximaNova' }}>
              {' '}
              {localizationContext.t('confidential')}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 20,
              marginTop: 40,
            }}
          >
            <Text
              style={{
                color: '#485460',
                fontSize: 14,
                fontFamily: 'ProximaNova',
                lineHeight: 24,
                textAlign: 'center',
              }}
            >
              {localizationContext.t('already_a_member')}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('socialLogin')}
            >
              <Text
                style={{
                  color: '#485460',
                  fontSize: 14,
                  fontFamily: 'ProximaNovaBold',
                  lineHeight: 24,
                  marginLeft: 6,
                }}
              >
                {localizationContext.t('sign_in_small')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Signup;

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
});
