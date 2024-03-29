import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
const imgWaiter = require('../../assets/images/work-time.png');
const imgBg = require('../../assets/images/Group7.png');
import CheckBox from 'react-native-check-box';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from 'native-base';
import Context from '../../contextApi/context';

const AddNicheModal = ({
  setNicheModalVisible,
  nicheModalVisible,
  setNicheModalData,
  nicheModalData,
}) => {
  const [dayOfWeek, setDayOfWeek] = useState(localizationContext.t('monday'));
  const [morning, setMorning] = useState();
  const [noon, setNoon] = useState();
  const [evening, setEvening] = useState();
  const [morningChecked, setMorningChecked] = useState(false);
  const [noonChecked, setNoonChecked] = useState(false);
  const [eveningChecked, setEveningChecked] = useState(false);
  const [times, setTimes] = useState([]);
  const { localizationContext } = useContext(Context);

  const Add = () => {
    setNicheModalData([...nicheModalData, { day: dayOfWeek, slot: times }]);
    setNicheModalVisible(false);
    setTimes([]);
    setEveningChecked(false);
    setNoonChecked(false);
    setMorningChecked(false);
  };
  const unChecked = day => {
    for (var i = 0; i < times.length; i++) {
      if (times[i] === day) {
        times.splice(i, 1);
      }
    }
  };

  let validation = dayOfWeek && times?.length;

  return (
    <Overlay
      overlayStyle={styles.container}
      isVisible={nicheModalVisible}
      onBackdropPress={() => setNicheModalVisible(false)}
    >
      <ImageBackground
        style={styles.imgBgStyle}
        source={imgBg}
        resizeMode="stretch"
      >
        <View style={styles.viewImg}>
          <TouchableOpacity
            onPress={() => setNicheModalVisible(false)}
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

      <KeyboardAwareScrollView style={{ width: '90%' }}>
        <Text
          style={[
            styles.txtConfrm,
            { fontFamily: 'ProximaNovaBold', fontSize: 18 },
          ]}
        >
          {localizationContext.t('add_niche')}
        </Text>
        <View
          style={{
            width: '100%',
            marginVertical: 26,
            marginBottom: 42,
            borderRadius: 15,
            borderColor: '#ccc',
            borderWidth: 1,
          }}
        >
          <Picker
            mode="dropdown"
            iosHeader="Jour de la semaine"
            style={{ height: 50, paddingHorizontal: 8, width: '100%' }}
            selectedValue={dayOfWeek}
            onValueChange={e => setDayOfWeek(e)}
            textStyle={{ width: '100%' }}
          >
            <Picker.Item label={localizationContext.t('monday')} value={'Monday'} />
            <Picker.Item label={localizationContext.t('tuesday')} value={'Tuesday'} />
            <Picker.Item label={localizationContext.t('wednesday')} value={'Wednesday'} />
            <Picker.Item label={localizationContext.t('thursday')} value={'Thursday'} />
            <Picker.Item label={localizationContext.t('friday')} value={'Friday'} />
            <Picker.Item label={localizationContext.t('saturday')} value={'Saturday'} />
            <Picker.Item label={localizationContext.t('sunday')} value={'Sunday'} />
          </Picker>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginLeft: 4,
            marginBottom: 32,
            marginTop: -17,
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
                setMorning(
                  morningChecked === true
                    ? unChecked('morning')
                    : times.push('morning'),
                ),
                setMorningChecked(!morningChecked),
              ]}
              isChecked={morningChecked}
              checkedImage={
                <Image
                  style={{ width: 18 }}
                  resizeMode={'contain'}
                  source={require('../../assets/images/checked-modal.png')}
                />
              }
              unCheckedImage={
                <Image
                  style={{ width: 19 }}
                  resizeMode={'contain'}
                  source={require('../../assets/images/unchecked-modal.png')}
                />
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => [
              setMorning(
                morningChecked === true
                  ? unChecked('morning')
                  : times.push('morning'),
              ),
              setMorningChecked(!morningChecked),
            ]}
            style={{ paddingLeft: 10, marginTop: -4 }}
          >
            <Text
              style={{
                fontFamily: !morningChecked ? 'ProximaNova' : 'ProximaNovaBold',
                color: '#1E272E',
                fontSize: 16,
                paddingTop: -1,
              }}
            >
              {localizationContext.t('morning')} 6:00 - 12:00
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginLeft: 4,
            marginBottom: 32,
            marginTop: -17,
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
                setNoon(
                  noonChecked ? unChecked('mid-day') : times.push('mid-day'),
                ),
                setNoonChecked(!noonChecked),
              ]}
              isChecked={noonChecked}
              checkedImage={
                <Image
                  style={{ width: 18 }}
                  resizeMode={'contain'}
                  source={require('../../assets/images/checked-modal.png')}
                />
              }
              unCheckedImage={
                <Image
                  style={{ width: 19 }}
                  resizeMode={'contain'}
                  source={require('../../assets/images/unchecked-modal.png')}
                />
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => [
              setNoon(
                noonChecked ? unChecked('mid-day') : times.push('mid-day'),
              ),
              setNoonChecked(!noonChecked),
            ]}
            style={{ paddingLeft: 10, marginTop: -4 }}
          >
            <Text
              style={{
                fontFamily: !noonChecked ? 'ProximaNova' : 'ProximaNovaBold',
                color: '#1E272E',
                fontSize: 16,
              }}
            >
              {localizationContext.t('noon')} 12:00 - 18:00
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            marginLeft: 4,
            marginBottom: 32,
            marginTop: -17,
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
                setEvening(
                  eveningChecked ? unChecked('evening') : times.push('evening'),
                ),
                setEveningChecked(!eveningChecked),
              ]}
              isChecked={eveningChecked}
              checkedImage={
                <Image
                  style={{ width: 18 }}
                  resizeMode={'contain'}
                  source={require('../../assets/images/checked-modal.png')}
                />
              }
              unCheckedImage={
                <Image
                  style={{ width: 19 }}
                  resizeMode={'contain'}
                  source={require('../../assets/images/unchecked-modal.png')}
                />
              }
            />
          </View>
          <TouchableOpacity
            onPress={() => [
              setEvening(
                eveningChecked ? unChecked('evening') : times.push('evening'),
              ),
              setEveningChecked(!eveningChecked),
            ]}
            style={{ paddingLeft: 10, marginTop: -4 }}
          >
            <Text
              style={{
                fontFamily: !eveningChecked ? 'ProximaNova' : 'ProximaNovaBold',
                color: '#1E272E',
                fontSize: 16,
              }}
            >
              {/* {localizationContext.t('still_work')} */}
              {localizationContext.t('evening')} 18:00 - 00:00
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={Add}
          disabled={validation ? false : true}
          style={[
            styles.btn_yellow,
            validation && {
              backgroundColor: Colors.yellow,
            },
          ]}
        >
          <Text
            style={{
              fontFamily: 'ProximaNova',
              fontSize: 16,
              color: Colors.fontDark,
            }}
          >
            {localizationContext.t('add')}
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </Overlay>
  );
};

export default AddNicheModal;

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
    fontSize: 16,
    color: Colors.fontDark,
    marginTop: 18,
    textAlign: 'center',
  },
  imgStyle: {
    width: 240,
    height: 200,
    alignSelf: 'center',
    marginTop: -122,
  },
  viewImg: {
    width: '100%',
    height: 240,
  },
});
