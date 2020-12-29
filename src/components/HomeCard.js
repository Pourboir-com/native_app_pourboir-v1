import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";
import { Colors } from '../constants/Theme';
import RatingStar from './RatingComponent';

import { loadAsync } from 'expo-font';

const HomeCard = ({ navigation, img, rating, name, distance, services, loading, crossIcon, deleteCall }) => {
// const {crossIcon} = routes.params;
    // Star arrayyyyyyyy
    const [starSelect, setstarSelect] = useState(3.5)
    const obj = [1, 2, 3, 4, 5];
    const onPressStar = (v) => {
        setstarSelect(v);
    }
    return <View>
        {loading ?
            <View style={styles.viewDummyCard} >
                <View style={styles.view1dumy}></View>
                <View style={styles.view2dumy} />
                <View style={styles.view2dumy} />
                <View style={styles.view2dumy} />
            </View> :
            <TouchableOpacity
                onPress={() => navigation.navigate('OpenCardReviews', {
                    img: img,
                    rating: starSelect,
                    name: name,
                    distance: distance,
                    services: services,
                })}
                style={[styles.viewItemConatier]}>
                <ImageBackground style={styles.imgCard} source={{ uri: img }}>
                    {
                        crossIcon &&
                        <TouchableOpacity
                            style={styles.btnCross}
                            onPress={deleteCall}
                        >
                            <View style={{borderRadius:20, overflow:"hidden"}}>
                            <Entypo
                                name="cross"
                                size={21}
                                color="#485460"
                                style={{ backgroundColor: Colors.yellow, borderRadius: 20 }}
                            />
                            </View>
                        </TouchableOpacity>
                    }
                    <View style={{}}>
                        <View style={{ flexDirection: "row" }}>
                            {obj.map((v, i) => {
                                return (
                                    <TouchableOpacity onPress={() => { onPressStar(v) }}>
                                        <RatingStar starSize={17}
                                            type={v <= starSelect ? "filled" :
                                                v === starSelect + 0.5 ? "half" : "empty"
                                            }
                                            notRatedStarColor='rgba(255,255,255, 0.6)'
                                        />
                                    </TouchableOpacity>
                                )
                            }
                            )}
                        </View>
                        <Text style={{ color: "red" }}>
                        </Text>
                    </View>
                    <View style={{}}>
                        <Text style={[styles.txtName
                            ,{fontFamily:'ProximaNovaBold'}
                            ]}>{name}</Text>
                        <View style={styles.view2Card}>
                            <Text style={[styles.txt2Card
                                ,{fontFamily:'ProximaNova'}
                                ]}>{distance}</Text>
                            <Text style={[styles.txt2Card
                                ,{fontFamily:'ProximaNova'}
                                ]}>{services.length} serveurs</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        }
    </View>
}
export default HomeCard;

const styles = StyleSheet.create({
    view2Card: {
        flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between"
    },
    txtName:{
        color: "#fff", fontSize: 18, 
        // fontFamily:'ProximaNovaBold'
    },
    view1dumy: {
        width: "90%", height: 20, backgroundColor: "#F6F6F6", marginBottom: 70
    },
    view2dumy: {
        width: "90%", height: 15, backgroundColor: "#F6F6F6", marginTop: 10
    },
    btnCross: {
        backgroundColor: "#fff", position: "absolute", alignSelf: "flex-end",
        borderRadius: 20, margin: -1, right: 0, width: 30, height: 30,
        justifyContent: "center", alignItems: "center"
    },
    txt2Card: {
        color: "#EDEFEE", fontSize: 12, 
        // fontFamily:'ProximaNova'
    },
    imgCard: {
        flex: 1, padding: 12, justifyContent: 'space-between'
    },
    viewItemConatier: {
        width: Dimensions.get('window').width * 0.45,
        height: Dimensions.get('window').width * 0.56,
        margin: Dimensions.get('window').width * 0.02, backgroundColor: "rgba(0,0,0,0.1)",
        borderRadius: 12, overflow: "hidden"
    },
    viewDummyCard: {
        width: Dimensions.get('window').width * 0.45,
        height: 210,
        margin: Dimensions.get('window').width * 0.02, backgroundColor: "#fff",
        borderRadius: 12, overflow: "hidden",
        padding: 20
    },
    txtHeading: {
        fontSize: 22, marginTop: 10, width: "90%", alignSelf: "center"
    }
})