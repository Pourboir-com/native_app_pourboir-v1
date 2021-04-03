import React, {useState} from 'react'
import { KeyboardAvoidingView, StatusBar } from 'react-native'
import { ImageBackground } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import GlobalHeader from '../../components/GlobalHeader'

const PaypalPayment = ({navigation}) => {
    const [text, onChangeText] = useState()
    return (
                <View style={styles.container}>
                <View style={{flex:1}}>
                <ImageBackground
              style={{
                width: '100%',
                height: 100,
              }}
              source={require('../../assets/images/Group3.png')}
            >
              <GlobalHeader
                arrow={true}
                headingText={'Paypal'}
                fontSize={17}
                color={'black'}
                navigation={navigation}
                setting={false}
                backgroundColor={'transparent'}
                borderRadius={true}
              />
            </ImageBackground> 
                </View>
                <View style={{flex:7}}>
                    <View style={{marginTop:50, alignItems:'center'}}>
                    <TextInput
                    style={styles.inputsTopTow}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="christine@zhou.com"
                    keyboardType="text"
                  />
                    </View>
                </View>
                <View style={{flex:1, alignItems:'center'}}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.btn_yellow}>
                        <Text style={{fontSize:13}}>Effacer ce compte Paypal</Text>
                    </TouchableOpacity>
                </View>
            </View>

    )
}

export default PaypalPayment

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

