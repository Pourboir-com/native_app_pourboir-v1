import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  Platform,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {Header, Body, Left, Right} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../constants/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { MaterialIcons, FontAwesome, Fontisto } from "@expo/vector-icons";


const GlobalHeader = (props) => {
  const goBackHandler = (props) => {
    props.navigation.goBack();
  };

  // console.log('Propssss', props);

  return (
    <View
      style={{
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        width: '100%',
        zIndex:10,
        backgroundColor:Colors.yellow
        // borderBottomLeftRadius:20, borderBottomRightRadius:20
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
            // height: 100,
            zIndex: -10,
            borderRadius: 20,
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : Colors.yellow,
              height: props.height ? props.height : 70,
          },
          Platform.OS === 'ios' ? {borderBottomWidth: 0} : {},
        ]}>

        {props.left ? null :
        <Left style={{flex: props.leftText ? 2 : 1, marginBottom: 20}}>
          <View style={styles.viewLeft}>
            {props.leftText && (
              <Text 
                style={{
                    color: props.color ? props.color : Colors.fontLight,
                    fontSize: props.fontSize ? props.fontSize : 20,
                    alignSelf:"flex-start"
                }}
            >{props.leftText}</Text>
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
            marginBottom: 15,
            justifyContent: 'center',
            // width: '100%',
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
            flex: props.leftText ? 1 : 2,
            // marginBottom: 20,
            height: '100%',
            // justifyContent:"center",
            alignItems:"center"
          }}>
          {props.isFavouriteLoading ? (
            <View style={[styles.arrowView, {marginRight: 10}]}>
              <ActivityIndicator size={25} color="#FFF" />
            </View>
          ) : props.RightImg ? (
            <View style={styles.viewImg}>
              <FontAwesome name="user-circle-o" size={45} color="#fff" />
            </View>
          ) : null}
        </Right>
      </Header>
      {props.search ? 
        <View style={styles.viewSearch}>
            <Fontisto name="search" size={20} color={Colors.yellow} />
            <TextInput 
            placeholder="Recherchez votre restaurant"
              style={{flex:1, height:43,paddingHorizontal:15}}
            />
        </View> : null
      }
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
  viewSearch:{
    width:"90%", flexDirection:"row", alignSelf:"center", height:45, paddingHorizontal:15,
    backgroundColor:"#fff", marginBottom:15, borderRadius:10, alignItems:"center"
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
    borderRadius:30, backgroundColor:"#bbb",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:5,
    marginTop:-10
  },
  viewLeft: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:8
  },
});
