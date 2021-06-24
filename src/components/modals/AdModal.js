import React, { useState, useContext, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';
import { AdMobBanner } from 'expo-ads-admob';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as actionTypes from '../../contextApi/actionTypes';
import Context from '../../contextApi/context';

const AdModal = ({ adModalVisible, setAdModalVisible }) => {
  const [error, setError] = useState();
  const { state, dispatch } = useContext(Context);
  const [showCross, setShowCross] = useState(false);

  const showCrossDelay = () => {
    setTimeout(() => {
      setShowCross(true);
    }, 8000);
  };

  useEffect(() => {
    showCrossDelay();
  });

  const refreshAnimation = () => {
    dispatch({
      type: actionTypes.REFRESH_ANIMATION,
      payload: !state.refreshAnimation,
    });
  };
  return (
    <Modal
      // onBackdropPress={() => {
      //   setAdModalVisible(false);
      //   refreshAnimation();
      // }}
      isVisible={adModalVisible}
      backdropOpacity={0}
    >
      <View
        style={{
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: '#000',
            opacity: 0.5,
            alignItems: 'center',
            width: 299,
            alignSelf: 'center',
            borderRadius: 16,
            paddingVertical: 40,
          }}
        >
          <AdMobBanner
            bannerSize="mediumRectangle"
            adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={() => setError(true)}
          />
        </View>
        {error && (
          <Text
            style={{
              color: 'white',
              position: 'absolute',
              fontSize: 16,
              fontFamily: 'ProximaNova',
            }}
          >
            Failed to load Ad
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
              top: 5,
              right: 20,
              position: 'absolute',
            }}
          >
            <AntDesign name="close" size={29} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default AdModal;
