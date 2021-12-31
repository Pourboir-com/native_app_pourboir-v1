import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { Colors } from '../../constants/Theme';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import Track from '../../assets/images/track.png';
import { getAsyncStorageValues } from '../../constants';
import Context from '../../contextApi/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoAppTracking = ({ navigation, route }) => {
  const { localizationContext } = useContext(Context);

  const { checkLocation, notification } = route.params || {};
  const validateNavigation = async () => {
    const { userInfo = {} } = await getAsyncStorageValues();

    if (checkLocation == false) {
      navigation.replace('NoLocation', { notification });
    } else if (notification == false) {
      navigation.replace('Notification');
    } else {
      if (userInfo?.user_id) {
        navigation.replace('Home', { crossIcon: false, ad: true });
      } else {
        navigation.replace('socialLogin');
      }
    }
  };

  const excessAppTracking = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await requestTrackingPermissionsAsync();
      if (status === 'granted') {
        validateNavigation();
      } else {
        validateNavigation();
      }
      await AsyncStorage.setItem('trackingDone', 'true');
    } else {
      validateNavigation();
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Track} />
      <Text
        style={{
          fontSize: 18,
          color: Colors.fontDark,
          marginTop: 30,
          marginHorizontal: 30,
          textAlign: 'center',
          fontFamily: 'ProximaNovaSemiBold',
        }}
      >
        {localizationContext.t('activate_app_tracking')}
      </Text>
      <TouchableOpacity style={styles.btnStyle} onPress={excessAppTracking}>
        <Text style={styles.txtColor}>{localizationContext.t('carry_on')}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default NoAppTracking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEFEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    backgroundColor: Colors.yellow,
    width: '85%',
    position: 'absolute',
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 5,
  },
  txtColor: {
    color: Colors.fontLight,
    fontSize: 16,
  },
});
