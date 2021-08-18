import React, { useState } from 'react'
import { Text, View } from 'react-native'
import i18n from '../../li8n'
import styles from '../../screens/braserri/styles'
import AddBtn from '../add-common-btn'
import CommonButton from '../common-button'
import AddCategoryModal from '../modals/AddCategoryModal'
import Categories from './categories'

const Menu = ({currentTab}) => {
    const [categModal, setCategModal] = useState(false)
    const [categArr, setCategArr] = useState([])

    return (
        <>
        <View style={{marginHorizontal:0, marginTop:20, }}>
            <View>
               {
                   categArr.map((v,i) => {
                       return (
                        <Categories key={i} category={v} categArr={categArr} />
                       )
                   })
               }
            </View>
             <View style={{ marginTop:24, justifyContent:'center', alignItems:'center', marginHorizontal:18}}>
               <AddBtn 
               title={'Add Category'}
               onPress={() => setCategModal(true)}
               />
           </View>
           <AddCategoryModal 
            categModal={categModal}
            setCategModal={setCategModal}
            categArr={categArr}
            setCategArr={setCategArr}
           />
          
        </View>
        {
          currentTab == 'menu' && categArr.length ? (
            <View style={{marginTop:90, width:'100%', justifyContent:'center', alignItems:'center'}}>
         <CommonButton title="Publish your menu" />
     </View>
          ) : null
        }
     </>
    )
}

export default Menu

