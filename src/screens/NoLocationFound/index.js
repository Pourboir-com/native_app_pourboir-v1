import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Theme';
import { Entypo } from '@expo/vector-icons';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
var getCountry = require('country-currency-map').getCountry;
var formatCurrency = require('country-currency-map').formatCurrency;
import i18n from '../../li8n';
import { getAsyncStorageValues } from '../../constants';
import { upperTitleCase } from '../../util';
import Context from '../../contextApi/context';
import * as actionTypes from '../../contextApi/actionTypes';

const NoLocation = ({ navigation }) => {
  const { dispatch } = useContext(Context);
  const InitializeStates = async () => {
    const { userInfo = {} } = await getAsyncStorageValues();
    if (userInfo?.user_id) {
      let userDetails = {
        name: upperTitleCase(userInfo?.name),
        image: userInfo?.image,
        email: userInfo?.email,
        accessToken: userInfo?.accessToken,
        user_id: userInfo?.user_id,
        phone_number: userInfo.phone_number || '',
        username: userInfo?.username || '',
        description: userInfo?.description || '',
        last_name: userInfo?.last_name || '',
      };
      dispatch({
        type: actionTypes.USER_DETAILS,
        payload: userDetails,
      });
    }
  };

  const excessLocation = async () => {
    let values = await Location.requestForegroundPermissionsAsync();
    if (values === 'granted') {
      InitializeStates();
      navigation.replace('Notification');
    }
    Location.getCurrentPositionAsync()
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
        });
        InitializeStates();
        navigation.replace('Notification');
      })
      .catch(() => {
        InitializeStates();
        navigation.replace('Notification');
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
