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
import AddBtn from '../add-common-btn';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Entypo } from '@expo/vector-icons';
import CommonButton from '../common-button';
import Context from '../../contextApi/context';

const Media = props => {
  const { localizationContext } = useContext(Context);
  const [bgImage, setBgImage] = useState('');
  const [discImg1, setDiscImg1] = useState('');
  const [discImg2, setDiscImg2] = useState('');
  const [discImg3, setDiscImg3] = useState('');
  const [discImg4, setDiscImg4] = useState('');
  const [discImg5, setDiscImg5] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [clientId, setClientId] = useState('');
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
            <Text style={styles.mainHeading}>{localizationContext.t('bg_img_heading')}</Text>
            <Text
              style={
                (styles.numberTxt,
                { ...styles.numberTxt, marginTop: 5, width: '80%' })
              }
            >
              {localizationContext.t('bg_img_text')}
            </Text>
            <View style={styles.media_main_container}>
              <View style={{ width: '82%' }}>
                <TextInput
                  style={styles.input}
                  placeholder={localizationContext.t('img_placeholder')}
                  placeholderTextColor={'#485460'}
                  onChangeText={e => setBgImage(e)}
                  value={bgImage}
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
            </View>
          </View>
        </View>
        <View style={{ marginTop: 25 }}>
          <View>
            <Text style={styles.mainHeading}>{localizationContext.t('discv_setting')}</Text>
            <Text
              style={(styles.numberTxt, { ...styles.numberTxt, marginTop: 5 })}
            >
              {localizationContext.t('basic_settings')}
            </Text>
            <Text
              style={
                (styles.numberTxt,
                { ...styles.numberTxt, width: '90%', marginTop: 5 })
              }
            >
              {localizationContext.t('discoverImg_text')}
            </Text>
            <View style={styles.media_main_container}>
              <View style={{ width: '82%' }}>
                <TextInput
                  style={styles.input}
                  placeholder={localizationContext.t('img_placeholder')}
                  placeholderTextColor={'#485460'}
                  onChangeText={e => setDiscImg1(e)}
                  value={discImg1}
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
            </View>
            <View style={styles.media_main_container}>
              <View style={{ width: '82%' }}>
                <TextInput
                  style={styles.input}
                  placeholder={localizationContext.t('img_placeholder')}
                  placeholderTextColor={'#485460'}
                  onChangeText={e => setDiscImg2(e)}
                  value={discImg2}
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
            </View>
            <View style={styles.media_main_container}>
              <View style={{ width: '82%' }}>
                <TextInput
                  style={styles.input}
                  placeholder={localizationContext.t('img_placeholder')}
                  placeholderTextColor={'#485460'}
                  onChangeText={e => setDiscImg3(e)}
                  value={discImg3}
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
            </View>
            <View style={styles.media_main_container}>
              <View style={{ width: '82%' }}>
                <TextInput
                  style={styles.input}
                  placeholder={localizationContext.t('img_placeholder')}
                  placeholderTextColor={'#485460'}
                  onChangeText={e => setDiscImg4(e)}
                  value={discImg4}
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
            </View>
            <View style={styles.media_main_container}>
              <View style={{ width: '82%' }}>
                <TextInput
                  style={styles.input}
                  placeholder={localizationContext.t('img_placeholder')}
                  placeholderTextColor={'#485460'}
                  onChangeText={e => setDiscImg5(e)}
                  value={discImg5}
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
            </View>
          </View>
        </View>
        <View style={{ marginTop: 25 }}>
          <View>
            <Text style={{ ...styles.mainHeading }}>
              {localizationContext.t('advance_settings')}
            </Text>
            <Text
              style={(styles.numberTxt, { ...styles.numberTxt, marginTop: 5 })}
            >
              {localizationContext.t('link_ig_acc')}
            </Text>
            <View style={styles.media_main_container}>
              <View style={{ width: '82%' }}>
                <TextInput
                  style={styles.input}
                  placeholder={localizationContext.t('user_id')}
                  placeholderTextColor={'#485460'}
                  onChangeText={e => setUserId(e)}
                  value={userId}
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
            </View>
            <View style={styles.media_main_container}>
              <View style={{ width: '82%' }}>
                <TextInput
                  style={styles.input}
                  placeholder={localizationContext.t('acc_token')}
                  placeholderTextColor={'#485460'}
                  onChangeText={e => setToken(e)}
                  value={token}
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
            </View>
            <View style={styles.media_main_container}>
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
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 16, marginBottom: 35 }}>
          <CommonButton title={localizationContext.t('confirmer')} disable={false} />
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default Media;
