import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    ScrollView,
    TextInput,
    Dimensions,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    SafeAreaView
} from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import GlobalHeader from '../../components/GlobalHeader';
import { rateList as RATELIST } from '../../dummyData/DummyData'
import { Colors } from '../../constants/Theme';
import ThankRatingModal from '../../components/modals/ThanksRatingModal'
import RatingStar from '../../components/RatingComponent';

import { StatusBar } from 'expo-status-bar';

import i18n from '../../li8n';

const imgBg = require('../../assets/images/Group5.png')

const RateService = ({ navigation }) => {

    const [isVisible, setisVisible] = useState(false);

    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
    }

    const handleModalClose = () => {
        setisVisible(false);
    };

    const handleModalOpen = () => {
        setisVisible(true);
    };

    // Star arrayyyyyyyy
    const [starSelect, setstarSelect] = useState(3.5)
    const obj = [1, 2, 3, 4, 5];

    const onPressStar = (v) => {
        setstarSelect(v);
    }

    return <View
        style={styles.container}
    >
        <StatusBar translucent={true} style='light' />
        <View style={styles.viewProfile}>
            <ImageBackground
                style={{ width: '100%', height: 'auto', paddingBottom: 70 }}
                source={imgBg} resizeMode='stretch' >
                <GlobalHeader
                    arrow={true}
                    headingText={i18n.t('rate_your_server')}
                    fontSize={17}
                    color={Colors.fontDark}
                    backgroundColor={'transparent'}
                    navigation={navigation}
                />
                <View style={styles.viewImg}>
                    <FontAwesome name="user-circle-o" size={100} color="#fff" />
                </View>
                <Text style={[styles.txtName,{fontFamily:'ProximaNovaBold'}]}>Amy Farha</Text>
            </ImageBackground>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.viewFlatlist}>
            <TouchableOpacity
                onPress={() => navigation.navigate('socialLogin')}
                style={styles.viewListCard}
            >
                <Text style={[styles.txtCard,{fontFamily:'ProximaNovaBold'}]}>{i18n.t('hospitality')}</Text>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    {obj.map((v, i) => {
                        return (
                            <TouchableOpacity onPress={() => { onPressStar(v) }}>
                                <RatingStar
                                    padding={true}
                                    starSize={25}
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
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('socialLogin')}
                style={styles.viewListCard}
            >
                <Text style={[styles.txtCard,{fontFamily:'ProximaNovaBold'}]}>{i18n.t('speed')}</Text>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    {obj.map((v, i) => {
                        return (
                            <TouchableOpacity onPress={() => { onPressStar(v) }}>
                                <RatingStar
                                    padding={true}
                                    starSize={25}
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
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('socialLogin')}
                style={styles.viewListCard}
            >
                <Text style={[styles.txtCard,{fontFamily:'ProximaNovaBold'}]}>{i18n.t('service')}</Text>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    {obj.map((v, i) => {
                        return (
                            <TouchableOpacity onPress={() => { onPressStar(v) }}>
                                <RatingStar
                                    padding={true}
                                    starSize={25}
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
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('socialLogin')}
                style={styles.viewListCard}
            >
                <Text style={[styles.txtCard,{fontFamily:'ProximaNovaBold'}]}>{i18n.t('professionalism')}</Text>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                    {obj.map((v, i) => {
                        return (
                            <TouchableOpacity onPress={() => { onPressStar(v) }}>
                                <RatingStar
                                    padding={true}
                                    starSize={25}
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
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>

                <View style={styles.viewTip}>
                    <Text style={[styles.txtCard,{fontFamily:'ProximaNovaBold'}]}>{i18n.t('your_tip_to_waiter')}</Text>
                    <TextInput style={[styles.inputStyle,{fontFamily:'ProximaNova'}]} />
                </View>

            </View>
        </ScrollView>
        <TouchableOpacity onPress={handleModalOpen} style={styles.btnValider}>
            <Text style={{ fontSize: 16,fontFamily:'ProximaNova', color:Colors.fontLight }}>{i18n.t('validate')}</Text>
        </TouchableOpacity>

        <ThankRatingModal
            isVisible={isVisible}
            handleModalClose={handleModalClose}
        />


    </View>
}
export default RateService;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:"center",
        // alignItems: 'center',
        backgroundColor: "#F9F9F9"
    },
    inputStyle: {
        height: 45, width: "80%", backgroundColor: "#F8F8F8", borderRadius: 10, marginTop: 12,
        fontSize: 18, paddingVertical: 0, paddingLeft: 10, paddingRight: 10
    },
    viewTip: {
        backgroundColor: "#fff", width: "90%", alignSelf: "center", marginBottom: 10, height: 120,
        borderRadius: 15, alignItems: "center", borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)'
    },
    txtCard: {
        fontSize: 18, marginTop: 15
    },
    viewFlatlist: {
        backgroundColor: "transparent", width: "100%", flex: 1, marginTop: -40
    },
    btnValider: {
        backgroundColor: '#EAEAEA', width: "90%", justifyContent: "center", alignItems: "center",
        height: 50, borderRadius: 8, marginBottom: 15, marginTop: 2, alignSelf: "center"
    },
    viewListCard: {
        backgroundColor: "#fff", width: "90%", alignSelf: "center", marginBottom: 10, height: 100,
        borderRadius: 15, alignItems: "center", borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)',

    },
    txtName: {
        alignSelf: "center", marginTop: 10, fontSize: 24, color: Colors.fontDark
    },
    viewImg: {
        width: 100,
        height: 100,
        borderRadius: 50, backgroundColor: "#bbb",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        marginTop: 10,
        alignSelf: "center"
    },
    viewProfile: {
        backgroundColor: Colors.yellow, width: "100%", marginTop: -20,
        borderBottomLeftRadius: 40, borderBottomRightRadius: 40
    }
})