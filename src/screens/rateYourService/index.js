import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TextInput, Dimensions, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import GlobalHeader from '../../components/GlobalHeader';
import {rateList as RATELIST} from '../../dummyData/DummyData'
import {Colors} from '../../constants/Theme';
import ThankRatingModal from '../../components/modals/ThanksRatingModal'
import RatingStar from '../../components/RatingComponent';

const RateService = ({navigation}) => {

    const [isVisible, setisVisible] = useState(false);

    const ratingCompleted = (rating) => {
      console.log("Rating is: " + rating)
    }

    const handleModalClose = () => {
        setisVisible(false);
      };

      const handleModalOpen = () => {
        setisVisible(true);
      };

      // Star arrayyyyyyyy
      const [starSelect, setstarSelect] = useState(3.5)
      const obj = [1, 2, 3, 4, 5];
      const onPressStar = (v) => {
          setstarSelect(v);
      }

    return <View style={styles.container}>
        <GlobalHeader
            arrow={true}
            headingText="Notez votre serveur"
            fontSize={17}
            color={Colors.fontDark}
            navigation={navigation}
        />
        {/* <StatusBar  translucent={true}  /> */}
        <View style={styles.viewProfile}>
            <View style={styles.viewImg}>
              <FontAwesome name="user-circle-o" size={100} color="#fff" />
            </View>
            <Text style={styles.txtName}>Amy Farha</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.viewFlatlist}>
            <FlatList
            data={RATELIST}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            renderItem={(itemData) => (
                <TouchableOpacity 
                    onPress={()=> navigation.navigate('socialLogin')} 
                    style={styles.viewListCard}
                >
                    <Text style={styles.txtCard}>{itemData.item.heading}</Text>
                    <View style={{ flexDirection: "row", marginTop:10 }}>
                                        {obj.map((v, i) => {
                                            return (
                                                <TouchableOpacity onPress={() => { onPressStar(v) }}>
                                                    <RatingStar starSize={25}
                                                        type={ v <= starSelect ? "filled" : 
                                                        v === starSelect + 0.5 ? "half" : "empty" 
                                                    }
                                                        notRatedStarColor='rgba(0,0,0,0.2)'
                                                    />
                                                </TouchableOpacity>
                                            )
                                        }
                                        )}
                                    </View>
                </TouchableOpacity>
            )}
            />
            <View style={styles.viewTip}>
                <Text style={styles.txtCard}>Votre pourboir au serveur</Text>
                <TextInput style={styles.inputStyle} />
            </View>
        </ScrollView>
        <TouchableOpacity onPress={handleModalOpen} style={styles.btnValider}>
            <Text style={{fontSize:16}}>Valider</Text>
        </TouchableOpacity>

        <ThankRatingModal 
         isVisible={isVisible}
         handleModalClose={handleModalClose}
        />
    </View>
}
export default RateService;

const styles = StyleSheet.create({
    container: {
        flex:1,
        // justifyContent:"center",
         alignItems:'center',
        backgroundColor:"#F9F9F9"
    },
    inputStyle:{
        height:45, width:"80%", backgroundColor:"#F8F8F8",borderRadius:10, marginTop:12,
        fontSize:18, paddingVertical:0
    },
    viewTip:{
        backgroundColor:"#fff", width:"90%", alignSelf:"center", marginBottom:10,height:120,
        borderRadius:15, alignItems:"center", borderWidth:1,borderColor:'rgba(0,0,0,0.05)'
    },
    txtCard:{
        fontSize:18, marginTop:15
    },
    viewFlatlist:{
        backgroundColor:"transparent",width:"100%", flex:1, marginTop:-40
    },
    btnValider:{
        backgroundColor:Colors.yellow, width:"90%", justifyContent:"center",alignItems:"center",
        height:50, borderRadius:8, marginBottom:15, marginTop:3
    },
    viewListCard:{
        backgroundColor:"#fff", width:"90%", alignSelf:"center", marginBottom:10,height:100,
        borderRadius:15, alignItems:"center", borderWidth:1,borderColor:'rgba(0,0,0,0.05)', 

    },
    txtName:{
        alignSelf:"center",marginTop:10, fontSize:24, color:Colors.fontDark
    },
    viewImg: {
        width: 100,
        height: 100,
        borderRadius:50, backgroundColor:"#bbb",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:5,
        marginTop:30,
        alignSelf:"center"
      },
    viewProfile:{
        backgroundColor:Colors.yellow, width:"100%", paddingBottom:70, marginTop:-20,
        borderBottomLeftRadius:40, borderBottomRightRadius:40
    }
})