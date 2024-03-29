import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
const imgBg = require('../../assets/images/Group7.png');

const HelpUsImproveModal = ({
  isVisible,
  handleModalClose,
  onPress,
  image,
  loading,
  buttonText,
  heading,
  subtext,
  restaurant,
  subHeadingText,
  customHeadingSize,
  customButtonWidth,
  bgImage,
}) => {
  return (
    <Overlay
      overlayStyle={styles.container}
      isVisible={isVisible}
      onBackdropPress={handleModalClose}
      backdropStyle={{ opacity: 0.6, backgroundColor: 'black' }}
    >
      <ScrollView
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        bounces={false}
        keyboardShouldPersistTaps={'handled'}
      >
        <KeyboardAvoidingView
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          <ImageBackground
            style={styles.imgBgStyle}
            source={bgImage || imgBg}
            resizeMode={bgImage ? 'cover' : 'stretch'}
          >
            <View style={styles.viewImg}>
              <TouchableOpacity
                onPress={handleModalClose}
                style={{ alignSelf: 'flex-end', margin: 10 }}
              >
                <AntDesign name="close" size={29} color="#485460" />
              </TouchableOpacity>
              <Image
                source={image}
                style={styles.imgStyle}
                resizeMode="contain"
              />
            </View>
          </ImageBackground>
          {heading && (
            <Text
              ellipsizeMode="tail"
              numberOfLines={4}
              style={[
                styles.txtName,
                {
                  fontFamily: 'ProximaNovaBold',
                  fontSize: customHeadingSize || 18,
                },
              ]}
            >
              {heading}
            </Text>
          )}
          {subHeadingText && (
            <Text
              ellipsizeMode="tail"
              numberOfLines={4}
              style={[styles.txtConfrm, { fontFamily: 'ProximaNova' }]}
            >
              {subHeadingText}
            </Text>
          )}
          {subtext && (
            <Text
              ellipsizeMode="tail"
              numberOfLines={4}
              style={[styles.txtConfrm, { fontFamily: 'ProximaNova' }]}
            >
              {subtext}
            </Text>
          )}
          {restaurant && (
            <Text
              ellipsizeMode="tail"
              numberOfLines={4}
              style={[styles.txtName, { fontFamily: 'ProximaNovaBold' }]}
            >
              {restaurant}
            </Text>
          )}
          {buttonText && (
            <TouchableOpacity
              activeOpacity={0.5}
              disabled={loading}
              onPress={onPress && onPress}
              style={[styles.btnConfrm, { width: customButtonWidth || '85%' }]}
            >
              {loading ? (
                <ActivityIndicator size={29} color="#EBC11B" />
              ) : (
                <Text
                  style={[styles.txtBtnConfrm, { fontFamily: 'ProximaNova' }]}
                >
                  {buttonText}
                </Text>
              )}
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </Overlay>
  );
};

export default HelpUsImproveModal;

const styles = StyleSheet.create({
  container: {
    width: '88%',
    padding: 0,
    overflow: 'hidden',
    borderRadius: 15,
    paddingBottom: 30,
  },
  imgBgStyle: {
    width: '100%',
    height: 240,
  },
  txtBtnConfrm: {
    fontSize: 16,
    color: Colors.fontDark,
  },
  btnConfrm: {
    backgroundColor: Colors.yellow,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: 45,
  },
  txtConfrm: {
    fontSize: Platform.OS === 'ios' ? 17 : 16,
    color: Colors.fontLight,
    marginTop: 20,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  txtName: {
    fontSize: 16,
    color: Colors.fontDark,
    marginTop: 20,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  imgStyle: {
    width: 260,
    height: 200,
    alignSelf: 'center',
    marginTop: -30,
    marginRight: -10,
  },
  viewImg: {
    width: '100%',
    height: 240,
  },
});
