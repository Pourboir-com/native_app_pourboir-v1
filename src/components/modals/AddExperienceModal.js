import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  Platform,
  ActivityIndicatorComponent,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
const imgWaiter = require('../../assets/images/job-hunt.png');
const imgBg = require('../../assets/images/Group7.png');
import i18n from '../../li8n';
import CheckBox from 'react-native-check-box';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddExperienceModal = ({
  setExpModalVisible,
  expModalVisible,
  companyName,
  post,
  startDate,
  endDate,
  setCompanyName,
  setPost,
  setStartDate,
  setEndDate,
  data,
  setData,
  termsChecked,
  setTermsChecked,
  workHere,
  setWorkHere,
}) => {
  const [loading, setLoading] = useState(false);
  const [modeS, setModeS] = useState('date');
  const [showS, setShowS] = useState(false);
  const [modeL, setModeL] = useState('date');
  const [showL, setShowL] = useState(false);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const AddData = () => {
    setData([
      ...data,
      {
        companyName,
        post,
        startDate: startDate.toLocaleDateString(),
        endDate:
          termsChecked === false
            ? endDate.toLocaleDateString()
            : 'still work here',
      },
    ]);
    setCompanyName('');
    setPost('');
    setStart('');
    setEnd('');
    setExpModalVisible(false);
  };
  // console.log( startDate > endDate ? true: false)

  let validation = termsChecked
    ? companyName && post && start
    : companyName && post && start && end && !(start > end);

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowS(Platform.OS === 'ios');
    setStartDate(currentDate);
    setStart(currentDate);
  };
  const showModeStartDate = currentMode => {
    setShowS(true);
    setModeS(currentMode);
  };

  const onChangeLastDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowL(Platform.OS === 'ios');
    setEndDate(currentDate);
    setEnd(currentDate);
  };
  const showModeLastDate = currentMode => {
    setShowL(true);
    setModeL(currentMode);
  };

  return (
    <Overlay
      overlayStyle={styles.container}
      isVisible={expModalVisible}
      onBackdropPress={() => setExpModalVisible(false)}
    >
      <ImageBackground
        style={styles.imgBgStyle}
        source={imgBg}
        resizeMode="stretch"
      >
        <View style={styles.viewImg}>
          <TouchableOpacity
            onPress={() => setExpModalVisible(false)}
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

      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={true}
        extraScrollHeight={10}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollToOverflowEnabled={true}
        enableAutomaticScroll={Platform.OS === 'ios' ? true : false}
        resetScrollToCoords={{ x: 0, y: 0 }}
      >
        <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNovaBold' }]}>
          {i18n.t('add_exp')}
        </Text>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            marginVertical: 15,
          }}
        >
          <View style={styles.input_box}>
            <TextInput
              style={styles.inputsTopTow}
              onChangeText={e => setCompanyName(e)}
              value={companyName}
              placeholder={i18n.t('name_of_company')}
              placeholderTextColor={'#707375'}
            />
          </View>
          <View style={styles.input_box}>
            <TextInput
              style={styles.inputsTopTow}
              onChangeText={e => setPost(e)}
              value={post}
              placeholder={i18n.t('the_post')}
              placeholderTextColor={'#707375'}
            />
          </View>
          {Platform.OS === 'android' && (
            <TouchableOpacity
              onPress={showModeStartDate}
              style={styles.btnInput}
            >
              {Platform.OS === 'android' && (
                <Text
                  style={{
                    fontFamily: 'ProximaNova',
                    color: '#707375',
                    fontSize: 15,
                    paddingTop: 15,
                  }}
                >
                  {start === ''
                    ? i18n.t('start_date')
                    : startDate.toLocaleDateString()}
                </Text>
              )}
              {(Platform.OS === 'ios' || showS) && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={startDate || new Date()}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeStartDate}
                  style={{
                    width: 100,
                    marginTop: 5,
                  }}
                />
              )}
            </TouchableOpacity>
          )}
          {Platform.OS === 'ios' && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                marginBottom: 30,
              }}
            >
              <Text style={{ fontFamily: 'ProximaNova', fontSize: 14 }}>
                {i18n.t('start_date')}:{' '}
              </Text>
              <DateTimePicker
                testID="dateTimePicker"
                value={startDate || new Date()}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChangeStartDate}
                style={{
                  width: '50%',
                  marginTop: 5,
                  right: -6,
                  position: 'absolute',
                }}
              />
            </View>
          )}
          {Platform.OS === 'android' && (
            <TouchableOpacity
              onPress={showModeLastDate}
              style={{ ...styles.btnInput, marginTop: 15, marginBottom: 10 }}
            >
              {Platform.OS === 'android' && (
                <Text
                  style={{
                    fontFamily: 'ProximaNova',
                    color: '#707375',
                    fontSize: 15,
                    paddingTop: 15,
                  }}
                >
                  {end === ''
                    ? i18n.t('end_date')
                    : endDate.toLocaleDateString()}
                </Text>
              )}
              {(Platform.OS === 'ios' || showL) && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={endDate || new Date()}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeLastDate}
                  style={{
                    width: 100,
                    marginTop: 5,
                  }}
                />
              )}
            </TouchableOpacity>
          )}
          {Platform.OS === 'ios' && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                marginBottom: 20,
              }}
            >
              <Text style={{ fontFamily: 'ProximaNova', fontSize: 14 }}>
                {i18n.t('end_date')}:{' '}
              </Text>
              <DateTimePicker
                testID="dateTimePicker"
                value={endDate || new Date()}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChangeLastDate}
                style={{
                  width: '50%',
                  marginTop: 5,
                  right: -5,
                  position: 'absolute',
                }}
              />
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginLeft: 4,
            marginBottom: 20,
            marginTop: -5,
            height: 15,
          }}
        >
          <View style={{ justifyContent: 'center' }}>
            <CheckBox
              style={{
                paddingRight: -40,
                marginTop: -5,
              }}
              onClick={() => [
                setTermsChecked(!termsChecked),
                setWorkHere(workHere === '' ? 'work' : ''),
              ]}
              isChecked={termsChecked}
              checkedImage={
                <Image
                  style={{ width: 18 }}
                  resizeMode={'contain'}
                  source={require('../../assets/images/checked-modal.png')}
                />
              }
              unCheckedImage={
                <Image
                  style={{ width: 18 }}
                  resizeMode={'contain'}
                  source={require('../../assets/images/unchecked-modal.png')}
                />
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => [
              setTermsChecked(!termsChecked),
              setWorkHere(workHere === '' ? 'work' : ''),
            ]}
            style={{ paddingLeft: 10, paddingTop: 1 }}
          >
            <Text
              style={{
                fontFamily: 'ProximaNova',
                color: '#1E272E',
                fontSize: 13,
                marginTop: -2,
              }}
            >
              {i18n.t('still_work')}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={AddData}
          disabled={loading ? true : validation ? false : true}
          style={[
            styles.btn_yellow,
            validation && {
              backgroundColor: Colors.yellow,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicatorComponent size={29} color="#EBC11B" />
          ) : (
            <Text
              style={{
                fontFamily: 'ProximaNova',
                fontSize: 14,
                color: Colors.fontDark,
              }}
            >
              {i18n.t('add')}
            </Text>
          )}
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </Overlay>
  );
};

export default AddExperienceModal;

const styles = StyleSheet.create({
  inputsTopTow: {
    borderColor: '#E3E3E3',
    borderWidth: 1,
    width: 270,
    paddingLeft: 10,
    paddingRight: 10,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontFamily: 'ProximaNova',
    fontSize: 16,
    textAlign: 'center',
  },
  inputLabel: {
    color: 'black',
    opacity: 0.8,
    paddingBottom: 2.7,
    fontSize: 16,
    fontFamily: 'ProximaNovaBold',
  },
  input_box: {
    marginBottom: 16,
  },
  btn_yellow: {
    backgroundColor: '#EAEAEA',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 46,
    borderRadius: 8,
    marginBottom: Platform.OS === 'ios' ? 25 : 15,
    alignSelf: 'center',
  },
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
    height: 200,
  },
  txtConfrm: {
    fontSize: 15,
    color: Colors.fontDark,
    marginTop: 18,
    textAlign: 'center',
  },
  imgStyle: {
    width: 240,
    height: 220,
    alignSelf: 'center',
    marginTop: -122,
  },
  viewImg: {
    width: '100%',
    height: 240,
  },
  btnInput: {
    borderColor: '#E3E3E3',
    borderRadius: 10,
    borderWidth: 1,
    width: 270,
    height: 48,
    // paddingVertical: 13,
    // paddingHorizontal: 10,
    alignItems: 'center',
    //  marginTop:40
  },
});
