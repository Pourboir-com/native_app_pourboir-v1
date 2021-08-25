import React, { useState } from 'react'
import { Dimensions, ImageBackground, Text, TouchableOpacity, View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'react-native-svg'
import Menu from '../../components/braserri/menu'
import Team from '../../components/braserri/team'
import CommonButton from '../../components/common-button'
import GlobalHeader from '../../components/GlobalHeader'
import i18n from '../../li8n'
import styles from './styles'

const Braserri = ({navigation}) => {
    const [currentTab, setCurrentTab] = useState('team')
    console.log(currentTab)
    const [dishName, setDishName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    return (
        <View style={{flex:1 , backgroundColor:'#f9f9f9'}}>
            <ImageBackground
          style={{
            width: '100%',
            height: 100,
            borderBottomLeftRadius: Dimensions.get('window').width * 0.06,
            borderBottomRightRadius: Dimensions.get('window').width * 0.06,
            overflow: 'hidden',
          }}
          source={require('../../assets/images/Group3.png')}
        >
             <LinearGradient
              style={{
                zIndex: 101,
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
              colors={['black', 'transparent', 'black']}
            ></LinearGradient>
          <GlobalHeader
            arrow={true}
            headingText={'Brasserie Le Soleil'}
            fontSize={17}
            color={'black'}
            navigation={navigation}
            setting={false}
            backgroundColor={'transparent'}
            borderRadius={true}
          />
        </ImageBackground>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1, marginHorizontal:20, marginTop:30}}>
            <View style={{justifyContent:'space-between', flexDirection:'row', flex:1}}>
              <TouchableOpacity onPress={() => setCurrentTab('team')} style={styles.tabBtn, currentTab != 'team' ? {...styles.tabBtn, backgroundColor:'#fff'} : styles.tabBtn} activeOpacity={0.6}>
                  <Image 
                  source={require('../../assets/images/team.png')}
                  style={{width:18, height:18, resizeMode:'contain',}}
                  />
                <Text style={styles.tabTxt}>{i18n.t('the_team')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentTab('menu')} style={styles.tabBtn, currentTab != 'menu' ? {...styles.tabBtn, backgroundColor:'#fff'} : styles.tabBtn} activeOpacity={0.6}>
                  <Image 
                  source={require('../../assets/images/menu.png')}
                  style={{width:18, height:18, resizeMode:'contain',}}
                  />
                <Text style={styles.tabTxt}>{i18n.t('the_menu')}</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginBottom:20, flex:2,}} >
                {
                    currentTab === 'menu' ? (
                        <Menu currentTab={currentTab} 
                        dishName={dishName}
                        setDishName={setDishName}
                        description={description}
                        setDescription={setDescription}
                        price={price}
                        setPrice={setPrice}
                        />
                    ) : (
                        <Team />
                    )
                }
            </View>
        </ScrollView>
        
        </View>
    )
}

export default Braserri

