import React, { useState } from 'react'
import {
    StyleSheet, Text, View, StatusBar, ImageBackground, ScrollView, Image,
    Dimensions, TouchableOpacity, FlatList, SafeAreaView, KeyboardAvoidingView
} from 'react-native';
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import ConfirmationModal from '../../components/modals/ConfirmModal';
import HelpUsImproveModal from '../../components/modals/HelpUsImproveModal'
import { Colors } from '../../constants/Theme';
import RatingStar from '../../components/RatingComponent';
import GlobalHeader from '../../components/GlobalHeader';

import i18n from '../../li8n';

const ReviewDetails = ({ navigation, route }) => {
    // console.log('routesssss',route.params)
    const { img, name, rating, distance, services } = route.params;
    const [confirmModalVisible, setconfirmModalVisible] = useState(false);
    const [helpUsModalVisible, sethelpUsModalVisible] = useState(false);

    const handleModalClose = () => {
        setconfirmModalVisible(false);
        sethelpUsModalVisible(false);
    };

    const handleConfirmModalOpen = () => {
        setconfirmModalVisible(true);
    };

    const handleHelpUsModalOpen = () => {
        //   alert('working')
        sethelpUsModalVisible(true);
    }

    // Star arrayyyyyyyy
    const [starSelect, setstarSelect] = useState(3.5)
    const obj = [1, 2, 3, 4, 5];
    const onPressStar = (v) => {
        setstarSelect(v);
    }

    return <SafeAreaView style={styles.container}>
        {/* <StatusBar hidden={true} /> */}
        <ScrollView bounces={false} alwaysBounceVertical={false} showsVerticalScrollIndicator={false}>
            <View style={styles.viewImg}>
                <ImageBackground
                    source={{ uri: img }}
                    style={{ flex: 1, justifyContent: "space-between" }}
                >
                    {/* <View style={styles.viewHeader}>
                        <TouchableOpacity 
                        // style={{ paddingHorizontal: 14, paddingBottom: 30, backgroundColor: 'red' }}
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons
                                // style={{ paddingHorizontal: 14, paddingBottom: 15,
                                // backgroundColor:'red',zIndex:99999999 }}
                                onPress={() => { alert('navigation.goBack()') }}
                                name={"arrow-back"} size={25} color="#fff"
                            />
                            <AntDesign name="plus" size={16} color={Colors.fontDark} />

                        </TouchableOpacity>
                        <View style={{ flex: 1, }}>
                            <Text style={styles.txtName}>{name}</Text>
                        </View>
                    </View> */}
                    <GlobalHeader
                        arrow={true}
                        headingText={name}
                        fontSize={20}
                        color={'#fff'}
                        bold={true}
                        BackIconColor={'#fff'}
                        backgroundColor={'transparent'}
                        navigation={navigation}
                    />
                    <View style={styles.viewBottom}>
                        <View style={{ flexDirection: "row" }}>
                            {obj.map((v, i) => {
                                return (
                                    <TouchableOpacity onPress={() => { onPressStar(v) }}>
                                        <RatingStar starSize={20}
                                            type={v <= starSelect ? "filled" :
                                                v === starSelect + 0.5 ? "half" : "empty"
                                            }
                                            notRatedStarColor='rgba(255,255,255, 0.6)'
                                        />
                                    </TouchableOpacity>
                                )
                            }
                            )}
                        </View>
                        <Text style={{ color: "#fff" }}>{distance}</Text>
                    </View>
                </ImageBackground>
            </View>
            <View style={{ flexDirection: "row", marginTop: 15, marginHorizontal: 15 }}>
                <Text style={styles.txtHeading}>{i18n.t('waiters')}</Text>
                <Text style={styles.txtNumRaters}>{services.length}</Text>
            </View>

            <FlatList
                data={services}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id}
                renderItem={(itemData) => (
                    <TouchableOpacity onPress={() => navigation.navigate('RateYourService')} style={styles.viewItemConatier}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image
                                style={{ width: 45, height: 45, borderRadius: 30 }}
                                source={{ uri: itemData.item.imgAvatar }}
                            />
                            <View style={{ marginLeft: 10 }}>
                                <Text>{itemData.item.userName}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    {obj.map((v, i) => {
                                        return (
                                            <TouchableOpacity onPress={() => { onPressStar(v) }}>
                                                <RatingStar starSize={17}
                                                    type={v <= starSelect ? "filled" :
                                                        v === starSelect + 0.5 ? "half" : "empty"
                                                    }
                                                    notRatedStarColor='rgba(0,0,0,0.2)'
                                                />
                                            </TouchableOpacity>
                                        )
                                    }
                                    )}
                                </View>
                            </View>
                        </View>
                        <MaterialIcons name="chevron-right" size={28} color="grey" />
                    </TouchableOpacity>
                )}
            />
            <View style={styles.viewAddReview}>
                <Text style={styles.txtCantFind}>{i18n.t('cant_find_your_server')}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.txtAddReview}>{i18n.t('add_your_server')}</Text>
                    <TouchableOpacity
                        onPress={handleHelpUsModalOpen}
                        style={styles.btnAdd}
                    >
                        <AntDesign name="plus" size={16} color={Colors.fontDark} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        <TouchableOpacity
            onPress={handleConfirmModalOpen}
            style={styles.viewLastBtn}
        >
            <Text>{i18n.t('are_you_waiter')}</Text>
        </TouchableOpacity>

        <ConfirmationModal
            isVisible={confirmModalVisible}
            handleModalClose={handleModalClose}
            name={name}
        />
        {/* <KeyboardAvoidingView>
        <ScrollView> */}
        <HelpUsImproveModal
            isVisible={helpUsModalVisible}
            handleModalClose={handleModalClose}
        />
        {/* </ScrollView>
        </KeyboardAvoidingView> */}

    </SafeAreaView>
}
export default ReviewDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F3F2"
    },
    btnAdd: {
        backgroundColor: Colors.yellow, padding: 4, borderRadius: 6, marginLeft: 10
    },
    txtAddReview: {
        fontSize: 16, color: Colors.fontDark
    },
    txtCantFind: {
        fontSize: 16, color: Colors.fontLight
    },
    viewAddReview: {
        backgroundColor: "transparent", width: "90%", alignSelf: "center", marginBottom: 10,
        justifyContent: "center", alignItems: "center", borderRadius: 10, paddingVertical: 15,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#DADADA'
    },
    viewLastBtn: {
        width: "90%", alignSelf: "center", backgroundColor: Colors.yellow, height: 50,
        justifyContent: "center", alignItems: "center", borderRadius: 10, marginBottom: 15, marginTop: 1
    },
    txtNumRaters: {
        backgroundColor: Colors.yellow, padding: 2, paddingHorizontal: 9, marginLeft: 10, fontSize: 18,
        borderRadius: 9
    },
    txtHeading: {
        alignSelf: "center", fontSize: 20, fontWeight: 'bold'
    },
    viewHeader: {
        flexDirection: "row", marginTop: 30, paddingHorizontal: 10
    },
    viewBottom: {
        flexDirection: "row", marginBottom: 20, justifyContent: "space-between",
        alignItems: "center", paddingHorizontal: 20
    },
    txtName: {
        textAlign: "center", marginLeft: -25, color: "#fff", fontSize: 20
    },
    viewImg: {
        width: "100%", height: 200, borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
        overflow: "hidden",
    },
    viewItemConatier: {
        width: "90%", backgroundColor: "#fff", alignSelf: "center", height: 80, marginVertical: 10,
        borderRadius: 10, alignItems: "center", flexDirection: "row", paddingHorizontal: 15,
        justifyContent: "space-between"
    },
})