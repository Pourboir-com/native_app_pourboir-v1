import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from '../../constants/Theme';
import { Feather } from '@expo/vector-icons';
import CommonButton from '../common-button';

const TourModal = ({ tourModal, setTourModal }) => {
  const [showCross, setShowCross] = useState(false);
  const [section, setSection] = useState(1);
  //   useEffect(() => {
  //     //  setSection(section == 2 ? setTourModal(false) && clearInterval() : setSection(section+1))
  //     if (section === 4) {
  //       clearInterval(section);
  //       setTourModal(false)
  //     } else {
  //       setInterval(() => {
  //         setSection(section + 1);
  //       }, 8000);
  //     }
  //   }, []);
  const nextSection = () => {
    if (section === 5) {
      setTourModal(false);
    } else {
      setSection(section + 1);
    }
  };
  console.log(section);

  return (
    <Modal
      isVisible={tourModal}
      backdropOpacity={0}
      animationInTiming={700}
      animationOutTiming={700}
      onPress={() => setSection(2)}
      style={{
        width: '100%',
        marginHorizontal: 0,
        marginBottom: 0,
        position: 'relative',
        marginTop: -70,
      }}
    >
      <TouchableHighlight
        onPress={nextSection}
        style={{
          //   justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          backgroundColor: '#000',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          opacity: 0.7,
          marginTop: 30,
        }}
      >
        {section == 1 ? (
          <View style={styles.tour1_container}>
            <View style={{ width: '70%', marginTop: 5 }}>
              <Text
                style={{
                  fontFamily: 'ProximaNovaBold',
                  color: '#fff',
                  fontSize: 17,
                }}
              >
                Are you owner of this restaurant ? click here
              </Text>
            </View>
            <View style={{ width: '30%', marginLeft: 14, marginTop: -10 }}>
              <Image
                source={require('../../assets/images/up-arrow-curve.png')}
                style={{ width: 80, height: 80, resizeMode: 'contain' }}
              />
            </View>
          </View>
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
                Add the restaurant to your favorites to have access to it fast
              </Text>
            </View>
            <View
              style={{ width: '50%', top: 60, left: 150, position: 'absolute' }}
            >
              <Image
                source={require('../../assets/images/down-arrow-curve.png')}
                style={{ width: 75, height: 75, resizeMode: 'contain' }}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btn}
                //   onPress={confirmClick}
              >
                <Text style={styles.btnTxt}>Ajouter au favoris</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : section == 3 ? (
          <View style={styles.tour3_container}>
            <View style={{ width: '100%', marginTop: 5 }}>
              <Text
                style={{
                  fontFamily: 'ProximaNovaBold',
                  color: '#fff',
                  fontSize: 17,
                }}
              >
                Check-in when you are there to enter the lottery
              </Text>
            </View>
            <View style={{ marginLeft: 14, marginTop: -10 }}>
              <Image
                source={require('../../assets/images/down-arrow-yellow.png')}
                style={{
                  width: 130,
                  height: 130,
                  resizeMode: 'contain',
                  marginTop: 30,
                  marginRight: 60,
                }}
              />
            </View>
            <View>
              <TouchableOpacity activeOpacity={0.5} style={[styles.viewItem]}>
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
                  {/* {vicinity || name} */}
                  Check-in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : section === 4 ? (
          <View style={styles.tour3_container}>
            <View style={{ width: '100%', marginTop: 5 }}>
              <Text
                style={{
                  fontFamily: 'ProximaNovaBold',
                  color: '#fff',
                  fontSize: 17,
                }}
              >
                Leave a review for more chance to win
              </Text>
            </View>
            <View style={{ marginTop: -10 }}>
              <Image
                source={require('../../assets/images/down-arrow-curve.png')}
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: 'contain',
                  marginTop: 30,
                  marginRight: 60,
                }}
              />
            </View>
          </View>
        ) : (
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
                Digital menu is right here
              </Text>
            </View>
            <View
              style={{
                marginTop: -20,
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                width: '55%',
              }}
            >
              <Image
                source={require('../../assets/images/arrow-right-curve.png')}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                  marginTop: 30,
                  //   marginRight: 60,
                }}
              />
            </View>
            <View style={{ width: '90%', zIndex: 1111 }}>
              <CommonButton title="See the menu" />
            </View>
          </View>
        )}
      </TouchableHighlight>
    </Modal>
  );
};

export default TourModal;

const styles = StyleSheet.create({
  tour1_container: {
    position: 'absolute',
    top: 110,
    width: '80%',
    flexDirection: 'row',
  },
  tour2_container: {
    position: 'absolute',
    top: 150,
    width: '90%',
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: Colors.yellow,
    borderRadius: 7,
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 10,
    marginLeft: 20,
  },
  btnTxt: {
    fontFamily: 'ProximaNova',
    fontSize: 13,
  },
  tour3_container: {
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    top: 150,
    width: '60%',
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
    marginTop: 20,
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
    alignItems: 'center',
  },
  tour4_container: {
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    top: 150,
    width: '60%',
  },
  tour5_container: {
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 40,
    width: '100%',
  },
});
