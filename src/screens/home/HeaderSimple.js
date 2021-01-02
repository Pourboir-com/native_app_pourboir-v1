import React from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from 'react-native'
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";

import { Colors } from '../../constants/Theme';

import { useNavigation } from '@react-navigation/native';
import { spacing } from '../../constants/layout';


export default function HeaderSimple(props) {

    const navigation = useNavigation();

    const [isFocused, setIsFocused] = React.useState(false);
    const [searchVal, setSearchVal] = React.useState('')

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

                    value={searchVal}
                    onFocus={() => { setIsFocused(true) }}
                    onBlur={() => { setIsFocused(false) }}
                    onChangeText={(e) => { setSearchVal(e) }}

                    placeholder="Search"
                    style={styles.inputSearch} />

                <TouchableOpacity
                    onPress={() => { setSearchVal('') }}
                    style={{ paddingHorizontal: 8 }}>
                    <View style={{
                        backgroundColor: Colors.yellow,
                        borderRadius: 20, alignItems: "center", justifyContent: "center",
                        padding: 4
                    }}>
                        {/* <Entypo
                            name="cross"
                            color={'#1E272E'}
                            size={25}
                        /> */}
                        <AntDesign name="close" size={16} color="#485460" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    viewInputSearch: {
        flexDirection: "row", alignItems: "center", backgroundColor: "#fff", width: "90%",
        marginTop: 45, alignSelf: "center", borderRadius: 10,
        // overflow: "hidden"
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
