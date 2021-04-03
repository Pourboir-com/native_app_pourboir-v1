import React, {useState} from 'react'
import { KeyboardAvoidingView, StatusBar } from 'react-native'
import { ImageBackground } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import GlobalHeader from '../../components/GlobalHeader'

const ApplePay = ({navigation}) => {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={{
              width: '100%',
              height: 100,
            }}
            source={require('../../assets/images/Group3.png')}
          >
            <GlobalHeader
              arrow={true}
              headingText={'Apple Pay'}
              fontSize={17}
              color={'black'}
              navigation={navigation}
              setting={false}
              backgroundColor={'transparent'}
              borderRadius={true}
            />
          </ImageBackground>
        </View>
        <View style={{ flex: 7 }}>
          <View style={{ marginTop: 50, marginHorizontal: 30 }}>
            <Text style={{ fontSize: 20, paddingBottom:4 }}>Payer avec Apple Pay</Text>
            <Text style={{fontSize:12, color:'#1E272E'}}>
              Vous pouvez payer en utilisant votre compte Apple Pay lié à cette
              device.
            </Text>
          </View>
        </View>
      </View>
    );
}

export default ApplePay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
      },
      inputsTopTow: {
        borderColor: '#ccc',
        borderWidth: 1,
        width: 270,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
      },
      btn_yellow:{
        backgroundColor:'#FCDF6F',
        width:300,
        borderRadius:10,
        padding:10,
        paddingVertical:14,
        alignItems:'center',
        justifyContent:'center'
      }
})

