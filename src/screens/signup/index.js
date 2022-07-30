import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator,
  ScrollView,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native';
import { useMutation } from 'react-query';
import { SIGN_UP_USER } from '../../queries';

import * as WebBrowser from 'expo-web-browser';
import { FontAwesome } from '@expo/vector-icons';
import CheckBox from 'react-native-check-box';
import { Colors } from '../../constants/Theme';

import Context from '../../contextApi/context';
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

const Input = ({ icon, placeholder, warperStyles, onChangeText }) => {
  return (
    <View style={[styles.inputWarper, warperStyles]}>
      <Image source={icon} />
      <TextInput
        placeholderTextColor="#485460"
        placeholder={placeholder}
        style={styles.input}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const Signup = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { dispatch, localizationContext } = useContext(Context);
  const [onSignUp, { isLoading: signupLoading }] = useMutation(SIGN_UP_USER);

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

  // Alert.alert(`${response?.params?.access_token} ${response?.type}`);

  const register = async () => {
    await onSignUp(
      {
        ...state,
      },
      {
        onSuccess: async res => {
          navigation.navigate('socialLogin');
        },
        onError: e => {
          alert(e.response.data.message);
        },
      },
    );
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

          <Text style={styles.txtSignIn}>Sign up</Text>
          <View style={styles.controlsWarper}>
            <Input
              icon={mail}
              placeholder="Name"
              warperStyles={{ marginBottom: 20, marginTop: 42 }}
              value={state.name}
              onChangeText={e => handleChange('name', e)}
            />
            <Input
              icon={mail}
              placeholder="Email Address"
              warperStyles={{ marginBottom: 20 }}
              value={state.email}
              onChangeText={e => handleChange('email', e)}
            />

            <Input
              icon={lock}
              placeholder="Password"
              warperStyles={{ marginBottom: 20 }}
              value={state.password}
              onChangeText={e => handleChange('password', e)}
            />
            <CommonButton
              disable={signupLoading}
              title="Sign Up"
              onPress={register}
            />
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
                Or Sign up with
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
          </View>

          <View>
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
          </View>

          <Text
            style={{
              color: '#485460',
              fontSize: 14,
              fontFamily: 'ProximaNova',
              lineHeight: 24,
              textAlign: 'center',
            }}
          >
            Already a member ? Sign in
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
export default Signup;

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
