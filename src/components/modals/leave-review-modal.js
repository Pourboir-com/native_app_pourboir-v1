import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  // Keyboard,
  TextInput,
  Dimensions,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
import i18n from '../../li8n';
const imgWaiter = require('../../assets/images/sittingtable.png');
const imgBg = require('../../assets/images/Group7.png');
const validator = require('validator');
import { FontAwesome5 } from '@expo/vector-icons';
import Modal from "react-native-modal";

const LeaveReviewModal = ({
  leaveRevModal,
  setLeaveRevModal
}) => {
  
  return (
      <>

<Modal isVisible={leaveRevModal}>
        <View style={{ flex: 1 }}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
    </>
  );
};

export default LeaveReviewModal;

const styles = StyleSheet.create({
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
    height: 220,
  },
  txtBtnConfrm: {
    fontSize: 16,
    color: Colors.fontDark,
  },
  btnConfrm: {
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '7%',
    height: 45,
  },
  txtName: {
    fontSize: 18,
    color: Colors.fontDark,
    marginTop: 15,
    marginBottom: 3,
    textAlign: 'center',
    maxWidth: '80%',
  },
  imgStyle: {
    width: 240,
    height: 200,
    alignSelf: 'center',
  },
  viewImg: {
    width: '100%',
    height: 240,
  },
  inputStyle: {
    height: 50,
    width: '80%',
    borderColor: '#e6e6e6',
    borderRadius: 9,
    borderWidth: 1.3,
    marginTop: 12,
    fontSize: 18,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
