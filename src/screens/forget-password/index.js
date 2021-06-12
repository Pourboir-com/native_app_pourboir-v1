import React, { useState } from 'react';
import {
  ImageBackground,
  Text,
  Platform,
  View,
  ActivityIndicator,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import styles from '../manager-signin/styles';
import i18n from '../../li8n';
import { useMutation } from 'react-query';
import { RESET_PASSWORD } from '../../queries';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalHeader from '../../components/GlobalHeader';

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const [loading, setLoading] = useState(false);
  const handleResetPassword = async () => {
    setLoading(true);
    await resetPassword(
      {
        email,
      },
      {
        onSuccess: async res => {
          navigation.replace('SignIn');
          setLoading(false);
          alert('Please check the new password in your email.')
        },
        onError: () => {
          alert('Please enter the correct email.');
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
          <Text style={styles.topHeading}>{i18n.t('forget_password')}</Text>
          <View style={{ marginVertical: 30, width: '93%' }}>
            <TextInput
              style={styles.input}
              onChangeText={e => setEmail(e)}
              value={email}
              placeholder={i18n.t('email')}
              keyboardType="email-address"
              placeholderTextColor="#707070"
            />
            <TouchableOpacity
              onPress={handleResetPassword}
              disabled={loading ? true : email ? false : true}
              activeOpacity={0.6}
              style={[
                styles.btn_save,
                {marginTop: 30 },
                email
                  ? { backgroundColor: '#FCDF6F' }
                  : { backgroundColor: '#e0e0e0' },
              ]}
            >
              {loading ? (
                <ActivityIndicator size={25} color="#EBC11B" />
              ) : (
                <Text style={styles.saveTxt}>{i18n.t('reinitialiser')}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default ForgetPassword;
