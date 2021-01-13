import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { Colors } from '../../constants/Theme';
import { Entypo } from "@expo/vector-icons";
import * as Location from 'expo-location';

import i18n from '../../li8n';

const NoLocation = () => {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  let text = 'Waiting..';
  const excessLocation =async ()=>{
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return <View style={styles.container}>
    <Entypo name="location-pin" size={220} color={Colors.yellow} style={{ marginBottom: -150, zIndex: 10 }} />
    <View style={{ width: 150, height: 150, backgroundColor: '#fff', borderRadius: 100, zIndex: -10 }}></View>
    <Text style={{ fontSize: 20, color: Colors.fontDark, marginTop: 20 }}>
      {i18n.t('activate_your_geolocation')}
    </Text>
    <TouchableOpacity style={styles.btnStyle} onPress={excessLocation}>
      <Text style={styles.txtColor}>
        {i18n.t('activate_geoloc')}
      </Text>
    </TouchableOpacity>
  </View>;
};
export default NoLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: "#EEEFEE",
    justifyContent: "center", alignItems: "center",
  },
  btnStyle: {
    backgroundColor: Colors.yellow, width: "85%", position: "absolute",
    bottom: 30, justifyContent: "center", alignItems: "center", paddingVertical: 15,
    borderRadius: 5,
  },
  txtColor: {
    color: Colors.fontLight, fontSize: 16,
  },
});