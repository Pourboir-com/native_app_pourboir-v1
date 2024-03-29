import React, { useState, useContext } from 'react';
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
  KeyboardAvoidingView,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
const imgWaiter = require('../../assets/images/sittingtable.png');
const imgBg = require('../../assets/images/Group7.png');
const validator = require('validator');
import { FontAwesome5 } from '@expo/vector-icons';
import Context from '../../contextApi/context';

const AddWaiterCookModal = ({
  addModal,
  setAddModal,
  modalType,
  setWaiters,
  setCooks,
  waiters,
  cooks,
  handleAddStaff,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { localizationContext } = useContext(Context);

  let emailError = email && !validator?.isEmail(email);
  const validation = name && !emailError && email;
  const handleAdd = () => {
    handleAddStaff(email, name);
    // setWaiters([...waiters, { waiter_name: name, waiter_email: email }]);
    setAddModal(false);
    setName('');
    setEmail('');
  };

  return (
    <Overlay
      overlayStyle={styles.container}
      isVisible={addModal}
      onBackdropPress={() => setAddModal(false)}
    >
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        bounces={false}
        scrollEnabled={false}
        style={{
          width: '100%',
        }}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 10}
          behavior="position"
          enabled
        >
          <ImageBackground
            style={styles.imgBgStyle}
            source={imgBg}
            resizeMode="stretch"
          >
            <View style={styles.viewImg}>
              <TouchableOpacity
                onPress={() => setAddModal(false)}
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

          <Text style={[styles.txtConfrm, { fontFamily: 'ProximaNovaBold' }]}>
            {modalType === 'waiter'
              ? localizationContext.t('name_of_waiter')
              : localizationContext.t('name_of_cook')}
          </Text>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              // width: 270,
              marginVertical: 15,
              marginTop: 25,
            }}
          >
            <View style={(styles.input_box, { alignItems: 'center' })}>
              <TextInput
                style={styles.inputsTopTow}
                onChangeText={e => setName(e)}
                value={name}
                placeholder={
                  modalType === 'waiter'
                    ? localizationContext.t('waiter_name_placeholder')
                    : localizationContext.t('cook_name_placeholder')
                }
                placeholderTextColor={'#707375'}
              />
            </View>
            <View style={{ flexDirection: 'row', position: 'relative', marginTop: 10 }}>

              <TextInput
                style={styles.inputsTopTow}
                onChangeText={e => setEmail(e)}
                value={email}
                placeholder={
                  modalType === 'waiter'
                    ? localizationContext.t('waiter_email')
                    : localizationContext.t('cook_email')
                }
                placeholderTextColor={'#707375'}
              />
              <Text style={{ position: 'absolute', right: 3.5, top: 4 }}>
                {emailError && (
                  <FontAwesome5
                    name="exclamation-circle"
                    size={13}
                    color="red"
                  />
                )}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={handleAdd}
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
              {localizationContext.t('confirm')}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </Overlay>
  );
};

export default AddWaiterCookModal;

const styles = StyleSheet.create({
  inputsTopTow: {
    borderColor: '#E3E3E3',
    borderWidth: 1,
    width: 270,
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
    height: 220,
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
    marginTop: -112,
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
    alignItems: 'center',
  },
});
