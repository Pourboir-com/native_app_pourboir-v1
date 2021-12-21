import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import styles from '../../screens/braserri/styles';
import AddBtn from '../add-common-btn';
import i18n from '../../li8n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Entypo } from '@expo/vector-icons';
import CommonButton from '../common-button';

const Media = props => {
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
      style={{ marginTop: 10, marginHorizontal: 25 }}
    >
      <ScrollView bounces={false} keyboardShouldPersistTaps={'handled'}>
        <View style={{ marginTop: 25 }}>
          <View>
            <Text style={styles.mainHeading}>{i18n.t('bg_img_heading')}</Text>
            <Text
              style={(styles.numberTxt, { ...styles.numberTxt, marginTop: 5 })}
            >
              {i18n.t('bg_img_text')}
            </Text>
            <View style={styles.media_main_container}>
              <View style={{ width: '79%' }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder={i18n.t('img_placeholder')}
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
            <Text style={styles.mainHeading}>{i18n.t('discv_setting')}</Text>
            <Text
              style={(styles.numberTxt, { ...styles.numberTxt, marginTop: 5 })}
            >
              {i18n.t('basic_settings')}
            </Text>
            <Text style={(styles.numberTxt, { ...styles.numberTxt })}>
              {i18n.t('discoverImg_text')}
            </Text>
            <View style={styles.media_main_container}>
              <View style={{ width: '79%' }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder={i18n.t('img_placeholder')}
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
              <View style={{ width: '79%' }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder={i18n.t('img_placeholder')}
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
              <View style={{ width: '79%' }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder={i18n.t('img_placeholder')}
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
              <View style={{ width: '79%' }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder={i18n.t('img_placeholder')}
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
              <View style={{ width: '79%' }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder={i18n.t('img_placeholder')}
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
            <Text
              style={
                (styles.mainHeading, { ...styles.mainHeading, fontSize: 16 })
              }
            >
              {i18n.t('advance_settings')}
            </Text>
            <Text
              style={(styles.numberTxt, { ...styles.numberTxt, marginTop: 5 })}
            >
              {i18n.t('link_ig_acc')}
            </Text>
            <View style={styles.media_main_container}>
              <View style={{ width: '79%' }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder={i18n.t('user_id')}
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
              <View style={{ width: '79%' }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder={i18n.t('acc_token')}
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
              <View style={{ width: '79%' }}>
                <TextInput
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder={i18n.t('client_id')}
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
        <View style={{ marginVertical: 16 }}>
          <CommonButton title={i18n.t('confirm')} disable={false} />
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default Media;
