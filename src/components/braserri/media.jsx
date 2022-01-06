import React, { useState, useContext } from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { TextInput } from 'react-native';
import styles from '../../screens/braserri/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Entypo } from '@expo/vector-icons';
import CommonButton from '../common-button';
import Context from '../../contextApi/context';
import { useMutation } from 'react-query';
import { SUBMIT_INSTA_DETAILS } from '../../queries';
import CommonModal from '../../components/modals/HelpUsImproveModal';
const successImg = require('../../assets/images/success.png');
const errorImg = require('../../assets/images/errorImg.png');

const Media = ({
  refetchInstaData,
  user_id,
  place_id,
  refetchInstaFeed,
  refetchAll,
  states,
}) => {
  const { localizationContext } = useContext(Context);
  let {
    bgImage,
    setBgImage,
    discImg1,
    setDiscImg1,
    discImg2,
    setDiscImg2,
    discImg3,
    setDiscImg3,
    discImg4,
    setDiscImg4,
    discImg5,
    setDiscImg5,
    token,
    setToken,
    setHeaderBg,
  } = states || {};

  // const [clientId, setClientId] = useState('');
  const [successModal, setSuccesModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const disabled_color = '#f0f0f0';
  const not_disabled_color = '#FCDF6F';
  const clear_button_color = '#FF5B5B';
  const textbox_border_color = '#E3E3E3';

  const checkURL = url => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };
  const validImages = () => {
    let discovered_images = [discImg1, discImg2, discImg3, discImg4, discImg5];
    let validate_discover_images = [];
    discovered_images.map(
      item => item && checkURL(item) && validate_discover_images.push(item),
    );
    return validate_discover_images;
  };

  const [
    submitInstaDetails,
    { isLoading: submitInstaDetailsLoading },
  ] = useMutation(SUBMIT_INSTA_DETAILS);
  const saveInstaDetails = async () => {
    await submitInstaDetails(
      {
        user_id,
        place_id,
        access_token: token || '',
        background_image: bgImage || '',
        discover_images: validImages(),
      },
      {
        onSuccess: async () => {
          setHeaderBg(bgImage);
          refetchInstaData();
          refetchAll();
          if (token) {
            await refetchInstaFeed();
          }
          setSuccesModal(true);
        },
      },
    );
  };

  return (
    <KeyboardAwareScrollView
      bounces={false}
      enableOnAndroid={true}
      extraScrollHeight={10}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      scrollToOverflowEnabled={true}
      enableAutomaticScroll={Platform.OS === 'ios' ? true : false}
      resetScrollToCoords={{ x: 0, y: 0 }}
      style={{ marginTop: 10 }}
    >
      <ScrollView bounces={false} keyboardShouldPersistTaps={'handled'}>
        <View style={{ marginTop: 25 }}>
          <View>
            <Text style={styles.mainHeading}>
              {localizationContext.t('bg_img_heading')}
            </Text>
            <Text
              style={
                (styles.numberTxt,
                { ...styles.numberTxt, marginTop: 5, width: '82%' })
              }
            >
              {localizationContext.t('bg_img_text')}
            </Text>
            <View style={styles.media_main_container}>
              <View style={{ width: !bgImage ? '82%' : '66%' }}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor:
                      checkURL(bgImage) || !bgImage
                        ? textbox_border_color
                        : clear_button_color,
                  }}
                  placeholder={localizationContext.t('img_placeholder')}
                  placeholderTextColor={'#485460'}
                  onChangeText={e => setBgImage(e)}
                  value={bgImage}
                />
              </View>
              <View
                style={{
                  width: !bgImage ? '0%' : '13%',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity
                  style={{
                    ...styles.checkContainer,
                    backgroundColor: checkURL(bgImage)
                      ? clear_button_color
                      : not_disabled_color,
                  }}
                  onPress={() =>
                    checkURL(bgImage) ? setBgImage('') : setErrorModal(true)
                  }
                  activeOpacity={0.6}
                >
                  <Entypo
                    name={checkURL(bgImage) ? 'cross' : 'question'}
                    size={26}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: '13%', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={{
                    ...styles.checkContainer,
                    backgroundColor: checkURL(bgImage)
                      ? not_disabled_color
                      : disabled_color,
                  }}
                  onPress={() => checkURL(bgImage) && saveInstaDetails()}
                  activeOpacity={0.6}
                >
                  <Entypo name="check" size={22} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 25 }}>
          <View>
            <Text style={styles.mainHeading}>
              {localizationContext.t('discv_setting')}
            </Text>
            <Text
              style={(styles.numberTxt, { ...styles.numberTxt, marginTop: 5 })}
            >
              {localizationContext.t('basic_settings')}
            </Text>
            <Text
              style={
                (styles.numberTxt,
                { ...styles.numberTxt, width: '82%', marginTop: 5 })
              }
            >
              {localizationContext.t('discoverImg_text')}
            </Text>
            <View style={styles.media_main_container}>
              <View style={{ width: !discImg1 ? '82%' : '66%' }}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor:
                      checkURL(discImg1) || !discImg1
                        ? textbox_border_color
                        : clear_button_color,
                  }}
                  placeholder={localizationContext.t('img_placeholder')}
                  placeholderTextColor={'#485460'}
                  onChangeText={e => setDiscImg1(e)}
                  value={discImg1}
                />
              </View>
              <View
                style={{
                  width: !discImg1 ? '0%' : '13%',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity
                  style={{
                    ...styles.checkContainer,
                    backgroundColor: checkURL(discImg1)
                      ? clear_button_color
                      : not_disabled_color,
                  }}
                  onPress={() =>
                    checkURL(discImg1) ? setDiscImg1('') : setErrorModal(true)
                  }
                  activeOpacity={0.6}
                >
                  <Entypo
                    name={checkURL(discImg1) ? 'cross' : 'question'}
                    size={26}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: '13%', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={{
                    ...styles.checkContainer,
                    backgroundColor: checkURL(discImg1)
                      ? not_disabled_color
                      : disabled_color,
                  }}
                  onPress={() => checkURL(discImg1) && saveInstaDetails()}
                  activeOpacity={0.6}
                >
                  <Entypo name="check" size={22} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.media_main_container}>
              <View style={{ width: !discImg2 ? '82%' : '66%' }}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor:
                      checkURL(discImg2) || !discImg2
                        ? textbox_border_color
                        : clear_button_color,
                  }}
                  placeholder={localizationContext.t('img_placeholder')}
                  placeholderTextColor={'#485460'}
                  onChangeText={e => setDiscImg2(e)}
                  value={discImg2}
                />
              </View>
              <View
                style={{
                  width: !discImg2 ? '0%' : '13%',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity
                  style={{
                    ...styles.checkContainer,
                    backgroundColor: checkURL(discImg2)
                      ? clear_button_color
                      : not_disabled_color,
                  }}
                  onPress={() =>
                    checkURL(discImg2) ? setDiscImg2('') : setErrorModal(true)
                  }
                  activeOpacity={0.6}
                >
                  <Entypo
                    name={checkURL(discImg2) ? 'cross' : 'question'}
                    size={26}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: '13%', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={{
                    ...styles.checkContainer,
                    backgroundColor: checkURL(discImg2)
                      ? not_disabled_color
                      : disabled_color,
                  }}
                  onPress={() => checkURL(discImg2) && saveInstaDetails()}
                  activeOpacity={0.6}
                >
                  <Entypo name="check" size={22} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.media_main_container}>
              <View style={{ width: !discImg3 ? '82%' : '66%' }}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor:
                      checkURL(discImg3) || !discImg3
                        ? textbox_border_color
                        : clear_button_color,
                  }}
                  placeholder={localizationContext.t('img_placeholder')}
                  placeholderTextColor={'#485460'}
                  onChangeText={e => setDiscImg3(e)}
                  value={discImg3}
                />
              </View>
              <View
                style={{
                  width: !discImg3 ? '0%' : '13%',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity
                  style={{
                    ...styles.checkContainer,
                    backgroundColor: checkURL(discImg3)
                      ? clear_button_color
                      : not_disabled_color,
                  }}
                  onPress={() =>
                    checkURL(discImg3) ? setDiscImg3('') : setErrorModal(true)
                  }
                  activeOpacity={0.6}
                >
                  <Entypo
                    name={checkURL(discImg3) ? 'cross' : 'question'}
                    size={26}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: '13%', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={{
                    ...styles.checkContainer,
                    backgroundColor: checkURL(discImg3)
                      ? not_disabled_color
                      : disabled_color,
                  }}
                  onPress={() => checkURL(discImg3) && saveInstaDetails()}
                  activeOpacity={0.6}
                >
                  <Entypo name="check" size={22} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.media_main_container}>
              <View style={{ width: !discImg4 ? '82%' : '66%' }}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor:
                      checkURL(discImg4) || !discImg4
                        ? textbox_border_color
                        : clear_button_color,
                  }}
                  placeholder={localizationContext.t('img_placeholder')}
                  placeholderTextColor={'#485460'}
                  onChangeText={e => setDiscImg4(e)}
                  value={discImg4}
                />
              </View>
              <View
                style={{
                  width: !discImg4 ? '0%' : '13%',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity
                  style={{
                    ...styles.checkContainer,
                    backgroundColor: checkURL(discImg4)
                      ? clear_button_color
                      : not_disabled_color,
                  }}
                  onPress={() =>
                    checkURL(discImg4) ? setDiscImg4('') : setErrorModal(true)
                  }
                  activeOpacity={0.6}
                >
                  <Entypo
                    name={checkURL(discImg4) ? 'cross' : 'question'}
                    size={26}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: '13%', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={{
                    ...styles.checkContainer,
                    backgroundColor: checkURL(discImg4)
                      ? not_disabled_color
                      : disabled_color,
                  }}
                  onPress={() => checkURL(discImg4) && saveInstaDetails()}
                  activeOpacity={0.6}
                >
                  <Entypo name="check" size={22} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.media_main_container}>
              <View style={{ width: !discImg5 ? '82%' : '66%' }}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor:
                      checkURL(discImg5) || !discImg5
                        ? textbox_border_color
                        : clear_button_color,
                  }}
                  placeholder={localizationContext.t('img_placeholder')}
                  placeholderTextColor={'#485460'}
                  onChangeText={e => setDiscImg5(e)}
                  value={discImg5}
                />
              </View>
              <View
                style={{
                  width: !discImg5 ? '0%' : '13%',
                  justifyContent: 'center',
                }}
              >
                <TouchableOpacity
                  style={{
                    ...styles.checkContainer,
                    backgroundColor: checkURL(discImg5)
                      ? clear_button_color
                      : not_disabled_color,
                  }}
                  onPress={() =>
                    checkURL(discImg5) ? setDiscImg5('') : setErrorModal(true)
                  }
                  activeOpacity={0.6}
                >
                  <Entypo
                    name={checkURL(discImg5) ? 'cross' : 'question'}
                    size={26}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: '13%', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={{
                    ...styles.checkContainer,
                    backgroundColor: checkURL(discImg5)
                      ? not_disabled_color
                      : disabled_color,
                  }}
                  onPress={() => checkURL(discImg5) && saveInstaDetails()}
                  activeOpacity={0.6}
                >
                  <Entypo name="check" size={22} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 25 }}>
          <View>
            <Text style={{ ...styles.mainHeading }}>
              {localizationContext.t('advance_settings')}
            </Text>
            <Text style={{ ...styles.numberTxt, marginTop: 5, width: '82%' }}>
              {localizationContext.t('link_ig_acc')}
            </Text>
            <View style={styles.media_main_container}>
              <View style={{ width: '82%' }}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: textbox_border_color,
                  }}
                  placeholder={localizationContext.t('acc_token')}
                  placeholderTextColor={'#485460'}
                  onChangeText={e => setToken(e)}
                  value={token}
                />
              </View>
              <View style={{ width: '13%', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={{
                    ...styles.checkContainer,
                    backgroundColor: token
                      ? not_disabled_color
                      : disabled_color,
                  }}
                  onPress={() => token && saveInstaDetails()}
                  activeOpacity={0.6}
                >
                  <Entypo name="check" size={22} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={styles.media_main_container}>
              <View style={{ width: '82%' }}>
                <TextInput
                  style={styles.input}
                  placeholder={localizationContext.t('client_id')}
                  placeholderTextColor={'#485460'}
                  onChangeText={e => setClientId(e)}
                  value={clientId}
                />
              </View>
              <View style={{ width: '13%', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={styles.checkContainer}
                  activeOpacity={0.6}
                >
                  <Entypo name="check" size={22} color="black" />
                </TouchableOpacity>
              </View>
            </View> */}
          </View>
        </View>
        <View style={{ marginVertical: 16, marginBottom: 35 }}>
          <CommonButton
            loading={submitInstaDetailsLoading}
            onPress={saveInstaDetails}
            title={localizationContext.t('confirmer')}
            disable={false}
          />
        </View>
      </ScrollView>
      {successModal && (
        <CommonModal
          isVisible={successModal}
          handleModalClose={() => setSuccesModal(false)}
          image={successImg}
          heading={localizationContext.t('congrats')}
          subHeadingText={localizationContext.t('congrats_text')}
        />
      )}
      {errorModal && (
        <CommonModal
          isVisible={errorModal}
          handleModalClose={() => setErrorModal(false)}
          image={errorImg}
          heading={localizationContext.t('error')}
          subHeadingText={localizationContext.t('error_text')}
        />
      )}
    </KeyboardAwareScrollView>
  );
};

export default Media;
