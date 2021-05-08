import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import styles from './styles';
import i18n from '../../li8n';
const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

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
      
        <View style={styles.whiteCard}>
          <Text style={styles.topHeading}>{i18n.t('already_acc')}</Text>
          <View style={{ marginVertical: 30, width: '93%' }}>
          <KeyboardAvoidingView
        keyboardVerticalOffset={-500}
        behavior="position"
        enabled
        style={{ width: '100%' }}
      >
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
              onPress={() => navigation.navigate('ManagerStaff')}
              activeOpacity={0.7}
              style={styles.btn_save}
            >
              <Text style={styles.saveTxt}>{i18n.t('to_login')}</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>

          </View>
        </View>

        <View style={{ paddingVertical: 34 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ManagerSignUp')}
            activeOpacity={0.6}
          >
            <Text style={styles.text1}>{i18n.t('no_acc')}</Text>
            <Text style={styles.signupTxt}>{i18n.t('im_register')}</Text>
          </TouchableOpacity>
        </View>
    </ImageBackground>
  );
};

export default SignIn;
