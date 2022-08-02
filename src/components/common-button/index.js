import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../constants/Theme';

const CommonButton = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={props.opacity || 0.5}
      disabled={props.disable === false ? false : true}
      onPress={
        props.onPress
          ? props.onPress
          : () => {
              props.navigation &&
                navigation.navigate(
                  props.navigation,
                  props.navigationData && props.navigationData,
                );
              props.dispatch && props.dispatch();
            }
      }
      style={
        (styles.btnValider,
        {
          ...styles.btnValider,
          backgroundColor: props.disable ? '#EAEAEA' : Colors.yellow,
        })
      }
    >
      {props.loading ? (
        <ActivityIndicator size={29} color="#EBC11B" />
      ) : (
        <Text
          style={{
            fontFamily: props.fontFamily || 'ProximaNova',
            fontSize: 16,
          }}
        >
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
    zIndex: 99999,
    marginBottom: Platform.OS === 'ios' ? 15 : 0,
  },
});
