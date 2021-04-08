import React, {useState} from 'react'
import { KeyboardAvoidingView, StatusBar } from 'react-native'
import { ImageBackground } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import GlobalHeader from '../../components/GlobalHeader'
import i18n from '../../li8n';

const AddMap = ({navigation}) => {
    const [text, onChangeText] = React.useState();
    const [text2, onChangeText2] = React.useState();
    const [text3, onChangeText3] = React.useState();
    const [text4, onChangeText4] = React.useState();
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} style="dark" />
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={{
              width: '100%',
              height: 100,
              zIndex:111111
            }}
            source={require('../../assets/images/Group3.png')}
          >
            <GlobalHeader
              arrow={true}
              headingText={i18n.t('add_a_map')}
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
       <ScrollView>
       <View style={{ marginHorizontal: 30, alignItems: 'center', marginTop:50 }}>
                <View style={{ alignItems: 'flex-start', marginBottom: 15 }}>
                  <Text style={{ color: '#1E272E', opacity: 1 , fontWeight:'bold', paddingBottom:3}}>{i18n.t('card_number')}</Text>
                  <TextInput
                    style={styles.inputsTopTow}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="8888-8888-8888-8888"
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ alignItems: 'flex-start', marginBottom: 15 }}>
                  <Text style={{ color: '#1E272E', opacity: 1 , fontWeight:'bold', paddingBottom:3}}>{i18n.t('date_of_exp')}</Text>
                  <TextInput
                    style={styles.inputsTopTow}
                    onChangeText={onChangeText2}
                    value={text2}
                    placeholder="MM/AA"
                    keyboardType="text"
                  />
                </View>
                <View style={{ alignItems: 'flex-start', marginBottom: 15 }}>
                  <Text style={{ color: '#1E272E', opacity: 1 , fontWeight:'bold', paddingBottom:3}}>CVV</Text>
                  <TextInput
                    style={styles.inputsTopTow}
                    onChangeText={onChangeText3}
                    value={text3}
                    placeholder="123"
                    keyboardType="numeric"
                  />
                </View>
                <View style={{ alignItems: 'flex-start', marginBottom: 15 }}>
                  <Text style={{ color: '#1E272E', opacity: 1 , fontWeight:'bold', paddingBottom:3}}>{i18n.t('pays')}</Text>
                  <TextInput
                    style={styles.inputsTopTow}
                    onChangeText={onChangeText4}
                    value={text4}
                    placeholder="France"
                    keyboardType="text"
                  />
                </View>
                </View>
       </ScrollView>
        </View>
        <View style={{flex:1, alignItems:'center'}}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.btn_yellow}>
                        <Text style={{fontSize:13}}>{i18n.t('save')}</Text>
                    </TouchableOpacity>
                </View>
      </View>
    );
}

export default AddMap

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

