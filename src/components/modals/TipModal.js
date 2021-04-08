import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
const imgWaiter = require('../../assets/images/payment.png');
const imgBg = require('../../assets/images/Group7.png');
import i18n from '../../li8n';

const TipModal = ({ isVisible, handleModalClose }) => {
  return (
    <Overlay
      overlayStyle={styles.container}
      isVisible={isVisible}
      onBackdropPress={handleModalClose}
    >
      <ImageBackground
        style={styles.imgBgStyle}
        source={imgBg}
        resizeMode="stretch"
      >
        <View style={styles.viewImg}>
          <TouchableOpacity
            onPress={handleModalClose}
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

      <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNovaBold' }]}>
        {i18n.t('pay_your_tip')}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '90%',
          marginVertical: 15,
        }}
      >
        <TouchableOpacity style={styles.btnTipModal} activeOpacity={0.5}>
          <Text style={styles.txtTipModal}>{i18n.t('cash')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTipModal} activeOpacity={0.5}>
          <Text style={styles.txtTipModal}>{i18n.t('digital')}</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};

export default TipModal;

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
    height: 240,
    // overflow:"hidden"
  },
  txtBtnConfrm: {
    fontSize: 16,
    color: Colors.fontDark,
  },
  btnConfrm: {
    backgroundColor: Colors.yellow,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
    height: 45,
  },
  txtConfrm: {
    fontSize: 24,
    color: Colors.fontDark,
    marginTop: 18,
    textAlign: 'center',
  },
  txtName: {
    fontSize: 16,
    color: Colors.fontLight,
    marginTop: 12,
    width: 270,
    textAlign: 'center',
    marginBottom: 20,
  },
  imgStyle: {
    width: 210,
    height: 180,
    alignSelf: 'center',
    marginTop: -52,
  },
  viewImg: {
    width: '100%',
    height: 240,
    // backgroundColor:"red"
  },
  lottery: {
    width: '80%',
    backgroundColor: '#fcf4e4',
    borderRadius: 10,
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    marginBottom: 20,
    color: '#e6c33d',
    fontWeight: 'bold',
  },
  btnTipModal: {
    backgroundColor: '#FFF6D4',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 10,
    width: '47%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  txtTipModal: {
    color: '#EBC42B',
    fontSize: 18,
    fontFamily: 'ProximaNovaBold',
  },
});
