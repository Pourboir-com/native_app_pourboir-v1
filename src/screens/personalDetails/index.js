import React from 'react'
import { StatusBar } from 'react-native'
import { ImageBackground } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { Image } from 'react-native'
import { Text, View } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import GlobalHeader from '../../components/GlobalHeader'
import { Colors } from '../../constants/Theme'
import { AntDesign } from '@expo/vector-icons';
import styles from './styles'

const PersonalDetails = ({navigation}) => {
  
  const [text, onChangeText] = React.useState();
  const [text2, onChangeText2] = React.useState();
  const [text3, onChangeText3] = React.useState();
  const [text4, onChangeText4] = React.useState();

    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          bounces={false}
          scrollEnabled={true}
          style={{
            width: '100%',
          }}
        >
            <StatusBar translucent={true} style="light" />
            <ImageBackground
              style={{
                width: '100%',
                height: 100,
              }}
              source={require('../../assets/images/Group3.png')}
            >
              <GlobalHeader
                arrow={true}
                headingText={'Vos données personnels'}
                fontSize={17}
                color={Colors.fontLight}
                navigation={navigation}
                setting={false}
                backgroundColor={'transparent'}
                borderRadius={true}
              />
            </ImageBackground>

            <View>
              <View style={styles.avatar}>
                <TouchableOpacity style={styles.viewImg}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 80,
                    }}
                    source={{
                      uri:
                        'https://www.kindpng.com/picc/m/136-1369892_avatar-people-person-business-user-man-character-avatar.png',
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ marginHorizontal: 30, alignItems: 'center' }}>
                <Text style={styles.heading1}>Information personnelles</Text>
                <View style={{ alignItems: 'flex-start', marginBottom: 10 }}>
                  <Text style={{ color: '#1E272E', opacity: 0.7 }}>Prénom</Text>
                  <TextInput
                    style={styles.inputsTopTow}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Christine"
                    keyboardType="text"
                  />
                </View>
                <View style={{ alignItems: 'flex-start', marginBottom: 10 }}>
                  <Text style={{ color: '#1E272E', opacity: 0.7 }}>Nom</Text>
                  <TextInput
                    style={styles.inputsTopTow}
                    onChangeText={onChangeText2}
                    value={text2}
                    placeholder="Zhou"
                    keyboardType="text"
                  />
                </View>
                <View style={{ alignItems: 'flex-start', marginBottom: 10 }}>
                  <Text style={{ color: '#1E272E', opacity: 0.7 }}>
                    Numéro de téléphone
                  </Text>
                  <View style={styles.inputsBottomTwo}>
                    <TextInput
                      onChangeText={onChangeText3}
                      value={text3}
                      placeholder="+33 6 88 88 88"
                      keyboardType="text"
                      style={{ width: '65%' }}
                    />
                    <Text style={{ color: '#E02020', width: '35%' }}>
                      Non vérifié
                    </Text>
                  </View>
                </View>

                <View style={{ alignItems: 'flex-start', marginBottom: 10 }}>
                  <Text style={{ color: '#1E272E', opacity: 0.7 }}>Email</Text>
                  <View style={styles.inputsBottomTwo}>
                    <TextInput
                      onChangeText={onChangeText4}
                      value={text4}
                      placeholder="christine@zhou.com"
                      keyboardType="text"
                      style={{ width: '75%' }}
                    />
                    <Text style={{ color: '#6DD400', width: '25%' }}>
                      Vérifié
                    </Text>
                  </View>
                </View>
            </View>
            <View style={{alignItems:'center', marginBottom:40}}>
               <View>
                 <Text style={styles.heading1}>Modes de paiement</Text>
               </View>
                
              <View style={styles.payment_container}>
              <TouchableOpacity onPress={() => navigation.navigate('paypalPayment')} activeOpacity={0.6} style={styles.payments}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <View style={{backgroundColor:'#FFF6D4', padding:3}}>
                      <Image 
                      source={require('../../assets/images/paypal.png')}
                      style={{width:23, height:23, resizeMode:'cover'}}
                      />
                      </View>
                      <Text style={{paddingLeft: 10, fontSize:15}}>Paypal</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                    <AntDesign name="right" size={20} color="lightgray" />
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('applePayment')}  activeOpacity={0.6}  style={styles.payments}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <View style={{backgroundColor:'#FFF6D4', padding:3}}>
                      <Image 
                      source={require('../../assets/images/apple.png')}
                      style={{width:24, height:24, resizeMode:'contain'}}
                      />
                      </View>
                      <Text style={{paddingLeft: 10, fontSize:15}}>Apple Pay</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                    <AntDesign name="right" size={20} color="lightgray" />
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('masterCard')} activeOpacity={0.6}  style={styles.payments}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <View style={{backgroundColor:'#FFF6D4', padding:3}}>
                      <Image 
                      source={require('../../assets/images/card.png')}
                      style={{width:25, height:25, resizeMode:'cover'}}
                      />
                      </View>
                      <Text style={{paddingLeft: 10, fontSize:15}}>***8888</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                    <AntDesign name="right" size={20} color="lightgray" />
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('addMap')} activeOpacity={0.6}  style={styles.lastpayment}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <View style={{backgroundColor:'#FFF6D4', padding:3}}>
                      <AntDesign name="plus" size={21} color="black" />
                      </View>
                      <Text style={{paddingLeft: 10, fontSize:14}}>Ajoutez un mode de paiement</Text>
                    </View>
                    <View>
                    <AntDesign name="right" size={20} color="lightgray" />
                    </View>
                    </TouchableOpacity>
              </View>

                </View>


              </View>
        </ScrollView>
      </View>
    );
}

export default PersonalDetails


