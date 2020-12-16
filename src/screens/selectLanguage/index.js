import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList } from 'react-native';
// import Language from '../../li8n/Language'

const SelectLanguage = ({ }) => {
    const [newLang, setNewLang] = useState('')
    const changeToEnglish = () => {
        setNewLang('en')
    }
    const changeToFrench = () => {
        setNewLang('fr')
    }
    return <View style={styles.container}>
        <Text>Change your language</Text>
        <TouchableOpacity style={styles.btnSelection} onPress={changeToEnglish}>
            <Text>English</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSelection} onPress={changeToFrench}>
            <Text>French</Text>
        </TouchableOpacity>
    </View>
}
export default SelectLanguage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#bbb",
        justifyContent: "center",
        alignItems: "center"
    },
    btnSelection: {
        width: "80%", paddingVertical: 10, borderRadius: 8, marginTop:25,
        justifyContent: "center", alignItems: "center"
    }
})
