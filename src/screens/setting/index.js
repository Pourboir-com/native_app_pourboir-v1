import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import GlobalHeader from '../../components/GlobalHeader';
import {Colors} from '../../constants/Theme';

const Setting = () => {

    const ratingCompleted = (rating) => {
      console.log("Rating is: " + rating)
    }

    return <View style={styles.container}>
        <GlobalHeader
            arrow={true}
            headingText="Parametre"
            fontSize={18}
            color="#000"
        />
        <StatusBar backgroundColor={Colors.yellow} />
        <View style={styles.viewProfile}>
            <View style={styles.viewImg}>
              <FontAwesome name="user-circle-o" size={120} color="#fff" />
            </View>
            <Text style={styles.txtName}>Christine Zhou</Text>
        </View>
        <View style={styles.viewBtnConatiner}>
            <TouchableOpacity style={styles.viewItem}>
                <View style={styles.viewIcon}>
                    <FontAwesome name="star" size={20} color={Colors.yellow} />
                </View>
                <Text>Notez I'application</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.viewItem}>
                <View style={styles.viewIcon}>
                    <FontAwesome name="envelope" size={16} color={Colors.yellow} />
                </View>
                <Text>Contactez nous</Text>
            </TouchableOpacity>      
            <TouchableOpacity style={[styles.viewItem,{marginBottom:0}]}>
                <View style={styles.viewIcon}>
                    <FontAwesome name="cutlery" size={16} color={Colors.yellow} />
                </View>
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
    viewIcon:{
        width:30, height:30, backgroundColor:"#FFF6D4", borderRadius:5, marginRight:10,
        justifyContent:"center", alignItems:"center"
    },
    viewBtnConatiner:{
        width:"90%", alignSelf:"center", borderRadius:15, marginTop:-45, overflow:"hidden", backgroundColor:"#EEF0EF",
    },
    viewItem:{
        width:"100%", height:60,backgroundColor:"#fff",marginBottom:1, flexDirection:"row", 
        alignItems:"center", paddingHorizontal:10
    },
    btnValider:{
        backgroundColor:Colors.yellow, width:"90%", justifyContent:"center",alignItems:"center",
        height:50, borderRadius:8, marginTop:3, position:"absolute",bottom:10
    },
    txtName:{
        alignSelf:"center",marginTop:10, fontSize:24, color:Colors.fontDark
    },
    viewImg: {
        width: 120,
        height: 120,
        borderRadius:80, backgroundColor:"#bbb",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:5,
        marginTop:50,
        alignSelf:"center"
      },
    viewProfile:{
        backgroundColor:Colors.yellow, width:"100%", height:Dimensions.get('window').height*0.5, marginTop:-20,
        borderBottomLeftRadius:40, borderBottomRightRadius:40
    }
})