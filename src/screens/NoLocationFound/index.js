import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Theme';
import { Entypo } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
var getCountry = require('country-currency-map').getCountry;
var formatCurrency = require('country-currency-map').formatCurrency;
import i18n from '../../li8n';
import { Platform } from 'react-native';
import { Linking } from 'react-native';
import { getAsyncStorageValues } from '../../constants';

const NoLocation = ({ navigation, route }) => {
  const { notification } = route || {};
  const validateNavigation = async () => {
    const { userInfo = {} } = await getAsyncStorageValues();
    if (notification === false) {
      navigation.replace('Notification');
    } else {
      if (userInfo?.user_id) {
        navigation.replace('Home', { crossIcon: false, ad: true });
      } else {
        navigation.replace('socialLogin');
      }
    }
  };

  const excessLocation = async () => {
    let locationStats = await Location.requestForegroundPermissionsAsync();
    if (locationStats.status !== 'granted') {
      if (Platform.OS === 'ios') {
        validateNavigation();
      }
      return;
    }
    const location = Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Lowest,
    })
      .then(pos => {
        Location.reverseGeocodeAsync({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }).then(async res => {
          let currency = getCountry(res[0]?.country);
          let formattedCurrency = formatCurrency('', currency?.currency);
          await AsyncStorage.setItem(
            '@Currency',
            JSON.stringify({
              currency: formattedCurrency || '',
            }),
          );
          validateNavigation();
        });
      })
      .catch(() => {
        validateNavigation();
      });
  };

  return (
    <View style={styles.container}>
      <Entypo
        name="location-pin"
        size={220}
        color={Colors.yellow}
        style={{ marginBottom: -150, zIndex: 10 }}
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
        {i18n.t('activate_your_geolocation')}
      </Text>
      <TouchableOpacity style={styles.btnStyle} onPress={excessLocation}>
        <Text style={styles.txtColor}>{i18n.t('carry_on')}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default NoLocation;

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
