import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Platform,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
const imgWaiter = require('../../assets/images/Version-control-pana.png');
const imgBg = require('../../assets/images/Group7.png');
import i18n from '../../li8n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-check-box';

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
}) => {
  const validation = termsChecked && cellPhone && siretNumber;

  const Claim = () => {
    setApprovalModal(false);
    setReceivedModal(true);
    console.log(approvalModal);
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
        style={{
          width: '100%',
        }}
      >
        <KeyboardAvoidingView
          // style={ keyboardVisible && { marginBottom: -190 }}
          keyboardVerticalOffset={
            Dimensions.get('window').height <= 645 ? 10 : 25
          }
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
    
        <View style={{marginHorizontal:10}}>
          <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNovaBold' }]}>
            {i18n.t('fill_info')}
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
            {i18n.t('thanks_filling')}
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
                placeholder={i18n.t('siret_num')}
                keyboardType={'numeric'}
                placeholderTextColor={'#707375'}
              />
            </View>
            <View
              style={
                (styles.input_box, { alignItems: 'center', marginTop: 15 })
              }
            >
              <TextInput
                style={styles.inputsTopTow}
                onChangeText={e => setCellPhone(e)}
                keyboardType={'numeric'}
                value={cellPhone}
                placeholder={i18n.t('cellPhone')}
                placeholderTextColor={'#707375'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 30,
                marginBottom: 10,
                // alignSelf:'center',
                // marginHorizontal:50
              }}
            >
              <View>
                <CheckBox
                  style={{
                    zIndex: 9999,
                    marginTop: Platform.OS === 'ios' ? -14 : -13,
                  }}
                  onClick={() => setTermsChecked(!termsChecked)}
                  isChecked={termsChecked}
                  checkedImage={
                    <Image
                      style={{ width: 18, height: 18, marginTop: -4 }}
                      resizeMode={'contain'}
                      source={require('../../assets/images/checked.png')}
                    />
                  }
                  unCheckedImage={
                    <Image
                      style={{ width: 15, height: 15 }}
                      resizeMode={'contain'}
                      source={require('../../assets/images/unchecked.png')}
                    />
                  }
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 2,
                  paddingTop: 1,
                  marginTop: -15,
                  justifyContent: 'center',
                }}
              >
                <Text
                  // onPress={() =>alert('clicked')}
                  style={{
                    fontSize: 12,
                    color: '#000',
                    fontFamily: 'ProximaNova',
                    flexDirection: 'row',
                  }}
                >
                  {' '}
                  {i18n.t('i_accepts')}{' '}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#0050A0',
                      fontSize: 12,
                      fontFamily: 'ProximaNova',
                    }}
                  >
                    {i18n.t('term_cond')}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <View
            style={{
              // marginHorizontal: 10,
              // alignItems: 'center',
              flexDirection:'row',
              // justifyContent:'center'
            }}
            activeOpacity={0.5}
          >
              
            <TouchableOpacity>

              
                          </TouchableOpacity>

          </View> */}
            </View>
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
              {i18n.t('claim')}
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
    width: '100%',
    // paddingLeft: 10,
    // paddingRight: 10,
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
    width: '100%',
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
    // paddingVertical: 13,
    // paddingHorizontal: 10,
    alignItems: 'center',
    //  marginTop:40
  },
});
