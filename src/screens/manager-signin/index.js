import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import i18n from '../../li8n';
import { useMutation } from 'react-query';
import { LOGIN } from '../../queries';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [login] = useMutation(LOGIN);

  const handleLogin = async () => {
    await login(
      {
        email,
        password,
      },
      {
        onSuccess: res => {
          navigation.navigate('ManagerStaff');
          // localStorage.setItem('token', res.token);
        },
        onError: () => {
          alert('Please enter correct email or password!');
        },
      },
    );
  };

  return (
    <ImageBackground
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}
      source={require('../../assets/images/splashBg.png')}
    >
      <KeyboardAvoidingView
        // keyboardVerticalOffset={-500}
        behavior="position"
        enabled
        style={{ width: '100%' }}
      >
        <View style={styles.whiteCard}>
          <Text style={styles.topHeading}>{i18n.t('already_acc')}</Text>
          <View style={{ marginVertical: 30, width: '93%' }}>
            <TextInput
              style={styles.input}
              onChangeText={e => setEmail(e)}
              value={email}
              placeholder={i18n.t('email')}
              placeholderTextColor="#707070"
            />
            <TextInput
              style={styles.input}
              onChangeText={e => setPassword(e)}
              value={password}
              placeholder={i18n.t('password_sign')}
              secureTextEntry={true}
              placeholderTextColor="#707070"
            />
            <TouchableOpacity
              onPress={handleLogin}
              disabled={email && password ? false : true}
              activeOpacity={0.6}
              style={[
                styles.btn_save,
                email && password
                  ? { backgroundColor: '#FCDF6F' }
                  : { backgroundColor: '#e0e0e0' },
              ]}
            >
              <Text style={styles.saveTxt}>{i18n.t('to_login')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={{ paddingVertical: 34 }}>
        <Text style={styles.text1}>{i18n.t('no_acc')}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ManagerSignUp')}
          activeOpacity={0.6}
        >
          <Text style={styles.signupTxt}>{i18n.t('im_register')}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SignIn;
