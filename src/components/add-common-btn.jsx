import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../constants/Theme'
import i18n from '../li8n'
import { AntDesign } from '@expo/vector-icons';

const AddBtn = (props) => {
    return (
        <View style={styles.viewAddReview}>
        {/* <Text style={[styles.txtCantFind, { fontFamily: 'ProximaNova' }]}>
            {i18n.t('cant_find_your_server')}
            </Text> */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[
              styles.txtAddReview,
              { fontFamily: 'ProximaNovaBold' },
            ]}
          >

            {props.title}
            {/* {i18n.t('add_server')} */}
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={props.onPress && props.onPress}
            style={styles.btnAdd}
          >
            <AntDesign
              name="plus"
              size={16}
              color={Colors.fontDark}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
}

export default AddBtn

const styles = StyleSheet.create({
    viewAddReview: {
        width: '110%',
        alignSelf: 'center',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 10,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#DADADA',
        // height:40,
        // marginTop: 30,
      },
      btnAdd: {
        backgroundColor: Colors.yellow,
        padding: 4,
        borderRadius: 6,
        marginLeft: 10,
      },
      txtAddReview: {
        fontSize: 16,
        color: Colors.fontDark,
      },
})
