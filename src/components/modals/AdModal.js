import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { AdMobBanner } from 'expo-ads-admob';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as actionTypes from '../../contextApi/actionTypes';
import Context from '../../contextApi/context';
import Constants from 'expo-constants';

const AdModal = ({ adModalVisible, setAdModalVisible }) => {
  const testID = Platform.select({
    ios: 'ca-app-pub-3940256099942544/2934735716',
    android: 'ca-app-pub-3940256099942544/6300978111',
  });
  const productionID = Platform.select({
    ios: 'ca-app-pub-3363550540559109/3556164413',
    android: 'ca-app-pub-3363550540559109/9191634478',
  });

  const adUnitID = Constants.isDevice && !__DEV__ ? productionID : testID;

  const [error, setError] = useState();
  const { state, dispatch } = useContext(Context);
  const [showCross, setShowCross] = useState(false);
  const [Ad, setAd] = useState(false);

  const showCrossDelay = () => {
    setTimeout(() => {
      setShowCross(true);
    }, 5000);
  };

  useEffect(() => {
    showCrossDelay();
  }, []);

  const refreshAnimation = () => {
    dispatch({
      type: actionTypes.REFRESH_ANIMATION,
      payload: !state.refreshAnimation,
    });
  };
  return (
    <Modal
      isVisible={adModalVisible}
      backdropOpacity={0.7}
      animationInTiming={700}
      animationOutTiming={700}
      style={{
        width: '100%',
        marginHorizontal: 0,
        marginBottom: 0,
        position: 'relative',
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          backgroundColor: 'transparent',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      >
        <AdMobBanner
          bannerSize="mediumRectangle"
          adUnitID={adUnitID} // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={() => setError(true)}
          onAdViewDidReceiveAd={() => setAd(true)}
        />
      </View>
      {error && (
        <Text
          style={{
            position: 'absolute',
            fontSize: 18,
            fontFamily: 'ProximaNova',
            alignSelf: 'center',
            color: '#fff',
          }}
        >
          Failed to load Ad
        </Text>
      )}
      {!Ad && !error && (
        <Text
          style={{
            position: 'absolute',
            fontSize: 18,
            fontFamily: 'ProximaNova',
            alignSelf: 'center',
            color: '#fff',
          }}
        >
          Loading Ad..
        </Text>
      )}
      {showCross && (
        <TouchableOpacity
          onPress={() => {
            setAdModalVisible(false);
            refreshAnimation();
          }}
          style={{
            alignSelf: 'flex-end',
            position: 'absolute',
            top: 10,
            right: 10,
          }}
        >
          <AntDesign name="close" size={29} color="white" />
        </TouchableOpacity>
      )}
    </Modal>
  );
};

export default AdModal;
