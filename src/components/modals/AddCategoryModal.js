import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
const imgWaiter = require('../../assets/images/Choose-rafiki.png');
const imgBg = require('../../assets/images/Group7.png');
import i18n from '../../li8n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const AddCategoryModal = ({ setCategModal, categModal, categArr, setCategArr }) => {
  const [category, setCategory] = useState('');
  // const validation = category  !== ''
  const AddCateg = async () => {
    try {
     await setCategArr([...categArr, category])
      setCategory('')
      setCategModal(false)
    console.log(categArr)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Overlay
      overlayStyle={styles.container}
      isVisible={categModal}
      onBackdropPress={() => setCategModal(false)}
    >
      <ImageBackground
        style={styles.imgBgStyle}
        source={imgBg}
        resizeMode="stretch"
      >
        <View style={styles.viewImg}>
          <TouchableOpacity
            onPress={() => setCategModal(false)}
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
        // scrollEnabled={showDropdown ? false : true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollToOverflowEnabled={true}
        enableAutomaticScroll={Platform.OS === 'ios' ? true : false}
        resetScrollToCoords={{ x: 0, y: 0 }}
        style={{ marginTop: 50 }}
      >
        <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNovaBold' }]}>
          {/* {i18n.t('add_exp')} */}
          New Category
        </Text>
        <Text
          style={{
            fontFamily: 'ProximaNova',
            fontSize: 14,
            color: Colors.fontDark,
            textAlign: 'center',
            paddingTop: 10,
          }}
        >
          {/* {i18n.t('add_exp')} */}
          Choose a category, for example : Main course
        </Text>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // width: 270,
            marginVertical: 15,
            marginTop: 35,
          }}
        >
          <View style={(styles.input_box, { alignItems: 'center' })}>
            <TextInput
              style={styles.inputsTopTow}
              onChangeText={e => setCategory(e)}
              value={category}
              placeholder={'Category'}
              placeholderTextColor={'#707375'}
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
            onPress={AddCateg}
            disabled={!category ? true : false}
            style={[
              styles.btn_yellow,
              category && {
                backgroundColor: Colors.yellow,
              },
            ]}
          // onPress={AddCateg}
          style={styles.btn_yellow}
        >
          <Text
            style={{
              fontFamily: 'ProximaNova',
              fontSize: 12,
              color: Colors.fontDark,
            }}
          >
            {/* {i18n.t('add')} */}
            Confirm
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </Overlay>
  );
};

export default AddCategoryModal;

const styles = StyleSheet.create({
  inputsTopTow: {
    borderColor: '#E3E3E3',
    borderWidth: 1,
    width: 270,
    // paddingLeft: 10,
    // paddingRight: 10,
    alignSelf: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  btn_yellow: {
    backgroundColor: '#EAEAEA',
    width: '86%',
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
    marginTop: -72,
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
