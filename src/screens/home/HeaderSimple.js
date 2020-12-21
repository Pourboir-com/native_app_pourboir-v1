import React from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from 'react-native'
import { Feather, Entypo } from "@expo/vector-icons";

import { Colors } from '../../constants/Theme';

import { useNavigation } from '@react-navigation/native';
import { spacing } from '../../constants/layout';


export default function HeaderSimple(props) {

    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerRight: null,
            headerShown: true,
            headerLeft: null,
            headerTransparent: true,
            headerTitleAlign: 'left',
            headerRightContainerStyle: { paddingRight: spacing(2) }
        });
    });

    return (
        <View style={styles.viewHeader2}>
            <View style={styles.viewInputSearch}>
                <TouchableOpacity
                    onPress={() =>
                        props.setSearchIconPress(!props.searchIconPress)}
                    style={{ paddingHorizontal: 8 }}>

                    <Feather name="search" color={Colors.yellow} size={25} />
                    
                </TouchableOpacity>

                <TextInput
                    placeholder="Search"
                    style={styles.inputSearch} />

                <TouchableOpacity
                    style={{ paddingHorizontal: 8 }}>
                    <Entypo
                        name="circle-with-cross"
                        color={Colors.yellow}
                        size={25} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    viewInputSearch: {
        flexDirection: "row", alignItems: "center", backgroundColor: "#fff", width: "90%",
        marginTop: 45, alignSelf: "center", borderRadius: 7, overflow: "hidden"
    },
    viewHeader2: {
        width: "100%", height: 110,
        backgroundColor: Colors.yellow,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    inputSearch: {
        height: 45, backgroundColor: "#fff",
        paddingHorizontal: 5, paddingVertical: 0, flex: 1
    },

})
