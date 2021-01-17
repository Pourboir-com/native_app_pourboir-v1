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
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/Theme';
import * as Google from 'expo-google-app-auth';
import i18n from '../../li8n';
import { loadAsync } from 'expo-font';
import { config, BASE_URL } from '../../constants';
import { userSignUp } from '../../util';
import { useMutation } from 'react-query';
import { GOOGLE_SIGNUP } from '../../queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Context from '../../contextApi/context';
import * as actionTypes from '../../contextApi/actionTypes';
const imgLogo = require('../../assets/images/imgLogo.png');
const imgWaiter = require('../../assets/images/waiter2.png');
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';


const SocialLogin = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [fontLoaded, setFontLoaded] = useState(false);

  const [googleSignup] = useMutation(GOOGLE_SIGNUP);

  const fetchFont = () => {
    return Font.loadAsync({
      ProximaNova: require('../../assets/fonts/ProximaNova/ProximaNova-Regular.otf'),
      ProximaNovaBold: require('../../assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
    });
  };

  // useEffect(() => {
  //   async function loadFont() {
  //     await loadAsync({
  //       // Load a font `Montserrat` from a static resource
  //       ProximaNova: require('../../assets/fonts/ProximaNova/ProximaNova-Regular.otf'),
  //       ProximaNovaBold: require('../../assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
  //     });
  //   }
  //   loadFont();
  //   setLoading(false);
  // }, []);

  const { dispatch } = useContext(Context);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    // First- obtain access token from Expo's Google API
    const { type, accessToken, user } = await Google.logInAsync(config);
    setLoading(false);
    if (type === 'success') {
      // Then you can use the Google REST API
      let userInfoResponse = await userSignUp(accessToken);
      await googleSignup(userInfoResponse.data, {
        onSuccess: async () => {
          navigation.replace('Home', { crossIcon: false });
          let userDetails = {
            name: userInfoResponse.data.name,
            image: userInfoResponse.data.picture,
            email: userInfoResponse.data.email,
            accessToken: accessToken,
          };

          dispatch({
            type: actionTypes.USER_DETAILS,
            payload: userDetails,
          });

          await AsyncStorage.setItem(
            '@userInfo',
            JSON.stringify({
              name: userInfoResponse.data.name,
              image: userInfoResponse.data.picture,
              email: userInfoResponse.data.email,
              accessToken: accessToken,
            }),
          );
        },
        onError: error => {
          console.log(error);
        },
      });
    }
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: fontLoaded ? Colors.yellow : '#fff' },
      ]}
    >
      {!fontLoaded ? (
        <>
          <AppLoading
            startAsync={fetchFont}
            onFinish={() => {
              setFontLoaded(true);
            }}
            onError={() => console.log('ERROR')}
          />
          <ActivityIndicator size={70} color={Colors.yellow} />
        </>
      ) : (
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Image
            style={styles.imgLogoStyle}
            source={imgLogo}
            resizeMode="contain"
          />
          <View style={styles.viewImg}>
            <Image
              style={styles.imgStyle}
              source={imgWaiter}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home', { crossIcon: false })}
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
    // flex:1,
    // backgroundColor:'red',
    width: Dimensions.get('window').width * 1,
    marginLeft: Dimensions.get('window').width * 0.05,
    height: Dimensions.get('window').height * 0.5,
    alignSelf: 'center',
    // marginBottom:20
  },
  imgLogoStyle: {
    width: 200,
    height: 50,
    marginTop: 20,
    // height:'auto'
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
  textFb: {
    color: '#fff',
    marginLeft: 10,
  },
});
