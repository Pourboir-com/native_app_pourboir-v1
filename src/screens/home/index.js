import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import GlobalHeader from '../../components/GlobalHeader'

const Home = () => {
    return <View style={styles.container}>
        <GlobalHeader
        // arrow={true}
        // headingText="kjshk"
        leftText="Bonjour Zain hasan"
        centerHide={true}
        RightImg={true}
        />
        <StatusBar backgroundColor="orange" />
        <Text style={{fontSize:22, marginTop:10,width:"90%", alignSelf:"center"}}>
            Autour de vous
        </Text>
    </View>
}
export default Home;

const styles = StyleSheet.create({
    container: {
        flex:1,
        // justifyContent:"center",
        //  alignItems:'center',
        backgroundColor:"#fff"
    },
})