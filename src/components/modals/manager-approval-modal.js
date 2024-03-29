import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Platform,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
const imgWaiter = require('../../assets/images/Version-control-pana.png');
const imgBg = require('../../assets/images/Group7.png');
import CheckBox from 'react-native-check-box';
import RPCountryPickerInfo from 'react-native-country-picker-info';
import * as WebBrowser from 'expo-web-browser';
import Context from '../../contextApi/context';

const ManagerApprovalModal = ({
  termsChecked,
  setTermsChecked,
  cellPhone,
  setCellPhone,
  siretNumber,
  setSiretNumber,
  approvalModal,
  setApprovalModal,
  setReceivedModal,
  submitApproval,
  loading,
  countryCode,
  setCountryCode,
}) => {
  const validation = termsChecked && cellPhone && siretNumber;
  const [isOpenCountryPicker, setIsOpenCountryPicker] = useState(false);
  const { localizationContext } = useContext(Context);

  const onPressOpenPicker = () => {
    setIsOpenCountryPicker(!isOpenCountryPicker);
  };

  const onPressCountryItem = countryInfo => {
    setCountryCode(countryInfo.dial_code);
    setIsOpenCountryPicker(false);
  };

  const Claim = () => {
    setApprovalModal(false);
    setReceivedModal(true);
  };

  return (
    <Overlay
      overlayStyle={styles.container}
      isVisible={approvalModal}
      onBackdropPress={() => setApprovalModal(false)}
    >
      <ScrollView
        // ref={scrollRef}
        keyboardShouldPersistTaps={'handled'}
        bounces={false}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        style={{
          width: '100%',
        }}
      >
        <KeyboardAvoidingView
          // style={ keyboardVisible && { marginBottom: -190 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 35}
          behavior="position"
          enabled
        >
          <ImageBackground
            style={styles.imgBgStyle}
            source={imgBg}
            resizeMode="stretch"
          >
            <View style={styles.viewImg}>
              <TouchableOpacity
                onPress={() => setApprovalModal(false)}
                style={{ alignSelf: 'flex-end', margin: 10 }}
              >
                <AntDesign name="close" size={29} color="#485460" />
              </TouchableOpacity>
              <View
                style={{
                  width: 140,
                  height: 130,
                  alignSelf: 'center',
                  marginBottom: -70,
                  bottom: -20,
                }}
              />
              <Image
                source={imgWaiter}
                style={styles.imgStyle}
                resizeMode="contain"
              />
            </View>
          </ImageBackground>

          <View style={{ marginHorizontal: 10 }}>
            <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNovaBold' }]}>
              {localizationContext.t('fill_info')}
            </Text>
            <Text
              style={{
                fontFamily: 'ProximaNova',
                fontSize: 16,
                color: Colors.fontDark,
                textAlign: 'center',
                paddingTop: 10,
                paddingHorizontal: 15,
              }}
            >
              {localizationContext.t('thanks_filling')}
            </Text>

            <View
              style={{
                flexDirection: 'column',
                // justifyContent: 'center',
                // alignItems: 'center',
                // width: 270,
                marginVertical: 15,
                marginTop: 35,
              }}
            >
              <View style={(styles.input_box, { alignItems: 'center' })}>
                <TextInput
                  style={styles.inputsTopTow}
                  onChangeText={e => setSiretNumber(e)}
                  value={siretNumber}
                  placeholder={localizationContext.t('siret_num')}
                  keyboardType={'numeric'}
                  placeholderTextColor={'#707375'}
                />
              </View>
              <View
                style={[
                  styles.inputsTopTow,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 15,
                    overflow: 'hidden',
                  },
                ]}
              >
                <RPCountryPickerInfo
                  isVisible={isOpenCountryPicker}
                  isVisibleCancelButton={false}
                  onPressClosePicker={onPressOpenPicker}
                  onPressSelect={onPressCountryItem}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={onPressOpenPicker}>
                    <Text style={{ marginRight: 3, fontSize: 15 }}>
                      {countryCode}
                    </Text>
                  </TouchableOpacity>
                  <TextInput
                    style={{ fontSize: 16 }}
                    onChangeText={e => setCellPhone(e)}
                    keyboardType={'numeric'}
                    value={cellPhone}
                    placeholder={localizationContext.t('cellPhone')}
                    placeholderTextColor={'#707375'}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
                height: 30,
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
                      marginLeft: 5,
                    }}
                    onPress={() => setTermsChecked(!termsChecked)}
                  >
                    {localizationContext.t('i_accepts')}{' '}
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
                      {localizationContext.t('term_cond')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={submitApproval}
              disabled={validation ? false : true}
              style={[
                styles.btn_yellow,
                validation && {
                  backgroundColor: Colors.yellow,
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: 'ProximaNova',
                  fontSize: 14,
                  color: Colors.fontDark,
                }}
              >
                {loading ? (
                  <ActivityIndicator size={25} color="#EBC11B" />
                ) : (
                  localizationContext.t('claim')
                )}
              </Text>
            </TouchableOpacity>
          </View>
          {/* </KeyboardAwareScrollView> */}
        </KeyboardAvoidingView>
      </ScrollView>
    </Overlay>
  );
};

export default ManagerApprovalModal;

const styles = StyleSheet.create({
  inputsTopTow: {
    borderColor: '#E3E3E3',
    borderWidth: 1,
    width: '88%',
    alignSelf: 'center',
    height: 48,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontFamily: 'ProximaNova',
    fontSize: 16,
    textAlign: 'center',
  },
  inputLabel: {
    color: 'black',
    opacity: 0.8,
    paddingBottom: 2.7,
    fontSize: 16,
    fontFamily: 'ProximaNovaBold',
  },
  input_box: {
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  btn_yellow: {
    backgroundColor: '#EAEAEA',
    width: '88%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    borderRadius: 8,
    marginBottom: Platform.OS === 'ios' ? 25 : 15,
    alignSelf: 'center',
  },
  container: {
    width: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    overflow: 'hidden',
    borderRadius: 15,
  },
  imgBgStyle: {
    width: '100%',
    height: 225,
  },
  txtConfrm: {
    fontSize: 16,
    color: Colors.fontDark,
    marginTop: 18,
    textAlign: 'center',
  },
  imgStyle: {
    width: 210,
    height: 200,
    alignSelf: 'center',
    marginTop: -52,
  },
  viewImg: {
    width: '100%',
    height: 240,
  },
  btnInput: {
    borderColor: '#E3E3E3',
    borderRadius: 10,
    borderWidth: 1,
    width: 270,
    height: 48,
    alignItems: 'center',
  },
});
