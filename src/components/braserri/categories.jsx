import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native'
import { TextInput } from 'react-native'
import styles from '../../screens/braserri/styles'
import AddBtn from '../add-common-btn'

const Categories = (props) => {
    const [dishName, setDishName] = useState('');
    const [price, setPrice] = useState('');
    const [desc, setDesc] = useState('');
    return (
        <View style={{marginTop:10}}>
            <View style={{flexDirection:'row', justifyContent:'space-between',  width:'100%' }}>
            <Text style={styles.mainHeading}>{props.category}</Text>
            <TouchableOpacity activeOpacity={0.3}>
            <Image 
            source={require('../../assets/images/minus.png')}
            style={{resizeMode:'contain', width:22, height:22}}
            />
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', marginTop:20}}>
            <View style={(styles.input_box, { width:'60%' })}>
            <TextInput
              style={styles.inputsTopTow}
              onChangeText={e => setDishName(e)}
              value={dishName}
              placeholder={'Name of the dish'}
              placeholderTextColor={'#707375'}
            />
          </View>
          <View style={(styles.input_box, { ...styles.input_box, width:'35%', flexDirection:'row',})}>
            <TextInput
              style={styles.inputsTopTow, {...styles.inputsTopTow, width:80, marginRight:10 }}
              onChangeText={e => setPrice(e)}
              value={price}
              placeholder={'Price'}
              placeholderTextColor={'#707375'}
            />
            <TouchableOpacity style={{justifyContent:'center',}} activeOpacity={0.3}>
            <Image 
            source={require('../../assets/images/minus.png')}
            style={{resizeMode:'contain', width:22, height:22,}}
            />
            </TouchableOpacity>
          </View>
         
            </View>
            <View style={(styles.input_box, { width:'100%' })}>
            <TextInput
              style={styles.inputsTopTow}
              onChangeText={e => setDesc(e)}
              value={desc}
              placeholder={'Description'}
              placeholderTextColor={'#707375'}
            />
          </View>
          <View style={{marginHorizontal:18, marginTop:15, justifyContent:'center', alignItems:'center'}}>
          <AddBtn 
               title={'Add dish'}
               onPress={() => alert("Add a dish")}
               />
          </View>
        </View>
    )
}

export default Categories

