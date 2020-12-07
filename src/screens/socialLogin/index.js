import React from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native';

const SocialLogin = () => {
    return <View style={styles.container}>
        <StatusBar backgroundColor="gold" />
        <Text style={{fontSize:30}}>POURBOIR'</Text>
        <Text>More than tips</Text>
    </View>
}
export default SocialLogin;

const styles = StyleSheet.create({
    container: {
        flex:1,
        // justifyContent:"center",
         alignItems:'center',
        backgroundColor:"gold"
    }
})