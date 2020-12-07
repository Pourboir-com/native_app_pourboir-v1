import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
// import imgPath1 from '../../assets/images/businessLeader.png'

const SocialLogin = () => {
    return <View style={styles.container}>
        <StatusBar backgroundColor="gold" />
        <Text style={{fontSize:30, marginTop:20}}>POURBOIR'</Text>
        <Text>More than tips</Text>
        {/* <Image 
            style={styles.imgStyle} 
            source={imgPath1} 
        /> */}
        <TouchableOpacity style={styles.btnFb}>
            <FontAwesome name="facebook" color="#fff" size={20} />
            <Text style={styles.textFb}>Continuer avec Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnGoogle}>
            <FontAwesome name="google" color="#fff" size={20} />
            <Text style={styles.textFb}>Continuer avec Google</Text>
        </TouchableOpacity>
    </View>
}
export default SocialLogin;

const styles = StyleSheet.create({
    container: {
        flex:1,
        // justifyContent:"center",
         alignItems:'center',
        backgroundColor:"gold"
    },
    imgStyle:{
        width:150, 
        height: Dimensions.get('window').height*0.5
    },
    btnFb:{
        width:'90%', flexDirection:"row", backgroundColor:"#3b5998", borderRadius:5,
        justifyContent:"center", alignItems:"center", height:50,marginBottom:15
    },
    btnGoogle:{
        width:'90%', flexDirection:"row", backgroundColor:"#de5246", borderRadius:5,
        justifyContent:"center", alignItems:"center", height:50,marginBottom:15
    },
    textFb:{
        color:"#fff", marginLeft:10
    }
})