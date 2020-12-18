import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Animated, { Extrapolate } from 'react-native-reanimated';
import { Feather, Entypo } from "@expo/vector-icons";

import { getStatusBarHeight } from 'react-native-status-bar-height';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

import { SvgHeaderSearchIcon } from '../../components/svg/header_search_icon';
import { SvgHeaderUserIcon } from '../../components/svg/header_user_icon';

import { COLORS } from '../../constants/colors';
import { HEADER_BAR_HEIGHT, LAYOUT, spacing } from '../../constants/layout';


import { placesList as LIST } from '../../dummyData/DummyData'
import { Colors } from '../../constants/Theme';
import HomeCard from '../../components/HomeCard';

const NoListImg = require('../../assets/images/emptyRestaurantList.png')
// import SkeletonContent from 'react-native-skeleton-content';

const HEADER_HEIGHT = HEADER_BAR_HEIGHT * 3 + getStatusBarHeight();

export default HomeScreen = (props) => {
    const [loading, setLoading] = useState(false)
    const [searchIconPress, setsearchIconPress] = useState(false)

    const navigation = useNavigation();

    const colorScheme = 'dark';
    const scrollYAnimatedValue = new Animated.Value(0);
    const scrollRef = useRef(null);

    const headerHeight = scrollYAnimatedValue.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT + HEADER_BAR_HEIGHT + getStatusBarHeight() + spacing(1)],
        extrapolate: Extrapolate.CLAMP,
    });
    const searchBarOpacity = scrollYAnimatedValue.interpolate({
        inputRange: [0, HEADER_HEIGHT / 6],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP,
    });
    const searchBarWidth = scrollYAnimatedValue.interpolate({
        inputRange: [0, HEADER_HEIGHT / 2],
        outputRange: [LAYOUT.window.width - spacing(3.5), HEADER_BAR_HEIGHT],
        extrapolate: Extrapolate.CLAMP,
    });
    const searchBarColor = Animated.interpolateColors(scrollYAnimatedValue, {
        inputRange: [0, HEADER_HEIGHT / 2],
        outputColorRange: [COLORS[colorScheme].common.white, COLORS[colorScheme].secondary.main],
    });
    const searchBarTop = scrollYAnimatedValue.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [HEADER_HEIGHT - 1.7 * HEADER_BAR_HEIGHT, getStatusBarHeight()],
        extrapolate: Extrapolate.CLAMP,
    });
    const titleHeaderMarginLeft = scrollYAnimatedValue.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, HEADER_BAR_HEIGHT + spacing(1)],
        extrapolate: Extrapolate.CLAMP,
    });

    useEffect(() => {

        const renderUserIcon = ({ }) => {
            // return <Ionicons name="ios-contact" size={30} onPress={(): void => propsUserIcon.navigation.navigate('SelectSignIn')} />;
            return (
                <View>
                    {searchIconPress ? null :
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('Setting')}
                        >
                            <SvgHeaderUserIcon height={HEADER_BAR_HEIGHT} />
                        </TouchableOpacity>
                    }
                </View>
            );
        };
        const renderTitle = () => {
            return (
                <View>
                    {searchIconPress ? null :
                        <Animated.View
                            style={{
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                marginLeft: titleHeaderMarginLeft,
                            }}
                        >
                            <Text style={{
                                fontSize: 20, color: COLORS[colorScheme].text.primary
                            }} ellipsizeMode="tail" numberOfLines={1}>
                                Bonjour '80' Vincent Delacourt
          </Text>
                        </Animated.View>
                    }
                </View>
            );
        };

        navigation.setOptions({
            title: 'Bonjour Comment allez-vous tous et nous ewnsemble',
            headerTitle: renderTitle,
            headerRight: renderUserIcon,
        });

    }, [colorScheme, navigation, titleHeaderMarginLeft]);

    let ItemsOdd = []
    let ItemsEven = []

    for (var i = 0; i < LIST.length; i++) {
        if ((i + 2) % 2 == 0) {
            ItemsOdd.push(LIST[i]);
        }
        else {
            ItemsEven.push(LIST[i]);
        }
    }
    const dummyArray = [1, 2, 3]

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.txtHeading}>
                    Autour de vous
            </Text>
                <View style={{ flexDirection: "row" }}>
                    <FlatList
                        data={loading ? dummyArray : ItemsOdd}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item._id}
                        renderItem={(itemData) => (
                            <HomeCard
                                navigation={navigation}
                                img={loading ? null : itemData.item.img}
                                rating={loading ? null : itemData.item.rate}
                                name={loading ? null : itemData.item.name}
                                distance={loading ? null : itemData.item.distance}
                                services={loading ? null : itemData.item.services}
                                loading={loading}
                            />
                        )}
                    />
                    <FlatList
                        data={loading ? dummyArray : ItemsEven}
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: 15 }}
                        keyExtractor={(item) => item._id}
                        renderItem={(itemData) => (
                            <HomeCard
                                navigation={navigation}
                                img={loading ? null : itemData.item.img}
                                rating={loading ? null : itemData.item.rate}
                                name={loading ? null : itemData.item.name}
                                distance={loading ? null : itemData.item.distance}
                                services={loading ? null : itemData.item.services}
                                loading={loading}
                            />
                        )}
                    />
                </View>
            </ScrollView>
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
