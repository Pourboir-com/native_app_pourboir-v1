import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Theme';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import i18n from '../../li8n';
import { Linking } from 'react-native';
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

const NoAppTracking = () => {
  const navigation = useNavigation();

  const excessAppTracking = async () => {
    const { status } = await requestTrackingPermissionsAsync();
    if (status === 'granted') {
      navigation.replace('Home', { crossIcon: false });
    } else {
      return Linking.openURL('app-settings:');
    }
  };

  return (
    <View style={styles.container}>
      <AntDesign
        style={{ marginBottom: -135, zIndex: 10, marginLeft: 20 }}
        name="notification"
        size={120}
        color={Colors.yellow}
      />
      <View
        style={{
          width: 150,
          height: 150,
          backgroundColor: '#fff',
          borderRadius: 100,
          zIndex: -10,
        }}
      ></View>
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
        <Text style={styles.txtColor}>{i18n.t('allow_app_tracking')}</Text>
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
