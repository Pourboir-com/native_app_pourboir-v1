import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native'
import { TextInput } from 'react-native'
import styles from '../../screens/braserri/styles'
import AddBtn from '../add-common-btn'
import i18n from '../../li8n'

const Categories = (props) => {
    const [dishes, setDishes] = useState([])
    const [dish, setDish] = useState()
    const addDish = () => {
      // setDishes([...dishes, dishes.dishes ])
      console.log('added dish in Id ', props.menu_id  )
    }

    const deleteCategory = async (id) => {
      await props.categArr.filter(e => {
        console.log(props.categArr)
      })

    }
    
    return (
        <View style={{marginTop:10}}>
            <View style={{flexDirection:'row', justifyContent:'space-between',  width:'100%' }}>
            <Text style={styles.mainHeading}>{props.category}</Text>
            <TouchableOpacity onPress={() => deleteCategory(props.menu_id)} activeOpacity={0.3}>
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
              onChangeText={e => props.setDishName(e)}
              value={props.dishName}
              placeholder={i18n.t('dish_name')}
              placeholderTextColor={'#707375'}
            />
          </View>
          <View style={(styles.input_box, { ...styles.input_box, width:'35%', flexDirection:'row',})}>
            <TextInput
              style={styles.inputsTopTow, {...styles.inputsTopTow, width:80, marginRight:10 }}
              onChangeText={e => props.setPrice(e)}
              value={props.price}
              placeholder={i18n.t('price')}
              placeholderTextColor={'#707375'}
            />
            <TouchableOpacity onPress={() => props.setDeleteDishModal(true)} style={{justifyContent:'center',}} activeOpacity={0.3}>
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
              onChangeText={e => props.setDescription(e)}
              value={props.description}
              placeholder={'Description'}
              placeholderTextColor={'#707375'}
            />
          </View>
          <View style={{marginHorizontal:18, marginTop:15, justifyContent:'center', alignItems:'center'}}>
          <AddBtn 
               title={i18n.t('add_dish')}
               onPress={() => addDish()}
               />
          </View>
        </View>
    )
}

export default Categories

