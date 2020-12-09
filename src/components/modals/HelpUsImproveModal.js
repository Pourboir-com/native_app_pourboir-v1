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

const imgSitting = require('../../assets/images/sittingtable.png')

const HelpUsImproveModal = ({isVisible, handleModalClose}) => {
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
                source={imgSitting} 
                style={styles.imgStyle} 
                resizeMode="contain"
            />
        </View>
      
        <Text style={styles.txtName}>
            Aidez-nous à améliorer notre app. Donnez nous le nom de votre serveur
        </Text>
        <Text
          style={styles.txtConfrm}>
            Nous le contacterons prochainement pour l’ajouter dans notre app.
        </Text>
        <TextInput 
        placeholder="Le nom de votre serveur"
        style={styles.inputStyle} 
        />
        <TouchableOpacity style={styles.btnConfrm}>
            <Text style={styles.txtBtnConfrm}>Ajouter</Text>
        </TouchableOpacity>
    </Overlay>
  );
};


export default HelpUsImproveModal;

const styles = StyleSheet.create({
  container: {
    width: '88%',
    alignItems: 'center',
    justifyContent: 'center',
    padding:0,
    overflow:"hidden",
    borderRadius:15
  },
  inputStyle:{
    width:"85%", height:50, backgroundColor:"#F8F8F8", borderRadius:10, marginVertical:15,
    fontSize:16, textAlign:"center"
  },
  txtBtnConfrm:{
      fontSize:16, color:Colors.fontLight, 
  },
  btnConfrm:{
      backgroundColor:'#EAEAEA',
      borderRadius:10,
      width:"85%",
      justifyContent:"center", alignItems:"center", 
      marginBottom:25, height:45
  },
  txtConfrm:{
    fontSize: 16,
    color: Colors.fontLight,
    marginTop: 10,
    textAlign:"center",
    marginHorizontal:20
  },
  txtName:{
      fontSize:16,
      color: Colors.fontDark,
      marginTop:10,textAlign:"center",marginHorizontal:20
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
