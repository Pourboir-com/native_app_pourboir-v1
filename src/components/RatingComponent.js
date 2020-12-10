import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from '../constants/Theme';

const RatingStar = ({ starSize, filled, containerPadding, containerBgColor, notRatedStarColor,type }) => {

    // alert(filled)

    return <View style={{
        paddingHorizontal: containerPadding ? containerPadding : 2,
        backgroundColor: containerBgColor ? containerBgColor : 'transparent'
    }}>
        <FontAwesome
            name={type === 'half' ? 'star-half-empty' : 'star'}
            size={starSize ? starSize : 20}
            color={type === 'filled' || type === 'half' ? Colors.yellow : notRatedStarColor}
        />
    </View>
}
export default RatingStar;

const styles = StyleSheet.create({
    container: {

    }
})