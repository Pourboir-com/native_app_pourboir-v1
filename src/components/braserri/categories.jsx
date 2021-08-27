import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native'
import { TextInput } from 'react-native'
import styles from '../../screens/braserri/styles'
import AddBtn from '../add-common-btn'
import i18n from '../../li8n'
import uuid from 'react-native-uuid';

const Categories = (props) => {
    const [categ, setCateg] = useState()
    const [menuId, setMenuId] = useState()
    useEffect(() => {
      setCateg(props.categArr)
      setMenuId(props.menu_id)
    },[])
    const addDish = async () => {
   const list =  props.dishes.push({id: uuid.v4() ,dishName:'', price: '', description:''})
    props.setDishess(list);

    }

    const handleInputChange = (value,index,name) => {
      props.dishes[index][name] = value
      props.setDishess(props.dishes[index][name] = value)
      console.log(props.categArr)
    };

    async function deleteCategory(id) { 
    await props.setCategArr(props.categArr.filter((item) => {
      return item.menu_id != id
    }))
    
  }
  
  const openDeleteModal = (id) => {
    props.setDishId(id)
    props.setDeleteDishModal(true)
    props.setDishess(props.dishes)
  }

    return (
        <View style={{marginTop:10}}>
            <View style={{flexDirection:'row', justifyContent:'space-between',  width:'100%' }}>
            <Text style={styles.mainHeading}>{props.category}</Text>
            <TouchableOpacity onPress={() => deleteCategory(menuId)} activeOpacity={0.3}>
            <Image 
            source={require('../../assets/images/minus.png')}
            style={{resizeMode:'contain', width:22, height:22}}
            />
            </TouchableOpacity>
            </View>

            {
            props.dishes.length  ? (
                <>
                {
                  props.dishes.map((v,i) => {
                    return (
                      <View key={i}>
                      <View  style={{flexDirection:'row', justifyContent:'space-between', width:'100%', marginTop:20}}>
                <View style={(styles.input_box, { width:'60%' })}>
                <TextInput
                  style={styles.inputsTopTow}
                  // onChangeText={e => props.setDishName(e)}
                  // value={props.dishName}
                  onChangeText={(name) => handleInputChange(name, i, 'dishName')}
                  value={v.dishName}
                  placeholder={i18n.t('dish_name')}
                  placeholderTextColor={'#707375'}
                />
              </View>
              <View style={(styles.input_box, { ...styles.input_box, width:'35%', flexDirection:'row',})}>
                <TextInput
                  style={styles.inputsTopTow, {...styles.inputsTopTow, width:80, marginRight:10 }}
                  // onChangeText={e => props.setPrice(e)}
                  // value={props.price}
                  onChangeText={(name) => handleInputChange(name, i, 'price')}
                  value={v.price}
                  placeholder={i18n.t('price')}
                  placeholderTextColor={'#707375'}
                />
                <TouchableOpacity onPress={() => openDeleteModal(v.id)} style={{justifyContent:'center',}} activeOpacity={0.3}>
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
                  // onChangeText={e => props.setDescription(e)}
                  // value={props.description}
                  onChangeText={(name) => handleInputChange(name, i, 'description')}
                  value={v.description}
                  placeholder={'Description'}
                  placeholderTextColor={'#707375'}
                />
              </View> 
                      </View>
                    )
                  })
                }
              </>
              ) : null
            }

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