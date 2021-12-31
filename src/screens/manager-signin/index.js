import React, { useState, useContext } from 'react';
import {
  ImageBackground,
  Text,
  Platform,
  View,
  ActivityIndicator,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { useMutation } from 'react-query';
import { LOGIN } from '../../queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import GlobalHeader from '../../components/GlobalHeader';
import Context from '../../contextApi/context';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [login] = useMutation(LOGIN);
  const [loading, setLoading] = useState(false);
  const { localizationContext } = useContext(Context);

  const handleLogin = async () => {
    setLoading(true);
    await login(
      {
        email,
        password,
      },
      {
        onSuccess: async res => {
          axios.defaults.headers.common.Authorization = `Bearer ${res.token}`;
          await AsyncStorage.setItem('@manager_details', JSON.stringify(res));
          navigation.replace('ManagerStaff');
          setLoading(false);
        },
        onError: () => {
          alert('Please enter correct email or password!');
          setLoading(false);
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
      <View
        style={{
          width: '100%',
          height: 100,
          zIndex: 9999,
        }}
      >
        <GlobalHeader
          arrow={true}
          fontSize={17}
          color={'black'}
          navigation={navigation}
          setting={false}
          backgroundColor={'transparent'}
          borderRadius={true}
        />
      </View>
      <KeyboardAwareScrollView
        bounces={false}
        enableOnAndroid={true}
        extraScrollHeight={10}
        keyboardShouldPersistTaps="handled"
        scrollToOverflowEnabled={true}
        enableAutomaticScroll={Platform.OS === 'ios' ? true : false}
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{
          width: '100%',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <View style={styles.whiteCard}>
          <Text style={styles.topHeading}>
            {localizationContext.t('already_acc')}
          </Text>
          <View style={{ marginVertical: 30, width: '93%' }}>
            <TextInput
              style={styles.input}
              onChangeText={e => setEmail(e)}
              value={email}
              placeholder={localizationContext.t('email')}
              keyboardType="email-address"
              placeholderTextColor="#707070"
            />
            <TextInput
              style={styles.input}
              onChangeText={e => setPassword(e)}
              value={password}
              placeholder={localizationContext.t('password_sign')}
              secureTextEntry={true}
              placeholderTextColor="#707070"
            />
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading ? true : email && password ? false : true}
              activeOpacity={0.6}
              style={[
                styles.btn_save,
                email && password
                  ? { backgroundColor: '#FCDF6F' }
                  : { backgroundColor: '#e0e0e0' },
              ]}
            >
              {loading ? (
                <ActivityIndicator size={25} color="#EBC11B" />
              ) : (
                <Text style={styles.saveTxt}>
                  {localizationContext.t('to_login')}
                </Text>
              )}
            </TouchableOpacity>
            <View
              style={{
                marginTop: 20,
                marginBottom: -20,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.text1}>
                {localizationContext.t('forget_password')}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgetPassword')}
                activeOpacity={0.6}
              >
                <Text style={styles.signupTxt}>
                  {localizationContext.t('here')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ paddingVertical: 34 }}>
          <Text style={styles.text1}>{localizationContext.t('no_acc')}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ManagerSignUp')}
            activeOpacity={0.6}
          >
            <Text style={styles.signupTxt}>
              {localizationContext.t('im_register')}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default SignIn;
