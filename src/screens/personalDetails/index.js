import React, { useState, useContext } from 'react';
import { StatusBar } from 'react-native';
import { ImageBackground } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Image } from 'react-native';
import { Text, View } from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import GlobalHeader from '../../components/GlobalHeader';
import { Colors } from '../../constants/Theme';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import Context from '../../contextApi/context';
import * as actionTypes from '../../contextApi/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { getAsyncStorageValues } from '../../constants';
import { UPDATE_PICTURE } from '../../queries';
import { useMutation } from 'react-query';
import i18n from '../../li8n';

const PersonalDetails = ({ navigation }) => {
  const [text, onChangeText] = React.useState();
  const [text2, onChangeText2] = React.useState();
  const [text3, onChangeText3] = React.useState();
  const [text4, onChangeText4] = React.useState();
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(Context);
  const [image, setImage] = useState();
  const [updatePicture] = useMutation(UPDATE_PICTURE);

  const handleChangePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);

      const { userInfo } = await getAsyncStorageValues();
      dispatch({
        type: actionTypes.USER_DETAILS,
        payload: {
          ...state.userDetails,
          image: result.uri,
        },
      });

      await AsyncStorage.setItem(
        '@userInfo',
        JSON.stringify({
          ...userInfo,
          image: result.uri,
        }),
      );

      let formData = new FormData();
      formData.append('image', {
        uri: result.uri,
        type: `image/${result.uri.split('.')[1]}`,
        name: result.uri.substr(result.uri.lastIndexOf('/') + 1),
      });

      let UploadData = {
        user_id: state.userDetails.user_id,
        image: formData,
      };

      await updatePicture(UploadData, {
        onSuccess: res => {},
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        bounces={false}
        scrollEnabled={true}
        style={{
          width: '100%',
        }}
      >
        <StatusBar translucent={true} style="light" />
        <ImageBackground
          style={{
            width: '100%',
            height: 100,
          }}
          source={require('../../assets/images/Group3.png')}
        >
          <GlobalHeader
            arrow={true}
            headingText={i18n.t('your_personal_details')}
            fontSize={17}
            color={'black'}
            navigation={navigation}
            setting={false}
            backgroundColor={'transparent'}
            borderRadius={true}
          />
        </ImageBackground>

        <View>
          <View style={styles.avatar}>
            {/* <TouchableOpacity style={styles.viewImg}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 80,
                    }}
                    source={{
                      uri:
                        'https://www.kindpng.com/picc/m/136-1369892_avatar-people-person-business-user-man-character-avatar.png',
                    }}
                  />
                </TouchableOpacity> */}
            <TouchableOpacity
              // onPress={() => navigation.navigate('personalDetails')}
              onPress={handleChangePicture}
              style={styles.viewImg}
              activeOpacity={0.6}
            >
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
              onPress={handleChangePicture}
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
          </View>

          <View style={{ marginHorizontal: 30, alignItems: 'center' }}>
            <Text style={styles.heading1}> {i18n.t('personal_info')}</Text>
            <View style={{ alignItems: 'flex-start', marginBottom: 10 }}>
              <Text
                style={{ color: '#1E272E', opacity: 0.7, paddingBottom: 5 }}
              >
                {i18n.t('first_name')}
              </Text>
              <TextInput
                style={styles.inputsTopTow}
                onChangeText={onChangeText}
                value={text}
                placeholder="Christine"
              />
            </View>
            <View style={{ alignItems: 'flex-start', marginBottom: 10 }}>
              <Text
                style={{ color: '#1E272E', opacity: 0.7, paddingBottom: 5 }}
              >
                {i18n.t('last_name')}
              </Text>
              <TextInput
                style={styles.inputsTopTow}
                onChangeText={onChangeText2}
                value={text2}
                placeholder="Zhou"
              />
            </View>
            <View style={{ alignItems: 'flex-start', marginBottom: 10 }}>
              <Text
                style={{ color: '#1E272E', opacity: 0.7, paddingBottom: 5 }}
              >
                {i18n.t('phone_num')}
              </Text>
              <View style={styles.inputsBottomTwo}>
                <TextInput
                  onChangeText={onChangeText3}
                  value={text3}
                  placeholder="+33 6 88 88 88"
                  keyboardType="number-pad"
                  style={{ width: '60%' }}
                />
                <Text
                  style={{
                    color: '#E02020',
                    width: '40%',
                    fontSize: 13,
                    textAlign: 'right',
                  }}
                >
                  {i18n.t('not_verified')}
                </Text>
              </View>
            </View>

            <View style={{ alignItems: 'flex-start', marginBottom: 10 }}>
              <Text
                style={{ color: '#1E272E', opacity: 0.7, paddingBottom: 5 }}
              >
                Email
              </Text>
              <View style={styles.inputsBottomTwo}>
                <TextInput
                  onChangeText={onChangeText4}
                  value={text4}
                  placeholder="christine@zhou.com"
                  keyboardType="email-address"
                  style={{ width: '70%' }}
                />
                <Text
                  style={{
                    color: '#6DD400',
                    width: '30%',
                    fontSize: 13,
                    textAlign: 'right',
                  }}
                >
                  {i18n.t('checked')}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <View>
              <Text style={styles.heading1}>{i18n.t('payment_methods')}</Text>
            </View>

            <View style={styles.payment_container}>
              <TouchableOpacity
                onPress={() => navigation.navigate('paypalPayment')}
                activeOpacity={0.6}
                style={styles.payments}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#FFF6D4', padding: 3 }}>
                    <Image
                      source={require('../../assets/images/paypal.png')}
                      style={{ width: 23, height: 23, resizeMode: 'cover' }}
                    />
                  </View>
                  <Text style={{ paddingLeft: 10, fontSize: 15 }}>Paypal</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <AntDesign name="right" size={20} color="lightgray" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('applePayment')}
                activeOpacity={0.6}
                style={styles.payments}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#FFF6D4', padding: 3 }}>
                    <Image
                      source={require('../../assets/images/apple.png')}
                      style={{ width: 24, height: 24, resizeMode: 'contain' }}
                    />
                  </View>
                  <Text style={{ paddingLeft: 10, fontSize: 15 }}>
                    Apple Pay
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <AntDesign name="right" size={20} color="lightgray" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('masterCard')}
                activeOpacity={0.6}
                style={styles.payments}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#FFF6D4', padding: 3 }}>
                    <Image
                      source={require('../../assets/images/card.png')}
                      style={{ width: 25, height: 25, resizeMode: 'cover' }}
                    />
                  </View>
                  <Text style={{ paddingLeft: 10, fontSize: 15 }}>***8888</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <AntDesign name="right" size={20} color="lightgray" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('addMap')}
                activeOpacity={0.6}
                style={styles.lastpayment}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ backgroundColor: '#FFF6D4', padding: 3 }}>
                    <AntDesign name="plus" size={21} color="black" />
                  </View>
                  <Text style={{ paddingLeft: 10, fontSize: 14 }}>
                    {i18n.t('add_pay_method')}
                  </Text>
                </View>
                <View>
                  <AntDesign name="right" size={20} color="lightgray" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PersonalDetails;
