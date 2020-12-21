// import React, { useState } from 'react'
// import { StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
// import { MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";
// import GlobalHeader from '../../components/GlobalHeader'
// import { placesList as LIST } from '../../dummyData/DummyData'
// import { Colors } from '../../constants/Theme';
// import HomeCard from '../../components/HomeCard';
// // import RatingStar from '../../components/RatingComponent';

// const NoListImg = require('../../assets/images/emptyRestaurantList.png')

// const Home = ({ navigation }) => {

//     let ItemsOdd = []
//     let ItemsEven = []

//     for (var i = 0; i < LIST.length; i++) {
//         if ((i + 2) % 2 == 0) {
//             ItemsOdd.push(LIST[i]);
//         }
//         else {
//             ItemsEven.push(LIST[i]);
//         }
//     }
//     // console.log('ItemsOddddddddd', ItemsOdd)
//     // console.log('ItemsEvennnnnnnn', ItemsEven)
//     console.log('LisssssssssTTTTTTTT', LIST.length)
//     // alert(LIST)

//     // Star arrayyyyyyyy
//     const [starSelect, setstarSelect] = useState(3.5)
//     const obj = [1, 2, 3, 4, 5];
//     const onPressStar = (v) => {
//         setstarSelect(v);
//     }

//     return <View style={styles.container}>
//         <GlobalHeader
//             // arrow={true}
//             leftText="Bonjour Zain hasan"
//             centerHide={true}
//             RightImg={true}
//             search={true}
//         />
//         <StatusBar backgroundColor={Colors.yellow} />

//         {
//             LIST.length === 0 ?
//             <View style={styles.viewEmptyList}>
//                 <View style={{backgroundColor:"#fff", width:160, height:160, borderRadius:100}}>
//                 <Image source={NoListImg}
//                 style={{width:260, height:220,marginTop:-55,marginLeft:-50}}
//                 resizeMode="contain"
//                 />
//                 </View>
//                 <Text style={styles.txt1NoRest}>
//                     Vous n’avez aucun restaurant pour le moment
//                 </Text>
//                 <Text style={styles.txt2NoRest}>
//                 Recherchez votre restaurant et ajoutez vous en choisissant: Vous êtes serveur
//                 </Text>
//             </View>
//             :
//             <ScrollView showsVerticalScrollIndicator={false}>
//             <Text style={styles.txtHeading}>
//                 Autour de vous
//             </Text>
//             <View style={{ flexDirection: "row" }}>
//                 <FlatList
//                     data={ItemsOdd}
//                     showsVerticalScrollIndicator={false}
//                     keyExtractor={(item) => item._id}
//                     renderItem={(itemData) => (
//                     <HomeCard 
//                         navigation={navigation}
//                         img={itemData.item.img}
//                         rating={itemData.item.rate}
//                         name={itemData.item.name}
//                         distance={itemData.item.distance}
//                         services={itemData.item.services}
//                     />
//                     )}
//                 />
//                 <FlatList
//                     data={ItemsEven}
//                     showsVerticalScrollIndicator={false}
//                     style={{ marginTop: 15 }}
//                     keyExtractor={(item) => item._id}
//                     renderItem={(itemData) => (
//                     <HomeCard 
//                         navigation={navigation}
//                         img={itemData.item.img}
//                         rating={itemData.item.rate}
//                         name={itemData.item.name}
//                         distance={itemData.item.distance}
//                         services={itemData.item.services}
//                     />
//                     )}
//                 />
//             </View>
//         </ScrollView>
//         }
//     </View>
// }
// export default Home;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff"
//     },
//     txt1NoRest:{
//         fontSize:16, color:Colors.fontDark, textAlign:"center", maxWidth:190, marginTop:20
//     },
//     txt2NoRest:{
//         fontSize:16, color:Colors.fontLight, textAlign:"center",maxWidth:320, marginTop:15
//     },
//     viewEmptyList:{
//         flex:1, backgroundColor:"#F9F9F9",justifyContent:"center", alignItems:"center"
//     },
//     btnCross: {
//         backgroundColor: "#fff", position: "absolute", alignSelf: "flex-end",
//         borderRadius: 20, margin: -1, right: 0, width: 30, height: 30,
//         justifyContent: "center", alignItems: "center"
//     },
//     view2Card: {
//         flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between"
//     },
//     txt2Card: {
//         color: "#EDEFEE", fontSize: 13
//     },
//     imgCard: {
//         flex: 1, padding: 12, justifyContent: 'space-between'
//     },
//     viewItemConatier: {
//         width: Dimensions.get('window').width * 0.45,
//         height: Dimensions.get('window').width * 0.56,
//         margin: Dimensions.get('window').width * 0.02, backgroundColor: "red",
//         borderRadius: 12, overflow: "hidden"
//     },
//     txtHeading: {
//         fontSize: 22, marginTop: 10, width: "90%", alignSelf: "center"
//     }
// })