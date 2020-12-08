import React from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
// import GlobalHeader from '../../components/GlobalHeader'
// import {placesList as LIST} from '../../dummyData/DummyData'
import { Rating, AirbnbRating } from 'react-native-ratings';

const ReviewDetails = ({navigation, route}) => {
    console.log('routesssss',route.params)
    const { img, name, rating, distance, services } = route.params;
    return <View style={styles.container}>
        <StatusBar backgroundColor="orange" hidden={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.viewImg}>
                <ImageBackground 
                    source={{uri: img}} 
                    style={{flex:1, justifyContent:"space-between"}}
                >
                    <View style={styles.viewHeader}>
                        <TouchableOpacity onPress={()=> navigation.goBack()}>
                            <MaterialIcons name={"arrow-back"} size={25} color="#fff" />
                        </TouchableOpacity>
                        <View style={{flex:1,}}>
                            <Text style={styles.txtName}>{name}</Text>
                        </View>
                    </View>
                    <View style={styles.viewBottom}>
                        <Rating
                            // showRating
                            // onFinishRating={this.ratingCompleted}
                            style={{ paddingVertical: 0, alignSelf:"flex-start" }}
                            imageSize={20}
                            ratingCount={5}
                        />
                        <Text style={{color:"#fff"}}>{distance}</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={{flexDirection:"row",marginTop:15, marginHorizontal:15}}>
                <Text style={styles.txtHeading}>Les serveurs</Text>
                <Text style={styles.txtNumRaters}>{services.length}</Text>
            </View>
            {/* <FlatList
                data={LIST}
                showsVerticalScrollIndicator={false}
                // numColumns={2}
                keyExtractor={(item) => item._id}
                renderItem={(itemData) => (
                    <TouchableOpacity style={styles.viewItemConatier}>
                    </TouchableOpacity>
                )}
            /> */}
        </ScrollView>
    </View>
}
export default ReviewDetails;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#F1F3F2"
    },
    txtNumRaters:{
        backgroundColor:"orange", padding:2,paddingHorizontal:9,marginLeft:10,fontSize:18,
        borderRadius:9
    },
    txtHeading:{
        alignSelf:"center", fontSize:20
    },
    viewHeader:{
        flexDirection:"row",marginTop:30, paddingHorizontal:10
    },
    viewBottom:{
        flexDirection:"row",marginBottom:20, justifyContent:"space-between",
        alignItems:"center", paddingHorizontal:20
    },
    txtName:{
        textAlign:"center",marginLeft:-25,color:"#fff", fontSize:20
    },
    viewImg:{
        width:"100%", height:230, borderBottomLeftRadius:20,borderBottomRightRadius:20,
        overflow:"hidden",
    },
    viewItemConatier:{
    },
})