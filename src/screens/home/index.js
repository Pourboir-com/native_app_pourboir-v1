import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Animated
} from 'react-native';
import { Feather, Entypo } from "@expo/vector-icons";

import { placesList as LIST } from '../../dummyData/DummyData'
import { Colors } from '../../constants/Theme';
import HomeCard from '../../components/HomeCard';
import { spacing } from '../../constants/layout';

import Header from './HeaderAnimated';
import HeaderSimple from './HeaderSimple';
// import { StatusBar } from 'react-native';

import i18n from '../../li8n';


function HomeScreenContent({ searchIconPress, setSearchIconPress, route }) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(LIST)

    const navigation = useNavigation();
    let ItemsOdd = []
    let ItemsEven = []

    // useEffect(()=> {
    // },[])
    for (var i = 0; i < data.length; i++) {
        if ((i + 2) % 2 == 0) {
            ItemsOdd.push(data[i]);
        }
        else {
            ItemsEven.push(data[i]);
        }
    }

    const dummyArray = [1, 2, 3]



    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    })

    // const deleteItem = (id) => data.find((item)=>{
    //     return item.id === id;
    // });

    // data = data.filter((item)=> {
    //     return item.id !== data.id;
    // })
    const onDeleteCard = (id) => {
        // let newData = data;
        // console.log(id)

        // console.log(data[id-1])
        // let removeItem =  data[id - 1]

        // for (let i=0; i <= data.length; i++) {
        //     if(data.indexOf(data[id]) == id ) {
        //         console.log('Valid', 'id =',id-1 )
        //     } else {
        //         console.log('This has to be delete', 'id =',id-1 )
        //     }
        // }
        // console.log(data.indexOf(data[id]))
        // console.log('Data id', id)

        // let objDelete = newData;
        // console.log(objDelete)
        let newData = data.splice(id, id+1)
        console.log('New Dataaaaa',newData)
        // newData.splice(objDelete, 1);
        // setData({data: newData});
        // data.id === id ? setData(data.id)
        // setData([...data, data.id === id ? data.id === null : null])
    }



    return (
        <>
            {
                LIST.length === 0 ?
                    <View style={styles.viewEmptyList}>
                        <View style={{ backgroundColor: "#fff", width: 160, height: 160, borderRadius: 100 }}>
                            <Image source={NoListImg}
                                style={{ width: 260, height: 220, marginTop: -55, marginLeft: -50 }}
                                resizeMode="contain"
                            />
                        </View>
                        <Text style={styles.txt1NoRest}>
                            {i18n.t('you_have_no_restaurant')}
                        </Text>
                        <Text style={styles.txt2NoRest}>
                            {i18n.t('search_for_rest_and_add')}
                        </Text>
                    </View>
                    :
                    <ScrollView bounces={true} alwaysBounceVertical={true} showsVerticalScrollIndicator={false}>

                        <Text style={styles.txtHeading}>
                            {i18n.t('around_you')}
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <FlatList
                                data={loading ? dummyArray : ItemsOdd}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                renderItem={(itemData) => (
                                    <HomeCard
                                        navigation={navigation}
                                        // id={itemData.item.id}
                                        img={loading ? null : itemData.item.img}
                                        rating={loading ? null : itemData.item.rate}
                                        name={loading ? null : itemData.item.name}
                                        distance={loading ? null : itemData.item.distance}
                                        services={loading ? null : itemData.item.services}
                                        loading={loading}
                                        crossIcon={route.params.crossIcon}
                                        deleteCall={() => onDeleteCard(itemData.item.id)}
                                    />
                                )}
                            />
                            {/* <FlatList
                                data={loading ? dummyArray : ItemsEven}
                                showsVerticalScrollIndicator={false}
                                style={{ marginTop: 15 }}
                                keyExtractor={(item) => item._id}
                                renderItem={(itemData) => (
                                    <HomeCard
                                        navigation={navigation}
                                        // key={item._id}
                                        img={loading ? null : itemData.item.img}
                                        rating={loading ? null : itemData.item.rate}
                                        name={loading ? null : itemData.item.name}
                                        distance={loading ? null : itemData.item.distance}
                                        services={loading ? null : itemData.item.services}
                                        loading={loading}
                                        crossIcon={route.params.crossIcon}
                                        deleteCall={() => onDeleteCard(itemData.item.id)}
                                    />
                                )}
                            /> */}
                        </View>
                    </ScrollView>
            }
        </>
    )

}

export default HomeScreen = (props) => {



    const [loading, setLoading] = useState(false)
    const [searchIconPress, setSearchIconPress] = useState(false)

    const navigation = useNavigation();


    // React.useEffect(() => {


    //     navigation.setOptions({
    //         headerTitle: '',
    //         headerRight: '',
    //         headerShown: true,
    //         headerLeft: null,
    //         headerTransparent: true,
    //         headerTitleAlign: 'left',
    //         headerRightContainerStyle: { paddingRight: spacing(2) }
    //     });

    // }, [searchIconPress]);


    return (
        <>
            {/* <StatusBar /> */}
            {
                !searchIconPress ?
                    <Header
                        setsearchIconPress={setSearchIconPress}
                        searchIconPress={searchIconPress}
                        navigation={props.navigation}
                    >
                        {
                            <HomeScreenContent
                                loading={loading}
                                setLoading={setLoading}
                                searchIconPress={searchIconPress}
                                setSearchIconPress={setSearchIconPress}
                                route={props.route}
                            />
                        }
                    </Header>
                    :
                    <>
                        {/* <View style={styles.viewHeader2}>
                            <View style={styles.viewInputSearch}>
                                <TouchableOpacity
                                    onPress={() => setSearchIconPress(!searchIconPress)}
                                    style={{ paddingHorizontal: 8 }}
                                >
                                    <Feather name="search" color={Colors.yellow} size={25} />
                                </TouchableOpacity>
                                <TextInput placeholder="Search" style={styles.inputSearch} />
                                <TouchableOpacity style={{ paddingHorizontal: 8 }}>
                                    <Entypo name="circle-with-cross" color={Colors.yellow} size={25} />
                                </TouchableOpacity>
                            </View>
                        </View> */}
                        <HeaderSimple
                            setSearchIconPress={setSearchIconPress}
                            searchIconPress={searchIconPress}
                        />
                        {
                            <HomeScreenContent
                                loading={loading}
                                setLoading={setLoading}
                                searchIconPress={searchIconPress}
                                setSearchIconPress={setSearchIconPress}
                                route={props.route}
                            />
                        }
                    </>

            }
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    inputSearch: {
        height: 45, backgroundColor: "#fff",
        paddingHorizontal: 5, paddingVertical: 0, flex: 1
    },
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
    txt1NoRest: {
        fontSize: 16, color: Colors.fontDark, textAlign: "center", maxWidth: 190, marginTop: 20
    },
    txt2NoRest: {
        fontSize: 16, color: Colors.fontLight, textAlign: "center", maxWidth: 320, marginTop: 15
    },
    viewEmptyList: {
        flex: 1, backgroundColor: "#F9F9F9", justifyContent: "center", alignItems: "center"
    },
    btnCross: {
        backgroundColor: "#fff", position: "absolute", alignSelf: "flex-end",
        borderRadius: 20, margin: -1, right: 0, width: 30, height: 30,
        justifyContent: "center", alignItems: "center"
    },
    view2Card: {
        flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "space-between"
    },
    txt2Card: {
        color: "#EDEFEE", fontSize: 13
    },
    imgCard: {
        flex: 1, padding: 12, justifyContent: 'space-between'
    },
    viewItemConatier: {
        width: Dimensions.get('window').width * 0.45,
        height: Dimensions.get('window').width * 0.56,
        margin: Dimensions.get('window').width * 0.02, backgroundColor: "red",
        borderRadius: 12, overflow: "hidden"
    },
    txtHeading: {
        fontSize: 22, marginTop: 10, width: "90%", alignSelf: "center"
    }
})
