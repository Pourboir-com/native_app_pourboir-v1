import React, { useContext, useState } from 'react';
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
import uuid from 'react-native-uuid';
import { useMutation } from 'react-query';
import Context from '../../contextApi/context';
import { PUBLISH_MENU } from '../../queries';

const AddCategoryModal = ({
  setCategModal,
  categModal,
  categArr,
  setCategArr,
  dishState,
  setDishState,
  refetchMenus,
  restaurant_id,
}) => {
  const { state } = useContext(Context);

  const [category, setCategory] = useState('');
  const [menu_id, setMenuId] = useState(new Date().valueOf());
  const [publishMenu, { isLoading: publishMenuLoading }] = useMutation(
    PUBLISH_MENU,
  );
  const validation = category;
  const AddCateg = async () => {
    // try {
    //   await setCategArr([
    //     ...categArr,
    //     {
    //       category: category,
    //       idMenu: "x"+uuid.v4(),
    //       dishes: [],
    //     },
    //   ]);
    //   setCategory('');
    //   setMenuId();
    //   setCategModal(false);
    // } catch (error) {
    //   console.log(error);
    // }

    await publishMenu(
      {
        category: category || '',
        user_id: state.userDetails.user_id || '',
        place_id: restaurant_id || '',
        dishes: [],
      },
      {
        onSuccess: () => {
          // alert('added new category successfully');
          setCategModal(false);
          refetchMenus();
          setCategArr(categArr);
        },
        onError: e => {
          alert(e.response?.data?.message);
        },
      },
    );
  };
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
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollToOverflowEnabled={true}
        enableAutomaticScroll={Platform.OS === 'ios' ? true : false}
        resetScrollToCoords={{ x: 0, y: 0 }}
        style={{ marginTop: 50 }}
      >
        <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNovaBold' }]}>
          {i18n.t('new_categ')}
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
          {i18n.t('choose_categ')}
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
              placeholder={i18n.t('category')}
              placeholderTextColor={'#707375'}
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={AddCateg}
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
              fontSize: 14,
              color: Colors.fontDark,
            }}
          >
            {i18n.t('confirm')}
            {/* Confirm */}
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
    width: 270,
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
