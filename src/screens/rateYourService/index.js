import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import GlobalHeader from '../../components/GlobalHeader'

const Home = () => {
    return <View style={styles.container}>
        <StatusBar backgroundColor="gold" />
        <GlobalHeader
        arrow={true}
        headingText="Notez votre serveur"
        fontSize={17}
        color="#000"
        />
        <View style={styles.viewProfile}>
            <View style={styles.viewImg}>
              <FontAwesome name="user-circle-o" size={60} color="#fff" />
            </View>
            <Text style={styles.txtName}>Amy Farha</Text>
        </View>
        <Text style={{fontSize:30, marginTop:20}}>Hoome</Text>
    </View>
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex:1,
        // justifyContent:"center",
         alignItems:'center',
        backgroundColor:"#EEF0EF"
    },
    txtName:{
        alignSelf:"center",marginTop:10, fontSize:17,
    },
    viewImg: {
        width: 60,
        height: 60,
        borderRadius:30, backgroundColor:"#bbb",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:5,
        marginTop:40,
        alignSelf:"center"
      },
    viewProfile:{
        backgroundColor:"orange", width:"100%", height:210, marginTop:-20,
        borderBottomLeftRadius:40, borderBottomRightRadius:40
    }
})