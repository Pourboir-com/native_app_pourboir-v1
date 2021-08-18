import React from 'react'
import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native'
import i18n from '../../li8n'
import styles from '../../screens/braserri/styles'
import AddBtn from '../add-common-btn'
import { AntDesign } from '@expo/vector-icons';
import CommonCard from '../comman-card'

const Team = () => {
    return (
        <>
        {/* //waiters */}
        <View style={{marginTop:30,}}>
           <View style={styles.team_common_sec}>
               <View>
                   <Text style={styles.mainHeading}>Waiters</Text>
               </View>
               <View style={styles.numberBox}>
                   <Text style={styles.numberTxt}>2</Text>
               </View>
           </View>
           <View>
               <Text style={styles.numberTxt, {...styles.numberTxt,fontSize:15, marginTop:20}}>Sorry, there is no waiters at the moment. </Text>
           </View>
           <View style={{marginTop:20}}>
              <CommonCard />
              <CommonCard />
          </View>
        </View>
           <View style={{marginHorizontal:18, marginTop:20, justifyContent:'center', alignItems:'center'}}>
               <AddBtn 
               title={i18n.t('add_your_server')}
               onPress={() => alert('clicked waiter')}
               />
           </View>
         
        {/* // Cooks */}
        <View style={{marginTop:30}}>
        <View style={styles.team_common_sec}>
            <View>
                <Text style={styles.mainHeading}>Cooks</Text>
            </View>
            <View style={styles.numberBox}>
                <Text style={styles.numberTxt}>3</Text>
            </View>
        </View>
        <View>
            <Text style={styles.numberTxt, {...styles.numberTxt,fontSize:15, marginTop:20}}>Sorry, there is no waiters at the moment. </Text>
        </View>
        <View style={{marginTop:20}}>
              <CommonCard />
              <CommonCard />
              <CommonCard />
          </View>
        <View style={{marginHorizontal:18, marginTop:20, justifyContent:'center', alignItems:'center'}}>
            <AddBtn 
            title={'Add your Cooks'}
            onPress={() => alert('clicked cook')}
            />
        </View>
     </View>
     </>
    )
}

export default Team

