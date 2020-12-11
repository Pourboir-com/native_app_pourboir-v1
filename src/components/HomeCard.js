import React,{useState} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";
import {Colors} from '../constants/Theme';
import RatingStar from './RatingComponent';

const HomeCard = ({navigation,img,rating,name,distance,services}) => {

    // Star arrayyyyyyyy
    const [starSelect, setstarSelect] = useState(3.5)
    const obj = [1, 2, 3, 4, 5];
    const onPressStar = (v) => {
        setstarSelect(v);
    }

    return  <TouchableOpacity 
                onPress={()=> navigation.navigate('OpenCardReviews', {
                    img: img,
                    rating: starSelect,
                    name: name,
                    distance: distance,
                    services: services,
                })}
                style={[styles.viewItemConatier]}>
                    <ImageBackground style={styles.imgCard} source={{uri: img}}>
                    <TouchableOpacity
                        style={styles.btnCross}
                        >
                                    <Entypo
                                        name="cross"
                                        size={21}
                                        color="#485460"
                                        style={{ backgroundColor: Colors.yellow, borderRadius: 20 }}
                                    />
                         </TouchableOpacity>
                        <View style={{}}>
                        <View style={{ flexDirection: "row" }}>
                                        {obj.map((v, i) => {
                                            return (
                                                <TouchableOpacity onPress={() => { onPressStar(v) }}>
                                                    <RatingStar starSize={17}
                                                        type={ v <= starSelect ? "filled" : 
                                                        v === starSelect + 0.5 ? "half" : "empty" 
                                                    }
                                                        notRatedStarColor='rgba(255,255,255, 0.6)'
                                                    />
                                                </TouchableOpacity>
                                            )
                                        }
                                        )}
                                    </View>
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
    btnCross: {
        backgroundColor: "#fff", position: "absolute", alignSelf: "flex-end",
        borderRadius: 20, margin: -1, right: 0, width: 30, height: 30,
        justifyContent: "center", alignItems: "center"
    },
    txt2Card:{
        color:"#EDEFEE", fontSize:13
    },
    imgCard:{
        flex:1, padding:12, justifyContent:'space-between'
    },
    viewItemConatier:{
        width: Dimensions.get('window').width * 0.45,
        height: Dimensions.get('window').width * 0.56,
        margin: Dimensions.get('window').width * 0.02, backgroundColor: "red",
        borderRadius: 12, overflow: "hidden"
    },
    txtHeading:{
        fontSize:22, marginTop:10,width:"90%", alignSelf:"center"
    }
})