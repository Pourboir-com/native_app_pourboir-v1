import React, {useState} from 'react'
import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import { Rating, AirbnbRating } from 'react-native-ratings';
import ConfirmationModal from '../../components/modals/ConfirmModal';
import HelpUsImproveModal from '../../components/modals/HelpUsImproveModal'
import {Colors} from '../../constants/Theme';

const ReviewDetails = ({navigation, route}) => {
    // console.log('routesssss',route.params)
    const { img, name, rating, distance, services } = route.params;
    const [confirmModalVisible, setconfirmModalVisible] = useState(false);
    const [helpUsModalVisible, sethelpUsModalVisible] = useState(false);

    const handleModalClose = () => {
        setconfirmModalVisible(false);
        sethelpUsModalVisible(false);
      };

      const handleConfirmModalOpen = () => {
        setconfirmModalVisible(true);
      };

      const handleHelpUsModalOpen = () => {
        //   alert('working')
          sethelpUsModalVisible(true);
      }

    return <View style={styles.container}>
        <StatusBar hidden={true} />
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.viewImg}>
                <ImageBackground 
                    source={{uri: img}} 
                    style={{flex:1, justifyContent:"space-between"}}
                >
                    <View style={styles.viewHeader}>
                        <TouchableOpacity style={{paddingRight:20, paddingBottom:20}} 
                        onPress={()=> navigation.goBack()}
                        >
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
            <FlatList
                data={services}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id}
                renderItem={(itemData) => (
                    <TouchableOpacity style={styles.viewItemConatier}>
                        <View style={{flexDirection:"row", alignItems:"center"}}>
                            <Image 
                                style={{width:45, height:45, borderRadius:30}}
                                source={{uri: itemData.item.imgAvatar}} 
                            />
                            <View style={{marginLeft:10}}>
                                <Text>{itemData.item.userName}</Text>
                                <Rating
                                    // showRating
                                    // onFinishRating={this.ratingCompleted}
                                    style={{ paddingVertical: 0, alignSelf:"flex-start" }}
                                    imageSize={20}
                                    ratingCount={5}
                                />
                            </View>
                        </View>
                        <MaterialIcons name="chevron-right" size={28} color="grey" />
                    </TouchableOpacity>
                )}
            />
            <View style={styles.viewAddReview}>
                <Text style={styles.txtCantFind}>Vous ne trouvez pas votre serveur?</Text>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                    <Text style={styles.txtAddReview}>Ajoutez votre serveur</Text>
                    <TouchableOpacity 
                        onPress={handleHelpUsModalOpen}
                        style={styles.btnAdd}
                    >
                        <AntDesign name="plus" size={16} color={Colors.fontDark} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        <TouchableOpacity 
            onPress={handleConfirmModalOpen} 
            style={styles.viewLastBtn}
        >
            <Text>Vous etes serveur</Text>
        </TouchableOpacity>

        <ConfirmationModal 
            isVisible={confirmModalVisible} 
            handleModalClose={handleModalClose}
            name={name}
        />

        <HelpUsImproveModal 
            isVisible={helpUsModalVisible} 
            handleModalClose={handleModalClose}
        />

    </View>
}
export default ReviewDetails;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#F1F3F2"
    },
    btnAdd:{
        backgroundColor:Colors.yellow, padding:4, borderRadius:6, marginLeft:10
    },
    txtAddReview:{
        fontSize:16, color:Colors.fontDark
    },
    txtCantFind:{
        fontSize:16, color:Colors.fontLight
    },
    viewAddReview:{
        backgroundColor:"rgba(0,0,0,0.1)", width:"90%", alignSelf:"center", marginBottom:10,
        justifyContent:"center", alignItems:"center", borderRadius:10,paddingVertical:15
    },
    viewLastBtn:{
        width:"90%", alignSelf:"center", backgroundColor:Colors.yellow, height:50,
        justifyContent:"center", alignItems:"center", borderRadius:10, marginBottom:15, marginTop:1
    },
    txtNumRaters:{
        backgroundColor:Colors.yellow, padding:2,paddingHorizontal:9,marginLeft:10,fontSize:18,
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
        width:"100%", height:200, borderBottomLeftRadius:20,borderBottomRightRadius:20,
        overflow:"hidden",
    },
    viewItemConatier:{
        width:"90%", backgroundColor:"#fff", alignSelf:"center", height:80, marginVertical:10,
        borderRadius:10, alignItems:"center", flexDirection:"row", paddingHorizontal:15,
        justifyContent:"space-between"
    },
})