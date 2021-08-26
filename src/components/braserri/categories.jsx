import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native'
import { TextInput } from 'react-native'
import styles from '../../screens/braserri/styles'
import AddBtn from '../add-common-btn'
import i18n from '../../li8n'

const Categories = (props, {dishState, setDishState}) => {
    const [dishes, setDishes] = useState([])
    const [categ, setCateg] = useState([])
    const addDish = async () => {
    //  const a = await setDishes([...dishes, {categId: props.menu_id ,dishName: '', price: '', description: ''} ])
    //  const a = props.dishes == dishes.map(v => v)
   const list =  props.dishes.push({dishName:'', price: '', description:''})
    setDishes(list);

    }

    const handleInputChange = (value,index,name) => {
      props.dishes[index][name] = value
      setDishes(props.dishes[index][name] = value)
      console.log(props.categArr)
      // console.log('added dish in Id ', props.categArr , " finish" )
      // console.log(props.dishes)
      // const keys =  Object.keys(props.dishes[index][name]);
      // console.log()

    };
    async function deleteCategory(id) { 
    
      // let a = props.categArr.filter(function(ele){ 
      //     return ele.menu_id !== id; 
      // });
      // props.setCategArr([...props.categArr])
     await props.categArr.filter(function(item) {
        return item.menu_id !== id
    })
    console.log(props.categArr)
    // props.categArr
  }
    useEffect(() => {
      props.setCategArr([...props.categArr])
    },[])
    // console.log("categories, " , props)
    // console.log('dishes states ', dish)
    
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

            {
            props.dishes.length  ? (
                <>
                {
                  props.dishes.map((v,i) => {
                    return (
                      <>
                      <View key={i} style={{flexDirection:'row', justifyContent:'space-between', width:'100%', marginTop:20}}>
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
                  // onChangeText={e => props.setDescription(e)}
                  // value={props.description}
                  onChangeText={(name) => handleInputChange(name, i, 'description')}
                  value={v.description}
                  placeholder={'Description'}
                  placeholderTextColor={'#707375'}
                />
              </View> 
                      </>
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



{/* <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', marginTop:20}}>
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
</View> */}