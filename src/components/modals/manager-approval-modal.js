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
  ScrollView,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
const imgWaiter = require('../../assets/images/Version-control-pana.png');
const imgBg = require('../../assets/images/Group7.png');
import i18n from '../../li8n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import uuid from 'react-native-uuid';
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

      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={true}
        extraScrollHeight={10}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollToOverflowEnabled={true}
        enableAutomaticScroll={Platform.OS === 'ios' ? true : false}
        resetScrollToCoords={{ x: 0, y: 0 }}
        style={{ marginTop: 20 }}
      >
        <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNovaBold' }]}>
          {/* {i18n.t('new_categ')} */}
          Fill in the information
        </Text>
        <Text
          style={{
            fontFamily: 'ProximaNova',
            fontSize: 14,
            color: Colors.fontDark,
            textAlign: 'center',
            paddingTop: 10,
            paddingHorizontal: 25,
          }}
        >
          {/* {i18n.t('choose_categ')} */}
          We must verify that you are the owner of the establishment. Thanks for
          filling in the information.
        </Text>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
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
              placeholder="SIRET Number"
              keyboardType={'numeric'}
              placeholderTextColor={'#707375'}
            />
          </View>
          <View
            style={(styles.input_box, { alignItems: 'center', marginTop: 15 })}
          >
            <TextInput
              style={styles.inputsTopTow}
              onChangeText={e => setCellPhone(e)}
              value={cellPhone}
              placeholder="Cellphone number"
              placeholderTextColor={'#707375'}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 9,
            marginBottom: 14,
            justifyContent: 'center',
          }}
        >
          <View style={{ paddingTop: 0 }}>
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
          </View>
          <View
            style={{
              marginHorizontal: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            activeOpacity={0.5}
          >
            <Text
              style={{
                fontSize: Platform.OS == 'ios' ? 13 : 13,
                color: '#000',
                fontFamily: 'ProximaNova',
              }}
            >
              I accept the profesional{' '}
              <Text
                style={{ color: '#0050A0' }}
              >{`terms and \nconditions.`}</Text>
            </Text>
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
            {/* {i18n.t('confirm')} */}
            Claim Business
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </Overlay>
  );
};

export default ManagerApprovalModal;

const styles = StyleSheet.create({
  inputsTopTow: {
    borderColor: '#E3E3E3',
    borderWidth: 1,
    width: 270,
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
    width: 270,
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
    fontSize: 15,
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
