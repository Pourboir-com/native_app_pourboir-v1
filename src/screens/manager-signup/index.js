import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import i18n from '../../li8n';
import { useNavigation } from '@react-navigation/core';

const ManagerSignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [index, setIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(3);
  const [values, setValues] = useState('');

  const data = [
    {
      value: name,
      setValue: setName,
      placeholder: i18n.t('res_name'),
    },
    {
      value: address,
      setValue: setAddress,
      placeholder: i18n.t('address'),
    },
    {
      value: postalCode,
      setValue: setPostalCode,
      placeholder: i18n.t('code_postal'),
    },
    {
      value: lastName,
      setValue: setLastName,
      placeholder: i18n.t('last_name'),
    },
    {
      value: firstName,
      setValue: setFirstName,
      placeholder: i18n.t('first_name'),
    },
    {
      value: email,
      setValue: setEmail,
      placeholder: i18n.t('email'),
    },
    {
      value: password,
      setValue: setPassword,
      placeholder: i18n.t('password_sign'),
    },
  ];

  const handleNext = () => {
    if (lastIndex === 7) {
      setIndex(0);
      setLastIndex(3);
    }
    if (index !== 3) {
      setIndex(index + 3);
    } else {
      setIndex(index + 2);
    }
    setLastIndex(lastIndex + 2);
  };

  const handlePrev = () => {
    if (index === 0) {
      alert('no more next');
    }
    if (index === 3) {
      setIndex(index - 3);
    } else {
      setIndex(index - 2);
    }
    setLastIndex(lastIndex - 2);
  };

  const handleSubmit = () => {
    name.length > 0 &&
    address.length > 0 &&
    postalCode.length > 0 &&
    lastName.length > 0 &&
    firstName.length > 0 &&
    email.length > 0 &&
    password.length > 0
      ? alert('Form Submitted Successfully ..')
      : alert('Please fill all required fields ..');
  };

  return (
    <ImageBackground
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}
      source={require('../../assets/images/splashBg.png')}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
        behavior="position"
        keyboardVerticalOffset={-500}
        enabled
      >
        <View style={styles.whiteCard}>
          <Text style={styles.topHeading}>
            {index === 0
              ? i18n.t('resturant')
              : index === 3
              ? i18n.t('manager')
              : null}
          </Text>
          <View
            style={{
              marginVertical: 30,
              width: '93%',
            }}
          >
            {data.slice(index, lastIndex).map((v, i) => (
              <TextInput
                key={i}
                style={styles.input}
                onChangeText={e => [v.setValue(e), setValues(v.value, i)]}
                value={v.value}
                placeholder={v.placeholder}
                placeholderTextColor="#707070"
              />
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
              marginBottom: 4,
            }}
          >
            <TouchableOpacity
              style={styles.btn_return}
              onPress={index === 0 ? () => navigation.goBack() : handlePrev}
              activeOpacity={0.4}
            >
              <Text style={styles.btn_txt}>{i18n.t('return')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={
                name.length > 0 &&
                address.length > 0 &&
                postalCode.length > 0 &&
                lastName.length > 0 &&
                firstName.length > 0 &&
                email.length > 0 &&
                password.length > 0 &&
                lastIndex === 0
                  ? 1
                  : 0.4
              }
              style={styles.btn_yellow}
              onPress={lastIndex === 7 ? handleSubmit : handleNext}
            >
              <Text style={styles.btn_txt}>
                {lastIndex === 7 ? i18n.t('to_login') : i18n.t('carry_on')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ManagerSignUp;
