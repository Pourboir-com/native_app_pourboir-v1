import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import GlobalHeader from '../../components/GlobalHeader';
import { Colors } from '../../constants/Theme';
import * as ImagePicker from 'expo-image-picker';
import { getAsyncStorageValues } from '../../constants';
import * as Google from 'expo-google-app-auth';
import { config } from '../../constants';
import i18n from '../../li8n';
import Context from '../../contextApi/context';
import * as actionTypes from '../../contextApi/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const imgBg = require('../../assets/images/Group5.png');

const Setting = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Context);
  const [image, setImage] = useState();

  // useEffect(() => {
  //   setuserName(state.userDetails.name);
  //   setImage(state.userDetails.image);
  // }, [state]);

  const handleGoogleSignOut = async () => {
    const { userInfo } = await getAsyncStorageValues();
    const accessToken = userInfo.accessToken;
    /* Log-Out */
    if (accessToken) {
      setLoading(true);
      await Google.logOutAsync({ accessToken, ...config });
      navigation.replace('socialLogin');
      let userDetails = {
        name: '',
        image: '',
        email: '',
        accessToken: '',
        user_id: '',
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
    }
  };

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor={Colors.yellow} /> */}

      <View style={styles.viewProfile}>
        <ImageBackground
          style={{
            width: '100%',
            height: Dimensions.get('window').height * 0.6,
          }}
          source={imgBg}
          resizeMode="stretch"
        >
          <GlobalHeader
            arrow={true}
            headingText={i18n.t('setting')}
            fontSize={17}
            color="#000"
            backgroundColor={'transparent'}
            navigation={navigation}
          />

          <TouchableOpacity onPress={() => _pickImage()} style={styles.viewImg}>
            {state.userDetails.image === null ||
            state.userDetails.image === undefined ||
            state.userDetails.image === '' ? (
              // <FontAwesome name="user-circle-o" size={110} color="#fff" />
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 60,
                  }}
                  source={{
                    uri:
                    'https://www.kindpng.com/picc/m/136-1369892_avatar-people-person-business-user-man-character-avatar.png',
                  }}
                />
              ) : (
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 60,
                  }}
                  source={{ uri: image ? image : state.userDetails.image }}
                  resizeMode="cover"
                />
              )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => _pickImage()}
            style={styles.btnPencil}
          >
            <View style={styles.viewPencil}>
              <MaterialCommunityIcons
                name="pencil-outline"
                color="#fff"
                size={15}
              />
            </View>
          </TouchableOpacity>
          {/* <View style={styles.viewImg}>
              <FontAwesome name="user-circle-o" size={120} color="#fff" />
            </View> */}
          <Text style={[styles.txtName, { fontFamily: 'ProximaNovaBold' }]}>
            {state.userDetails.name === '' ? 'Bonjour' : state.userDetails.name}
          </Text>
        </ImageBackground>
      </View>
      <View style={styles.viewBtnConatiner}>
        <ScrollView
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.viewItem}>
            <View style={styles.viewIcon}>
              <FontAwesome name="star" size={20} color={Colors.yellow} />
            </View>
            <Text
              style={{
                fontFamily: 'ProximaNova',
                color: Colors.fontDark,
                fontSize: 16,
              }}
            >
              {i18n.t('rate_application')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewItem}>
            <View style={styles.viewIcon}>
              <FontAwesome name="envelope" size={16} color={Colors.yellow} />
            </View>
            <Text
              style={{
                fontFamily: 'ProximaNova',
                color: Colors.fontDark,
                fontSize: 16,
              }}
            >
              {i18n.t('contact_us')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Remove', {
                crossIcon: true,
              })
            }
            style={[styles.viewItem, { marginBottom: 0 }]}
          >
            <View style={styles.viewIcon}>
              <FontAwesome name="cutlery" size={16} color={Colors.yellow} />
            </View>
            <Text
              style={{
                fontFamily: 'ProximaNova',
                color: Colors.fontDark,
                fontSize: 16,
              }}
            >
              {i18n.t('are_you_waiter')}
            </Text>

            <View
              style={{
                flex: 1,
                flexDirection: 'row-reverse',
              }}
            >
              <View style={[styles.viewIcon2]}>
                <FontAwesome name="angle-right" size={26} color={'grey'} />
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View>
        <Text style={[styles.versionText, { fontFamily: 'ProximaNova' }]}>
          Version 2.17.4.0.1.0
        </Text>
      </View>
      <TouchableOpacity
        disabled={loading}
        onPress={handleGoogleSignOut}
        style={styles.btnValider}
      >
        {loading ? (
          <ActivityIndicator size={40} color='#000' />
        ) : (
          <Text style={{ fontFamily: 'ProximaNova', fontSize: 16 }}>
            {i18n.t('sign_out')}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:"center",
    alignItems: 'center',
    backgroundColor: '#EEF0EF',
  },
  versionText: {
    marginTop: 20,
    color: Colors.fontLight,
    fontSize: 12,
  },
  viewPencil: {
    width: 25,
    height: 25,
    backgroundColor: '#1E272E',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPencil: {
    backgroundColor: '#FCDF6F',
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: -70,
    marginTop: -30,
  },
  viewIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#FFF6D4',
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
    width: '90%',
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: -45,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  viewItem: {
    width: '100%',
    height: 55,
    backgroundColor: '#fff',
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  btnValider: {
    backgroundColor: Colors.yellow,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    marginTop: 3,
    position: 'absolute',
    bottom: 10,
  },
  txtName: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 24,
    color: Colors.fontDark,
  },
  viewImg: {
    width: 120,
    height: 120,
    borderRadius: 80,
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
    height: Dimensions.get('window').height * 0.6,
    // marginTop: -20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
});
