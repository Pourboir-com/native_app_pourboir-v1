import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar} from 'react-native';
import {Colors} from '../../constants/Theme';
import { MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";

const NoLocation = () => {
    return <View style={styles.container}>
            <Entypo name="location-pin" size={220} color={Colors.yellow} style={{marginBottom:-150, zIndex:10}} />
        <View style={{width:150, height:150, backgroundColor:'#fff',borderRadius:100, zIndex:-10}}></View>
        <Text style={{fontSize:20,color:Colors.fontDark, marginTop:20}}>
            Activez votre geolocalisation
        </Text>
        <TouchableOpacity style={styles.btnStyle}>
            <Text style={styles.txtColor}>Activer la geolocalisation</Text>
        </TouchableOpacity>
        </View>
}
export default NoLocation;

const styles = StyleSheet.create({
    container: {
        flex:1, backgroundColor:"#EEEFEE",
        justifyContent:"center", alignItems:"center"
    },
    btnStyle:{
        backgroundColor:Colors.yellow, width:"85%", position:"absolute",
        bottom:30, justifyContent:"center", alignItems:"center", paddingVertical:15,
        borderRadius:5
    },
    txtColor:{
        color: Colors.fontLight, fontSize:16
    }
})