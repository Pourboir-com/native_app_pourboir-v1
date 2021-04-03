import React, {useState} from 'react'
import { KeyboardAvoidingView, StatusBar } from 'react-native'
import { ImageBackground } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import GlobalHeader from '../../components/GlobalHeader'

const MasterCard = ({navigation}) => {
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
              headingText={'Master Card'}
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
          <View style={{ marginTop: 85, marginHorizontal: 30 }}>
            <View>
                <TextInput secureTextEntry={true} placeholder="* * * * 8 8 8 8" style={{color:'black', fontSize:18}} />
            </View>
            <View style={{paddingTop:20}}>
            <Text style={{fontSize:13}}>Date d’expiration</Text>
            <Text style={{fontSize:13}}>08/2028</Text>
            </View>
          </View>
        </View>
        <View style={{flex:1, alignItems:'center'}}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.btn_yellow}>
                        <Text style={{fontSize:13}}>Effacer la carte</Text>
                    </TouchableOpacity>
                </View>
      </View>
    );
}

export default MasterCard

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
        justifyContent:'center',
        marginBottom:20
      }
})

