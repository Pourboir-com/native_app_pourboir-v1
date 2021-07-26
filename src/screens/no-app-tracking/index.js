import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { Colors } from '../../constants/Theme';
import i18n from '../../li8n';
import { Linking } from 'react-native';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import Track from '../../assets/images/track.png';

const NoAppTracking = ({ navigation }) => {
  const excessAppTracking = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await requestTrackingPermissionsAsync();
      if (status === 'granted') {
        navigation.replace('NoLocation');
        return;
      } else {
        return Linking.openURL('app-settings:');
      }
    } else {
      navigation.replace('NoLocation');
      return;
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
        {i18n.t('activate_app_tracking')}
      </Text>
      <TouchableOpacity style={styles.btnStyle} onPress={excessAppTracking}>
        <Text style={styles.txtColor}>{i18n.t('carry_on')}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default NoAppTracking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
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
    borderRadius: 10,
  },
  txtColor: {
    color: Colors.fontLight,
    fontSize: 16,
  },
});
