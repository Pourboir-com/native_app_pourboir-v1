import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Modal from 'react-native-modal';
import { Colors } from '../../constants/Theme';
import { AntDesign, Feather, Entypo } from '@expo/vector-icons';
import CommonButton from '../common-button';
import i18n from '../../li8n';
const TourModal = ({ tourModal, setTourModal, section, setSection }) => {
  const [showCross, setShowCross] = useState(true);
  const statusBarHeight = getStatusBarHeight();

  const nextSection = () => {
    if (section === 5) {
      setSection(0);
      setTourModal(false);
    } else {
      setSection(section + 1);
    }
  };

  const percentMobHeight = percent =>
    `${((Dimensions.get('window').height + statusBarHeight) * percent) / 100}%`;
  const percentHeight = percent => `${(statusBarHeight * percent) / 100}%`;
  const percentWidth = percent =>
    (Dimensions.get('window').width * percent) / 100;
  const tour3_container = {
    // alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 180 : '17.2%',
    left: Platform.OS === 'ios' ? percentWidth(18) : '15.5%',
    width: '70%',
  };
  return (
    <Modal
      isVisible={tourModal}
      backdropOpacity={0.7}
      animationInTiming={300}
      animationOutTiming={300}
      onBackdropPress={nextSection}
      style={{
        width: '100%',
        marginHorizontal: 0,
        marginBottom: 0,
        position: 'relative',
        marginTop: -80,
      }}
    >
      <TouchableOpacity
        activeOpacity={0}
        onPress={nextSection}
        style={{
          height: '100%',
          backgroundColor: 'transparent',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          marginTop: 30,
          alignItems: 'center',
        }}
      >
        {section == 1 ? (
          <>
            <View style={styles.tour1_container}>
              <Image
                source={require('../../assets/images/gear.png')}
                style={{
                  width: 20,
                  height: 20,
                  position: 'absolute',
                  top: Platform.OS != 'ios' ? -32 : 0,
                  right: Platform.OS != 'ios' ? -5 : 0,
                }}
              />
              <View
                style={{
                  marginTop: Platform.OS === 'ios' ? '8%' : '2%',
                  marginLeft: Platform.OS === 'ios' ? 'auto' : 14,
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                  marginRight: Platform.OS === 'ios' ? -3 : -12,
                }}
              >
                <Text
                  style={{
                    fontFamily: 'ProximaNovaBold',
                    color: '#fff',
                    fontSize: 17,
                    width: '70%',
                    textAlign: 'right',
                  }}
                >
                  {i18n.t('tour_section1')}
                </Text>
                <View
                  style={{
                    marginLeft: 0,
                    marginTop: Platform.OS === 'ios' ? 0 : -10,
                  }}
                >
                  <Image
                    source={require('../../assets/images/up-arrow-curve.png')}
                    style={{ width: 80, height: 80, resizeMode: 'contain' }}
                  />
                </View>
              </View>
            </View>
          </>
        ) : section == 2 ? (
          <View style={styles.tour2_container}>
            <View style={{ width: '70%', marginTop: 5 }}>
              <Text
                style={{
                  fontFamily: 'ProximaNovaBold',
                  color: '#fff',
                  fontSize: 17,
                }}
              >
                {i18n.t('tour_section2')}
              </Text>
            </View>
            <View
              style={{
                top: Platform.OS === 'ios' ? 49 : '78%',
                left: Platform.OS === 'ios' ? percentWidth(50) : '50.2%',
                position: 'absolute',
              }}
            >
              <Image
                source={require('../../assets/images/down-arrow-curve.png')}
                style={{ width: 75, height: 75, resizeMode: 'contain' }}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btn}
              >
                <Text
                  style={[
                    styles.btnTxt,
                    { paddingVertical: Platform.OS === 'ios' ? 7 : 7 },
                  ]}
                >
                  {i18n.t('add_fav')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : section == 3 ? (
          <View style={tour3_container}>
            <View style={{ width: '100%' }}>
              <Text
                style={{
                  fontFamily: 'ProximaNovaBold',
                  color: '#fff',
                  fontSize: 17,
                }}
              >
                {i18n.t('tour_section3')}
              </Text>
            </View>
            <View style={{ marginLeft: 14, marginTop: 10 }}>
              <Image
                source={require('../../assets/images/down-arrow-yellow.png')}
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: 'contain',
                  marginTop: 10,
                  // marginRight: 40,
                  marginLeft: 40,
                }}
              />
            </View>
            <View
              style={{ marginTop: 80, alignItems: 'center', marginLeft: 10 }}
            >
              <View activeOpacity={0} style={[styles.viewItem]}>
                <View style={styles.viewIcon}>
                  <Feather
                    name="check-square"
                    size={26}
                    color={Colors.yellow}
                  />
                </View>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={2}
                  style={{
                    fontFamily: 'ProximaNova',
                    color: Colors.fontDark,
                    fontSize: 14,
                    width: '70%',
                    lineHeight: 17,
                    textAlign: 'center',
                  }}
                >
                  Check-in
                </Text>
              </View>
            </View>
          </View>
        ) : section === 4 ? (
          <View style={styles.tour4_container}>
            <View style={{ marginTop: -10, position: 'relative' }}>
              <View style={{ width: '100%', marginTop: 5 }}>
                <Text
                  style={{
                    fontFamily: 'ProximaNovaBold',
                    color: '#fff',
                    fontSize: 17,
                  }}
                >
                  {i18n.t('tour_section4')}
                </Text>
              </View>
              <Image
                source={require('../../assets/images/arrow.png')}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                  marginTop: 70,
                  position: 'absolute',
                  left: 90,
                }}
              />
            </View>
            <View
              style={{
                marginLeft: 15,
                backgroundColor: '#FCDF6F',
                padding: 2,
                borderRadius: 100,
                position: 'absolute',
                top: 163,
                left: 33,
              }}
            >
              <View>
                <Entypo name="plus" size={22} color="white" />
              </View>
            </View>
          </View>
        ) : section == 5 ? (
          <View style={styles.tour5_container}>
            <View style={{ width: '80%', marginTop: 5 }}>
              <Text
                style={{
                  fontFamily: 'ProximaNovaBold',
                  color: '#fff',
                  fontSize: 17,
                  textAlign: 'right',
                }}
              >
                {i18n.t('tour_section5')}
              </Text>
            </View>
            <View
              style={{
                // marginTop: -20,
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                width: '55%',
              }}
            >
              <Image
                source={require('../../assets/images/arrow-down.png')}
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: 'contain',
                  marginVertical: 20,
                  //   marginRight: 60,
                }}
              />
            </View>
            <View style={{ width: '90%' }}>
              <CommonButton title={i18n.t('see_menu')} />
            </View>
          </View>
        ) : null}
        {showCross && (
          <TouchableOpacity
            style={{
              // alignSelf: 'flex-end',
              position: 'absolute',
              left: Platform.OS === 'ios' ? 10 : 13,
              // ...(Platform.OS === 'android' ? { top: 63 } : {}),
              marginTop: Platform.OS === 'android' ? '18%' : '28.5%',
            }}
            onPress={() => {
              setSection(0);
              setTourModal(false);
            }}
          >
            <AntDesign name="close" size={34} color="white" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Modal>
  );
};

export default TourModal;

const styles = StyleSheet.create({
  tour1_container: {
    position: 'absolute',
    marginTop: Platform.OS === 'android' ? '29%' : '31%',
    width: '80%',
    flexDirection: 'row',
  },
  tour2_container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 150 : 115,
    width: '90%',
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: Colors.yellow,
    borderRadius: 7,
    width: 154,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 11,
    marginTop: 10,
    zIndex: 111111,
  },
  btnTxt: {
    fontFamily: 'ProximaNova',
    fontSize: 13,
  },

  viewIcon: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewItem: {
    marginTop: 50,
    width: 110,
    marginHorizontal: 10,
    height: 55,
    backgroundColor: 'white',
    marginBottom: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 9,
    justifyContent: 'center',
    position: 'absolute',
    left: 50,
    bottom: 10,
  },
  tour4_container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'absolute',
    top: Platform.OS === 'ios' ? 284 : '30.6%',
    left: 60,
    width: '60%',
  },
  tour5_container: {
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 10 : 26,
    width: '100%',
    zIndex: 111111,
  },
});
