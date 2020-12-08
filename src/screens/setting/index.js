import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import GlobalHeader from '../../components/GlobalHeader';

const Setting = () => {

    const ratingCompleted = (rating) => {
      console.log("Rating is: " + rating)
    }

    return <View style={styles.container}>
        <GlobalHeader
            arrow={true}
            headingText="Parametre"
            fontSize={17}
            color="#000"
        />
        <StatusBar backgroundColor="orange" />
        <View style={styles.viewProfile}>
            <View style={styles.viewImg}>
              <FontAwesome name="user-circle-o" size={90} color="#fff" />
            </View>
            <Text style={styles.txtName}>Christine Zhou</Text>
        </View>
        <View style={styles.viewBtnConatiner}>
            <TouchableOpacity style={styles.viewItem}>
                <Text>Notez I'application</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.viewItem}>
                <Text>Contactez nous</Text>
            </TouchableOpacity>      
            <TouchableOpacity style={[styles.viewItem,{marginBottom:0}]}>
                <Text>Vous etes serveur?</Text>
            </TouchableOpacity>           
        </View>
        <TouchableOpacity style={styles.btnValider}>
            <Text>Se deconnecter</Text>
        </TouchableOpacity>
    </View>
}
export default Setting;

const styles = StyleSheet.create({
    container: {
        flex:1,
        // justifyContent:"center",
         alignItems:'center',
        backgroundColor:"#EEF0EF"
    },
    viewBtnConatiner:{
        width:"90%", alignSelf:"center", borderRadius:10, marginTop:-45, overflow:"hidden", backgroundColor:"#EEF0EF",
    },
    viewItem:{
        width:"100%", height:53,backgroundColor:"#fff",marginBottom:1, flexDirection:"row", 
        alignItems:"center", paddingHorizontal:10
    },
    btnValider:{
        backgroundColor:"orange", width:"90%", justifyContent:"center",alignItems:"center",
        height:50, borderRadius:8, marginTop:3, position:"absolute",bottom:10
    },
    txtName:{
        alignSelf:"center",marginTop:10, fontSize:19, fontWeight:"bold"
    },
    viewImg: {
        width: 90,
        height: 90,
        borderRadius:50, backgroundColor:"#bbb",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:5,
        marginTop:50,
        alignSelf:"center"
      },
    viewProfile:{
        backgroundColor:"orange", width:"100%", height:Dimensions.get('window').height*0.5, marginTop:-20,
        borderBottomLeftRadius:40, borderBottomRightRadius:40
    }
})