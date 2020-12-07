import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import GlobalHeader from '../../components/GlobalHeader'

const Home = () => {
    return <View style={styles.container}>
        <StatusBar backgroundColor="gold" />
        <GlobalHeader
        // arrow={true}
        // headingText="kjshk"
        leftText="Bonjour Zain hasan"
        centerHide={true}
        RightImg={true}
        />
        <Text style={{fontSize:30, marginTop:20}}>Hoome</Text>
    </View>
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex:1,
        // justifyContent:"center",
         alignItems:'center',
        backgroundColor:"gold"
    },
})