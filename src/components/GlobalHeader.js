import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
  Platform,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {Header, Body, Left, Right} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
// import Colors, {Fonts} from '../constants/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

const GlobalHeader = (props) => {
  const goBackHandler = (props) => {
    props.navigation.goBack();
  };

  console.log('Propssss', props);

  return (
    <View
      style={{
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        width: '100%',
      }}>
      <Header
        style={[
          {
            shadowOffset: {height: 0, width: 0},
            shadowOpacity: 0,
            elevation: 0,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            height: 100,
            zIndex: -10,
            borderRadius: 20,
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : 'red',
              height: props.height ? props.height : 70,
          },
          Platform.OS === 'ios' ? {borderBottomWidth: 0} : {},
        ]}>

        {props.left ? null :
        <Left style={{flex: 1, marginBottom: 20}}>
          <View style={styles.viewLeft}>
            {props.Drawer && (
              <TouchableOpacity
              style={styles.btnDrawer}
                onPress={() => {
                  props.navigation.toggleDrawer();
                  // console.log('Navigation', navigation);
                  // console.log('Propssss', props);
                }}>
                <Entypo name="menu" size={35} color="#fff" />
              </TouchableOpacity>
            )}

            {props.arrow === true && (
              <TouchableOpacity
              style={{paddingRight: 5, paddingTop: 19}}
                // onPress={() => {
                //   // this.props.otherNavigation
                //   //   ? this.props.navigation.navigate.otherNavigation
                //   // :
                //   // this.props.navigation.goBack();
                //   // goBackHandler();
                //   alert('dsads');
                //   props.navigation.goBack();
                // }}
                onPress={() => goBackHandler(props)}>
                <MaterialIcons
                  name={'arrow-back'}
                  size={props.Arrowsize ? props.Arrowsize : 30}
                  color={props.BackIconColor ? props.BackIconColor : null}
                  />
              </TouchableOpacity>
            )}
          </View>
        </Left>
      }

        <Body
          style={{
            flex: props.secondText ? 5 : 6,
            left: 20,
            marginBottom: 12,
            justifyContent: 'center',
            width: '100%',
            alignItems: props.headingALign ? props.headingALign : 'center',
            alignSelf: 'center',
          }}>
          {props.headingText !== '' ? (
            <View
              style={{
                alignItems: 'center',
                flexDirection: props.HeadingRow ? props.HeadingRow : 'column',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  numberOfLines={1}
                  style={{
                    textAlign: 'center',
                    // fontFamily: Fonts.boldenVan_regular,
                    marginTop: props.headingMargin ? props.headingMargin : 15,
                    color: props.color ? props.color : '#FFFFFF',
                    fontSize: props.fontSize ? props.fontSize : 24,
                  }}>
                  {props.headingText}
                </Text>
                {props.secondText ? (
                  <Text
                    numberOfLines={1}
                    style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      // fontSize: 15,
                      // marginTop: -2,
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
            flex: 2,
            // marginBottom: 20,
            height: '100%',
          }}>
          {props.isFavouriteLoading ? (
            <View style={[styles.arrowView, {marginRight: 10}]}>
              <ActivityIndicator size={25} color="#FFF" />
            </View>
          ) : props.RightIcon == true ? (
            <TouchableOpacity style={styles.arrowView}>
              <Entypo name="circle-with-cross" size={33} color="#fff" />
            </TouchableOpacity>
          ) : null}
        </Right>
      </Header>
    </View>
  );
};

export default GlobalHeader;

const styles = StyleSheet.create({
  profileImgStyle: {
    width: 160,
    height: 30,
    marginTop: 137,
  },
  btnDrawer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    marginTop: 10,
  },
  arrowView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight:10
  },
  viewLeft: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
