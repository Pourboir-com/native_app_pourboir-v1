import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import {Colors} from '../../constants/Theme';

const imgLogo = require('../../assets/images/imgLogo.png')
const imgWaiter = require('../../assets/images/waiter2.png')

const SocialLogin = ({navigation}) => {
    return <View style={styles.container}>
        <StatusBar backgroundColor={Colors.yellow} />
        <Image 
            style={styles.imgLogoStyle} 
            source={imgLogo} 
            resizeMode="contain"
        />
        <View style={styles.viewImg}>
        <Image 
            style={styles.imgStyle} 
            source={imgWaiter} 
            resizeMode="contain"
        />
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.btnFb}>
            <FontAwesome name="facebook" color="#fff" size={20} />
            <Text style={styles.textFb}>Continuer avec Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.btnGoogle}>
            <FontAwesome name="google" color="#fff" size={20} />
            <Text style={styles.textFb}>Continuer avec Google</Text>
        </TouchableOpacity>
        <Text  style={styles.txtCreatingAcc}>
            En créant votre compte vous acceptez nos
        </Text>
        <View style={styles.viewbtns}>
            <TouchableOpacity>
                <Text style={{color:"#0050A0",fontSize:12}}>conditions d’utilisation</Text>
            </TouchableOpacity>
            <View style={{width:1,height:10, backgroundColor:"grey",marginHorizontal:10}} />
            <TouchableOpacity>
                <Text style={{color:"#0050A0",fontSize:12}}>politique de confidentialité</Text>
            </TouchableOpacity>
        </View>
    </View>
}
export default SocialLogin;

const styles = StyleSheet.create({
    container: {
        flex:1,
         alignItems:'center',
        backgroundColor:Colors.yellow,
    },
    txtCreatingAcc:{
        color:Colors.fontLight,fontSize:12, marginTop:10
    },
    viewImg:{
        width:"80%", alignSelf:"center",height: Dimensions.get('window').height*0.5,
        marginBottom:10
    },
    viewbtns:{
        flexDirection:"row", width:"90%", justifyContent:"center", alignItems:"center"
    },
    imgStyle:{
        // flex:1,
        width:300,
        height: Dimensions.get('window').height*0.5,
        // marginBottom:20
    },
    imgLogoStyle:{
        width:200,
        height:50,
        marginTop:20
        // height:'auto'
    },
    btnFb:{
        width:'90%', flexDirection:"row", backgroundColor:"#4267B2", borderRadius:10,
        justifyContent:"center", alignItems:"center", height:50,marginBottom:15,
    },
    btnGoogle:{
        width:'90%', flexDirection:"row", backgroundColor:"#DD4B39", borderRadius:10,
        justifyContent:"center", alignItems:"center", height:50,marginBottom:15
    },
    textFb:{
        color:"#fff", marginLeft:10
    }
})