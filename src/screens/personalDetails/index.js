import React, { useState, useContext } from 'react';
import { ImageBackground } from 'react-native';
import {
  Text,
  View,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import GlobalHeader from '../../components/GlobalHeader';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import Context from '../../contextApi/context';
import * as actionTypes from '../../contextApi/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { getAsyncStorageValues } from '../../constants';
import { UPDATE_PICTURE, EDIT_USER } from '../../queries';
import { useMutation } from 'react-query';
import i18n from '../../li8n';
import CommonButton from '../../components/common-button';

const PersonalDetails = ({ navigation }) => {
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : -450;
  const { state, dispatch } = useContext(Context);

  //States
  const [FirstName, setFirstName] = useState(state?.userDetails?.name || '');
  const [LastName, setLastName] = useState(state?.userDetails?.last_name || '');
  const [email, setEmail] = useState(state?.userDetails?.email);
  const [phone, setPhone] = useState(state?.userDetails?.phone_number);
  const [image, setImage] = useState(state.userDetails.image);
  const [username, setUsername] = useState(state?.userDetails?.username);
  const [about, setAbout] = useState(state?.userDetails?.description);
  const [loading, setLoading] = useState();
  //Mutation
  const [updatePicture] = useMutation(UPDATE_PICTURE);
  const [editUser] = useMutation(EDIT_USER);
  const validate = FirstName && LastName && email && username && phone;

  const handleChangePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleEditProfile = async () => {
    if (state?.userDetails?.user_id) {
      setLoading(true);
      let userDetails = {
        ...state.userDetails,
        name: FirstName || '',
        last_name: LastName || '',
        email: email || '',
        phone_number: phone || '',
        username: username || '',
        description: about || '',
        image: image || '',
      };
      let editProfile = {
        id: state.userDetails.user_id,
        first_name: FirstName || '',
        last_name: LastName || '',
        phone_number: phone || '',
        email: email || '',
        username: username || '',
        description: about || '',
      };
      let formData = new FormData();
      formData.append('image', {
        uri: image,
        type: `image/${image.split('.')[1]}`,
        name: image.substr(image.lastIndexOf('/') + 1),
      });
      let UploadData = {
        user_id: state.userDetails.user_id,
        image: formData,
      };

      await updatePicture(UploadData, {});
      await editUser(editProfile, {});

      dispatch({
        type: actionTypes.USER_DETAILS,
        payload: { ...state.userDetails, ...userDetails },
      });
      const { userInfo } = await getAsyncStorageValues();
      await AsyncStorage.setItem(
        '@userInfo',
        JSON.stringify({
          ...userInfo,
          ...userDetails,
        }),
      );
      await AsyncStorage.setItem(
        '@profileInfo',
        JSON.stringify({
          info: true,
        }),
      );
      setLoading(false);
      alert('Your profile has been updated.');
      navigation.replace('Setting', { login: true });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: -1 }}>
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
            headingText={i18n.t('your_personal_details')}
            fontSize={17}
            color={'black'}
            navigation={navigation}
            setting
            backgroundColor={'transparent'}
            borderRadius={true}
          />
        </ImageBackground>
      </View>

      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        bounces={false}
        scrollEnabled={true}
        style={{
          width: '100%',
          flex: 11,
        }}
      >
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <View>
            <View style={styles.avatar}>
              <TouchableOpacity
                onPress={handleChangePicture}
                style={styles.viewImg}
                activeOpacity={0.6}
              >
                {image === null || image === undefined || image === '' ? (
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
                    source={{ uri: image }}
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
              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>{i18n.t('first_name')}</Text>
                <TextInput
                  style={styles.inputsTopTow}
                  onChangeText={setFirstName}
                  value={FirstName}
                  placeholder="Christine"
                  placeholderTextColor={'#485460'}
                />
              </View>
              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>{i18n.t('last_name')}</Text>
                <TextInput
                  style={styles.inputsTopTow}
                  onChangeText={setLastName}
                  value={LastName}
                  placeholder="Zhou"
                  placeholderTextColor={'#485460'}
                />
              </View>
              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>{i18n.t('phone_num')}</Text>
                <View style={styles.inputsTopTow}>
                  <TextInput
                    onChangeText={setPhone}
                    value={phone}
                    placeholder="+33 6 88 88 88"
                    keyboardType="number-pad"
                    style={{ width: '100%' }}
                    placeholderTextColor={'#485460'}
                  />
                  {/* <Text
                  style={{
                    color: '#E02020',
                    width: '40%',
                    fontSize: 13,
                    textAlign: 'right',
                    fontFamily: 'ProximaNova',
                  }}
                >
                  {i18n.t('not_verified')}
                </Text> */}
                </View>
              </View>

              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>E-mail</Text>
                <View style={styles.inputsTopTow}>
                  <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder="christine@zhou.com"
                    keyboardType="email-address"
                    style={{ width: '70%' }}
                    placeholderTextColor={'#485460'}
                  />
                  {/* <Text
                  style={{
                    color: '#6DD400',
                    width: '30%',
                    fontSize: 13,
                    textAlign: 'right',
                    fontFamily: 'ProximaNova',
                  }}
                >
                  {i18n.t('checked')}
                </Text> */}
                </View>
              </View>
              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>{i18n.t('username')}</Text>
                <TextInput
                  style={styles.inputsTopTow}
                  onChangeText={e => setUsername(e)}
                  value={username}
                  placeholder="@christine_zhou"
                  placeholderTextColor={'#485460'}
                />
              </View>
              <View style={styles.input_box}>
                <Text style={styles.inputLabel}>{i18n.t('about_me')}</Text>
                <TextInput
                  style={{ ...styles.inputsTopTow, paddingBottom: 50 }}
                  onChangeText={e => setAbout(e)}
                  multiline={true}
                  value={about}
                  placeholder={i18n.t('describe')}
                  placeholderTextColor={'#485460'}
                />
              </View>
            </View>

            {/* <View style={{ alignItems: 'center', marginBottom: 40 }}> */}
            {/* <View>
              <Text style={styles.heading1}>{i18n.t('payment_methods')}</Text>
            </View> */}

            {/* <View style={styles.payment_container}>
              <TouchableOpacity
                onPress={() => navigation.navigate('paypalPayment')}
                activeOpacity={0.6}
                style={styles.payments}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={styles.paymentMethodImage}>
                    <Image
                      source={require('../../assets/images/paypal.png')}
                      style={{ width: 23, height: 23, resizeMode: 'contain' }}
                    />
                  </View>
                  <Text style={styles.paymentMethodLabel}>Paypal</Text>
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
                  <View style={styles.paymentMethodImage}>
                    <Image
                      source={require('../../assets/images/apple.png')}
                      style={{ width: 24, height: 24, resizeMode: 'contain' }}
                    />
                  </View>
                  <Text style={styles.paymentMethodLabel}>Apple Pay</Text>
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
                  <View style={styles.paymentMethodImage}>
                    <Image
                      source={require('../../assets/images/card.png')}
                      style={{ width: 25, height: 25, resizeMode: 'contain' }}
                    />
                  </View>
                  <Text style={styles.paymentMethodLabel}>***8888</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <AntDesign name="right" size={20} color="lightgray" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('addCard')}
                activeOpacity={0.6}
                style={styles.lastpayment}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={styles.paymentMethodImage}>
                    <AntDesign name="plus" size={21} color="black" />
                  </View>
                  <Text style={styles.paymentMethodLabel}>
                    {i18n.t('add_pay_method')}
                  </Text>
                </View>
                <View>
                  <AntDesign name="right" size={20} color="lightgray" />
                </View>
              </TouchableOpacity>
            </View> */}
            {/* </View> */}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View
        style={{
          marginHorizontal: '4%',
          marginBottom: Platform.OS === 'ios' ? 25 : 15,
          backgroundColor: 'transparent',
        }}
      >
        <CommonButton
          dispatch={handleEditProfile}
          loading={loading}
          title={i18n.t('confirm')}
          validate={validate}
          conditional
        />
      </View>
    </View>
  );
};

export default PersonalDetails;
