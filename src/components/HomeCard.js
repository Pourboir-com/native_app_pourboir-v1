import React from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Rating, AirbnbRating } from 'react-native-ratings';
import {Colors} from '../constants/Theme';

const HomeCard = ({navigation,img,rating,name,distance,services}) => {
            <TouchableOpacity 
                onPress={()=> navigation.navigate('OpenCardReviews', {
                    img: img,
                    rating: rate,
                    name: name,
                    distance: distance,
                    services: services,
                })}
                style={[styles.viewItemConatier]}>
                    <ImageBackground style={styles.imgCard} source={{uri: img}}>
                        <View style={{}}>
                        <Rating
                            style={{ paddingVertical: 0, alignSelf:"flex-start" }}
                            imageSize={20}
                            ratingCount={5}
                        />
                        <Text style={{color:"red"}}>
                        </Text>
                        </View>
                        <View style={{}}>
                            <Text style={{color:"#fff", fontSize:17}}>{name}</Text>
                            <View style={styles.view2Card}>
                                <Text style={styles.txt2Card}>{distance}</Text>
                                <Text style={styles.txt2Card}>{services.length} serveurs</Text>
                            </View>
                        </View>
                    </ImageBackground>
            </TouchableOpacity>
}
export default HomeCard;

const styles = StyleSheet.create({
    view2Card:{
        flexDirection:"row", width:"100%", alignItems:"center", justifyContent:"space-between"
    },
    txt2Card:{
        color:"#EDEFEE", fontSize:13
    },
    imgCard:{
        flex:1, padding:12, justifyContent:'space-between'
    },
    viewItemConatier:{
        width:Dimensions.get('window').width*0.44,
        height:Dimensions.get('window').width*0.55,
        margin:Dimensions.get('window').width*0.03, backgroundColor:"red",
        borderRadius:12,overflow:"hidden"
    },
    txtHeading:{
        fontSize:22, marginTop:10,width:"90%", alignSelf:"center"
    }
})