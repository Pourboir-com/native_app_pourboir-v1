import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';
import {Overlay} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../../constants/Theme';

const imgWaiter = require('../../assets/images/waiter2.png')

const ThanksRatingModal = ({isVisible, handleModalClose}) => {
  return (
    <Overlay
      overlayStyle={styles.container}
      isVisible={isVisible}
      onBackdropPress={handleModalClose}>
        <View style={styles.viewImg}>
            <TouchableOpacity
                onPress={handleModalClose}
                style={{alignSelf: 'flex-end',margin:10}}>
                <Entypo name="cross" size={29} color="#485460" />
            </TouchableOpacity>
            <Image 
                source={imgWaiter} 
                style={styles.imgStyle} 
                resizeMode="contain"
            />
        </View>
      
        <Text
          style={styles.txtConfrm}>
          Confirmez que vous êtes serveur pour
        </Text>
        <Text style={styles.txtName}>{name}</Text>
        <TouchableOpacity style={styles.btnConfrm}>
            <Text style={styles.txtBtnConfrm}>Je confirme</Text>
        </TouchableOpacity>
    </Overlay>
  );
};


export default ThanksRatingModal;

const styles = StyleSheet.create({
  container: {
    width: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    padding:0,
    overflow:"hidden",
    borderRadius:15
  },
  txtBtnConfrm:{
      fontSize:16, color:Colors.fontDark
  },
  btnConfrm:{
      backgroundColor:Colors.yellow,
      borderRadius:10,
      width:"80%",
      justifyContent:"center", alignItems:"center", 
      marginVertical:25, height:45
  },
  txtConfrm:{
    fontSize: 16,
    color: Colors.fontLight,
    marginTop: 10,
    width:180, textAlign:"center"
  },
  txtName:{
      fontSize:24,
      color: Colors.fontDark,
      marginTop:10
  },
  imgStyle:{
    width:220, height:200, alignSelf:"center",marginTop:-30,
    marginRight:-20
  },
  viewImg:{
    backgroundColor:Colors.yellow, width:"100%", height:240,
    borderBottomRightRadius:30,
    borderBottomLeftRadius:80,
    overflow:"hidden"
  }
});
