import React, { useState } from 'react'
import {
    StyleSheet, Text, View, ImageBackground, ScrollView, Image,
    Dimensions, TouchableOpacity, FlatList, SafeAreaView, KeyboardAvoidingView
} from 'react-native';
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import ConfirmationModal from '../../components/modals/ConfirmModal';
import HelpUsImproveModal from '../../components/modals/HelpUsImproveModal'
import { Colors } from '../../constants/Theme';
import RatingStar from '../../components/RatingComponent';
import GlobalHeader from '../../components/GlobalHeader';
import { StatusBar } from 'expo-status-bar';

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

    return <View style={styles.container}>
        {/* <StatusBar 
        backgroundColor={Colors.yellow}
        hidden={true} /> */}
        <StatusBar translucent={true} style='light' />
        <View style={styles.viewImg}>
            <ImageBackground
                source={{ uri: img }}
                style={{ flex: 1, justifyContent: "space-between" }}
            >
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
                                <TouchableOpacity style={{ marginRight: 3 }} onPress={() => { onPressStar(v) }}>
                                    <RatingStar starSize={17}
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
                    <View style={{ alignItems:"flex-end"}}>
                        <Text style={{ color: "#fff",marginBottom:10, fontFamily:'ProximaNova', fontSize:16 }}>{distance}</Text>
                        <TouchableOpacity 
                        style={{ paddingHorizontal: 10, paddingVertical: 5, 
                            borderWidth:1, borderColor:"#fff", borderRadius:7
                        }}
                        >
                            <Text style={{ color: "#fff" }}>See the menu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
        <ScrollView bounces={false} alwaysBounceVertical={false} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: "row", marginTop: 15, marginHorizontal: 15 }}>
                <Text style={[styles.txtHeading, { fontFamily: 'ProximaNovaBold' }]}>{i18n.t('waiters')}</Text>
                <View>
                    <Text style={[styles.txtNumRaters, { fontFamily: 'ProximaNova' }]}>{services.length}</Text>
                </View>
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
                                <Text style={{ fontFamily: 'ProximaNova', fontSize: 18, color: Colors.fontLight }}>{itemData.item.userName}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    {obj.map((v, i) => {
                                        return (
                                            <TouchableOpacity style={{ marginRight: 2 }} onPress={() => { onPressStar(v) }}>
                                                <RatingStar starSize={15}
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
                <Text style={[styles.txtCantFind, { fontFamily: 'ProximaNova' }]}>{i18n.t('cant_find_your_server')}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={[styles.txtAddReview, { fontFamily: 'ProximaNovaBold' }]}>{i18n.t('add_your_server')}</Text>
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
            <Text style={{ fontFamily: 'ProximaNova', fontSize: 16, color: Colors.fontDark }}>
                {i18n.t('are_you_waiter')}
            </Text>
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

    </View>
}
export default ReviewDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9"
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
        backgroundColor: Colors.yellow, paddingVertical: 3, paddingHorizontal: 9,
        marginLeft: 10, fontSize: 18, borderRadius: 15
    },
    txtHeading: {
        alignSelf: "center", fontSize: 24
    },
    viewHeader: {
        flexDirection: "row", marginTop: 30, paddingHorizontal: 10
    },
    viewBottom: {
        flexDirection: "row", marginBottom: 20, justifyContent: "space-between",
        alignItems: "center", paddingHorizontal: 20, alignItems:'flex-end'
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