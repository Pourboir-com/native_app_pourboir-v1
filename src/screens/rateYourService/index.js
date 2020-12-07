import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import GlobalHeader from '../../components/GlobalHeader';
import {rateList as RATELIST} from '../../dummyData/DummyData'
import { Rating, AirbnbRating } from 'react-native-ratings';

const Home = () => {

    const ratingCompleted = (rating) => {
      console.log("Rating is: " + rating)
    }

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
        <View style={styles.viewFlatlist}>
            <FlatList
            data={RATELIST}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={(itemData) => (
                <View style={styles.viewListCard}>
                    <Text>{itemData.item.heading}</Text>
                    <Rating
                        // showRating
                        // onFinishRating={this.ratingCompleted}
                        style={{ paddingVertical: 5, width:"100%" }}
                        imageSize={20}
                        readonly={true}
                        // ratingCount={4}
                        // starContainerStyle={{backgroundColor:"blue", padding:5,margin:5}}
                    />
                </View>
            )}
            />
        </View>
        <TouchableOpacity style={styles.btnValider}>
            <Text>Valider</Text>
        </TouchableOpacity>
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
    viewFlatlist:{
        backgroundColor:"transparent",width:"100%", flex:1, marginTop:-50
    },
    btnValider:{
        backgroundColor:"orange", width:"90%", justifyContent:"center",alignItems:"center",
        height:50, borderRadius:8, marginBottom:15, marginTop:3
    },
    viewListCard:{
        backgroundColor:"#fff", width:"90%", alignSelf:"center", marginBottom:15,
        borderRadius:10, justifyContent:"center", alignItems:"center", paddingVertical:7
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
        marginTop:30,
        alignSelf:"center"
      },
    viewProfile:{
        backgroundColor:"orange", width:"100%", height:190, marginTop:-20,
        borderBottomLeftRadius:40, borderBottomRightRadius:40
    }
})