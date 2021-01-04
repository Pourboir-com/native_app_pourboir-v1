import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  BackHandler
} from 'react-native';
import { Header, Body, Left, Right } from 'native-base';
import { Colors } from '../constants/Theme';
import { MaterialIcons, FontAwesome, Fontisto, FontAwesome5 } from "@expo/vector-icons";
import { spacing } from '../constants/layout';


const GlobalHeader = (props) => {

  const goBackHandler = (props) => {
    if (props.setting) {
      props.navigation.navigate('Setting')
    }
    else {
      props.navigation.goBack(null);
    }
  };


  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: '',
      headerRight: null,
      headerShown: true,
      headerLeft: null,
      headerTransparent: true,
      headerTitleAlign: 'left',
      // headerRightContainerStyle: { paddingRight: spacing(2) }
    });
  });

  React.useEffect(() => {


    const handleBackButtonClick = () => {
      if (props.setting) {
        props.navigation.navigate('Setting')
        return true
      }
    };

    props.navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    });
    props.navigation.addListener('blur', () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    });
  })


  return (
    <SafeAreaView
      style={{

        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        width: '100%',
        zIndex: 10,
        backgroundColor: props.backgroundColor ? props.backgroundColor : Colors.yellow,
        // backgroundColor:"red",
        position: props.position == 'absolute' ? 'absolute' : 'relative',
        elevation: 0,
        shadowOpacity: 0,
        shadowRadius: 0,
        height: props.height ? props.height : 110,
      }}>
      <View
        style={[
          {
            shadowOffset: { height: 0, width: 0 },
            shadowOpacity: 0,
            elevation: 0,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 35,
            zIndex: -10,
            borderRadius: 20,
            flexDirection: 'row',
            // backgroundColor: props.backgroundColor
            //   ? props.backgroundColor
            //   : Colors.yellow,
            // height: props.height ? props.height : 70,
          },
          Platform.OS === 'ios' ? { borderBottomWidth: 0 } : {},
        ]}>

        {props.left ? null :
          <Left style={{ flex: props.leftText ? 2 : 1, marginBottom: 10 }}>
            <View style={styles.viewLeft}>
              {props.leftText && (
                <Text
                  style={{
                    color: props.color ? props.color : Colors.fontLight,
                    fontSize: props.fontSize ? props.fontSize : 20,
                    alignSelf: "flex-start"
                  }}
                >{props.leftText}</Text>
              )}

              {props.arrow === true && (
                <TouchableOpacity
                  style={{ paddingRight: 5, paddingVertical: 10, padding: 10 }}

                  onPress={() =>
                    goBackHandler(props)
                  }>
                  <MaterialIcons
                    name={'arrow-back'}
                    size={props.Arrowsize ? props.Arrowsize : 24}
                    color={props.BackIconColor ? props.BackIconColor : '#000'}
                  />
                </TouchableOpacity>
              )}
            </View>
          </Left>
        }

        <Body
          style={{
            flex: props.centerHide === true ? 0 : 5,
            left: 20,
            marginBottom: 12,
            justifyContent: 'center',
            alignItems: props.headingALign ? props.headingALign : 'center',
            alignSelf: 'center',
          }}>
          {props.headingText !== '' ? (
            <View
              style={{
                alignItems: 'center',
                flexDirection: props.HeadingRow ? props.HeadingRow : 'column',
              }}>
              <View style={{ alignItems: 'center' }}>
                <Text
                  numberOfLines={1}
                  style={{
                    textAlign: 'center',
                    color: props.color ? props.color : '#FFFFFF',
                    fontSize: props.fontSize ? props.fontSize : 24,
                    fontFamily: 'ProximaNovaBold'
                  }}>
                  {props.headingText}
                </Text>
                {props.secondText ? (
                  <Text
                    numberOfLines={1}
                    style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      marginBottom: -8,
                    }}>
                    {props.secondText}
                  </Text>
                ) : null}
              </View>
            </View>
          ) : null}
        </Body>

        <Right
          style={{
            flex: props.leftText ? 1 : 2,
            height: '100%',
            alignItems: "center"
          }}>
          {props.isFavouriteLoading ? (
            <View style={[styles.arrowView, { marginRight: 10 }]}>
              <ActivityIndicator size={25} color="#FFF" />
            </View>
          ) : props.RightImg ? (
            <View style={styles.viewImg}>
              <FontAwesome name="user-circle-o" size={45} color="#fff" />
            </View>
          ) : null}
        </Right>
      </View>
      {props.search ?
        <View style={styles.viewSearch}>
          <Fontisto name="search" size={20} color={Colors.yellow} />
          <TextInput
            placeholder="Recherchez votre restaurant"
            style={{ flex: 1, height: 43, paddingHorizontal: 15 }}
          />
        </View> : null
      }
    </SafeAreaView>
  );
};

export default GlobalHeader;

const styles = StyleSheet.create({
  profileImgStyle: {
    width: 160,
    height: 30,
    marginTop: 137,
  },
  viewSearch: {
    width: "90%", flexDirection: "row", alignSelf: "center", height: 45, paddingHorizontal: 15,
    backgroundColor: "#fff", marginBottom: 15, borderRadius: 10, alignItems: "center"
  },
  btnDrawer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    marginTop: 10,
  },
  viewImg: {
    width: 45,
    height: 45,
    borderRadius: 30, backgroundColor: "#bbb",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginTop: -10
  },
  viewLeft: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8
  },
});
