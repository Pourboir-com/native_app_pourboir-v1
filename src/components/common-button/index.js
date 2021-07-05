import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../constants/Theme';

const CommonButton = props => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  console.log(props)
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      disabled={ props.disable === false ? props.disable : (props.validate || props.validateBlue ? false : true)   }
      onPress={() => {
        props.navigation &&
          navigation.navigate(
            props.navigation,
            props.navigationData && props.navigationData,
          );
        props.dispatch && props.dispatch();
      }}
      style={{...styles.btnValider, backgroundColor: (props.color) ? props.color : (props.validate ? Colors.yellow  : '#EAEAEA' && props.validateBlue ? '#2F3676'  : '#EAEAEA' ) }}
    >
      {loading ? (
        <ActivityIndicator size={29} color="#EBC11B" />
      ) : (
        <Text style={{ fontFamily: 'ProximaNova', fontSize: 16, color: props.validateBlue ? 'white': 'black' }}>
          {props.title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  btnValider: {
    backgroundColor: Colors.yellow,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    marginTop: 3,
    alignSelf: 'center',
    marginBottom: Platform.OS === 'ios' ? 15 : 0,
  },
});
