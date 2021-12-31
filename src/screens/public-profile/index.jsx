import React, { useContext, useRef } from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
// import Constants from 'expo-constants';
import GlobalHeader from '../../components/GlobalHeader';
import styles from './styles';
import RatingStar from '../../components/RatingComponent';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { Colors } from '../../constants/Theme';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getAsyncStorageValues } from '../../constants';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import Context from '../../contextApi/context';
import * as actionTypes from '../../contextApi/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as IntentLauncher from 'expo-intent-launcher';
import { config } from '../../constants';
import { email_to } from '../../constants/env';

const PublicProfile = ({ navigation, route }) => {
  const obj = [1, 2, 3, 4, 5];
  const refRBSheet = useRef();
  const refLangBSheet = useRef();
  const { login } = route?.params || {};
  const { state, dispatch, localizationContext } = useContext(Context);

  // const pkg = Constants.manifest.releaseChannel
  //   ? Constants.manifest.android.package
  //   : 'host.exp.exponent';

  const resetState = async () => {
    navigation.replace('socialLogin');
    dispatch({
      type: actionTypes.USER_DETAILS,
      payload: {},
    });
    await AsyncStorage.setItem('@userInfo', JSON.stringify({}));
  };

  // const openSettings = () => {
  //   if (Platform.OS === 'ios') {
  //     Linking.openURL('app-settings:');
  //   } else {
  //     IntentLauncher.startActivityAsync(
  //       IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
  //       { data: 'package:' + pkg },
  //     );
  //   }
  // };

  //user signout
  const handleSignOut = async () => {
    const { userInfo } = await getAsyncStorageValues();
    const accessToken = userInfo.accessToken;
    /* Log-Out */
    if (accessToken) {
      try {
        const auth = await Facebook.getAuthenticationCredentialAsync();
        if (auth) {
          Facebook.logOutAsync();
          resetState();
        } else {
          await Google.logOutAsync({ accessToken, ...config });
          resetState();
        }
      } catch {
        resetState();
      }
    }
  };

  const LangBottomSheetElement = [
    {
      element: localizationContext.t('english'),
      func: () => {
        localizationContext.setLocale('en');
        AsyncStorage.setItem('@lang', 'en-US');
        dispatch({
          type: actionTypes.CHANGE_LANGUAGE,
          payload: 'en-US',
        });
        dispatch({
          type: actionTypes.REFRESH_ANIMATION,
          payload: !state.refreshAnimation,
        });
      },
    },
    {
      element: localizationContext.t('french'),
      func: () => {
        localizationContext.setLocale('fr');
        AsyncStorage.setItem('@lang', 'fr-FR');
        dispatch({
          type: actionTypes.CHANGE_LANGUAGE,
          payload: 'fr-FR',
        });
        dispatch({
          type: actionTypes.REFRESH_ANIMATION,
          payload: !state.refreshAnimation,
        });
      },
    },
  ];

  const BottomSheetElement = [
    {
      element: localizationContext.t('modify_profile'),
      nav: 'personalDetails',
    },
    {
      element: localizationContext.t('your_tickets'),
      nav: 'YourTickets',
    },
    {
      element: localizationContext.t('bank_acc'),
    },
    {
      element: localizationContext.t('lang'),
      func: () => {
        setTimeout(() => {
          refLangBSheet.current.open();
        }, 500);
      },
    },
    {
      element: localizationContext.t('rate_app'),
      func: () => {
        if (Platform.OS === 'ios') {
          Linking.openURL(
            `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${1552612137}?action=write-review`,
          );
        }
        if (Platform.OS === 'android') {
          Linking.openURL(
            `https://play.google.com/store/apps/details?id=com.developerspourboir.pourboir&showAllReviews=true`,
          );
        }
      },
    },
    {
      element: localizationContext.t('contact_us'),
      func: () => {
        Linking.openURL(`mailto:${email_to}`);
      },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            width: '100%',
            height: 100,
            borderBottomLeftRadius: Dimensions.get('window').width * 0.06,
            borderBottomRightRadius: Dimensions.get('window').width * 0.06,
            overflow: 'hidden',
          }}
          source={require('../../assets/images/Group3.png')}
        >
          <GlobalHeader
            arrow={true}
            headingText={`@${state?.userDetails?.username}`}
            fontSize={17}
            color={'black'}
            navigation={navigation}
            Home={login ? 'true' : 'false'}
            backgroundColor={'transparent'}
            borderRadius={true}
            menu={true}
            menuBtn={() => refRBSheet.current.open()}
          />
        </ImageBackground>
      </View>
      <View style={{ flex: 7 }}>
        <View style={{ marginTop: 25 }}>
          {/* Section 1  */}
          <View style={styles.userDetails_container}>
            {state.userDetails.image ? (
              <Image
                source={{ uri: state?.userDetails?.image }}
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 280,
                }}
              />
            ) : (
              <Image
                source={{
                  uri:
                    'https://www.kindpng.com/picc/m/136-1369892_avatar-people-person-business-user-man-character-avatar.png',
                }}
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 280,
                  borderColor: '#FFE685',
                  borderWidth: 2,
                }}
              />
            )}
            <View style={{ marginTop: 10, width: '55%' }}>
              <Text style={styles.user_name}>
                {state?.userDetails?.name} {state?.userDetails?.last_name}
              </Text>
              <Text style={styles.clientTxt}>
                {localizationContext.t('client')}
              </Text>
              <View style={{ flexDirection: 'row', marginTop: 7 }}>
                {obj.map((v, i) => {
                  return (
                    <TouchableOpacity style={{ marginRight: 3 }} key={i}>
                      <RatingStar
                        starSize={20}
                        type={
                          v >= 0 ? 'filled' : v === 4 + 0.5 ? 'half' : 'empty'
                        }
                        notRatedStarColor="#f1f1f1"
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text style={styles.few_word_text}>
                {state?.userDetails?.description}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'space-around',
                  marginTop: 15,
                  // marginHorizontal: -3,
                }}
              >
                <View>
                  <Text style={styles.subscribeNumber}>1</Text>
                  <Text style={styles.subscribeTxt}>
                    {localizationContext.t('subs')}
                  </Text>
                </View>
                <TouchableOpacity activeOpacity={0.5} style={styles.btn_follow}>
                  <Text style={styles.text_follow}>
                    {localizationContext.t('follow')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Section 2  */}
          <View style={{ marginTop: 25, marginHorizontal: 16, width: '90%' }}>
            <View>
              <TouchableOpacity style={styles.publications_btn}>
                <FontAwesome name="send" size={18} color={Colors.yellow} />
                <Text style={[styles.publication_text]}>
                  {localizationContext.t('pub')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 25, flexDirection: 'row' }}>
              <View>
                <Image
                  style={{ width: 65, height: 65, resizeMode: 'contain' }}
                  source={require('../../assets/images/ads.png')}
                />
              </View>
              <View style={{ width: '83%', marginLeft: 5 }}>
                <Text
                  style={[
                    styles.publication_text,
                    { fontFamily: 'ProximaNovaSemiBold' },
                  ]}
                >
                  {localizationContext.t('no_pub')}
                </Text>
                <Text style={[styles.publication_text, { marginTop: 5 }]}>
                  {localizationContext.t('no_pub_yet')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* Bottom SHeet  */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={500}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.6)',
          },
          draggableIcon: {
            backgroundColor: '#D8D8D8',
          },
        }}
      >
        <View style={{ marginHorizontal: 24, marginTop: 15 }}>
          {BottomSheetElement.map((v, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  v.nav ? navigation.navigate(v.nav) : v.func && v.func();
                  // setTimeout(() => {
                  refRBSheet.current.close();
                  // }, 1000);
                }}
                activeOpacity={0.3}
                style={styles.sheet_elements}
              >
                <Text style={styles.sheetTxt}>{v.element}</Text>
                <AntDesign
                  name="right"
                  size={Platform.OS == 'ios' ? 20 : 18}
                  color="#485460"
                />
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={handleSignOut}
          style={{ ...styles.signOutBtn, color: '#2F3676' }}
        >
          <Text style={{ ...styles.sheetTxt, textAlign: 'center' }}>
            {localizationContext.t('sign_out')}
          </Text>
        </TouchableOpacity>
      </RBSheet>

      <RBSheet
        ref={refLangBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        closeOnPressBack={true}
        height={150}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.6)',
          },
          draggableIcon: {
            backgroundColor: '#D8D8D8',
          },
        }}
      >
        <View style={{ marginHorizontal: 24, marginTop: 15 }}>
          {LangBottomSheetElement.map((v, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  v.nav ? navigation.navigate(v.nav) : v.func && v.func();
                  refLangBSheet.current.close();
                }}
                activeOpacity={0.3}
                style={styles.sheet_elements}
              >
                <Text style={styles.sheetTxt}>{v.element}</Text>
                <AntDesign
                  name="right"
                  size={Platform.OS == 'ios' ? 20 : 18}
                  color="#485460"
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </RBSheet>
    </View>
  );
};

export default PublicProfile;
