import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import GlobalHeader from '../../components/GlobalHeader';
import { Colors } from '../../constants/Theme';
import * as ImagePicker from "expo-image-picker";

import i18n from '../../li8n';

const Setting = ({ navigation }) => {
    const [image, setImage] = useState(
        // null
        'https://www.kindpng.com/picc/m/136-1369892_avatar-people-person-business-user-man-character-avatar.png'
    );

    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
    }

    const _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 4],
                quality: 1,
            });
            if (!result.cancelled) {
                setImage(result.uri);
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };
    const homeNavigation = (navigation) => {
        navigation.navigate('Home')
    }

    return <View style={styles.container}>
        <GlobalHeader
            arrow={true}
            headingText="Parametre"
            fontSize={18}
            color="#000"
            navigation={navigation}
        />
        {/* <StatusBar backgroundColor={Colors.yellow} /> */}

        <View style={styles.viewProfile}>
            <TouchableOpacity
                onPress={() => _pickImage()}
                style={styles.viewImg}
            >
                {image === null || image === undefined ?
                    <FontAwesome name="user-circle-o" size={110} color="#fff" />
                    :
                    <Image
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 60,
                        }}
                        source={{ uri: image }}
                        resizeMode="cover"
                    />
                }
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => _pickImage()}
                style={styles.btnPencil}
            >
                <View style={styles.viewPencil}>
                    <MaterialCommunityIcons name="pencil-outline" color='#fff' size={16} />
                </View>
            </TouchableOpacity>
            {/* <View style={styles.viewImg}>
              <FontAwesome name="user-circle-o" size={120} color="#fff" />
            </View> */}
            <Text style={styles.txtName}>Christine Zhou</Text>
        </View>
        <View style={styles.viewBtnConatiner}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.viewItem}>
                    <View style={styles.viewIcon}>
                        <FontAwesome name="star" size={20} color={Colors.yellow} />
                    </View>
                    <Text>{i18n.t('rate_application')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewItem}>
                    <View style={styles.viewIcon}>
                        <FontAwesome name="envelope" size={16} color={Colors.yellow} />
                    </View>
                    <Text>{i18n.t('contact_us')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={[styles.viewItem, { marginBottom: 0 }]}>
                    <View style={styles.viewIcon}>
                        <FontAwesome name="cutlery" size={16} color={Colors.yellow} />
                    </View>
                    <Text>{i18n.t('are_you_waiter')}</Text>

                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row-reverse',
                        }}>
                        <View style={[styles.viewIcon2,]}>
                            <FontAwesome name="angle-right" size={26} color={'grey'} />
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
        <View >
            <Text style={styles.versionText}>
                Version 2.17.4.0.1.0
            </Text>
        </View>
        <TouchableOpacity style={styles.btnValider}>
            <Text>{i18n.t('sign_out')}</Text>
        </TouchableOpacity>
    </View>
}
export default Setting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:"center",
        alignItems: 'center',
        backgroundColor: "#EEF0EF"
    },
    versionText: {
        marginTop: 15, color: 'grey'
    },
    viewPencil: {
        width: 30, height: 30, backgroundColor: "#1E272E", borderRadius: 20, justifyContent: "center",
        alignItems: "center"
    },
    btnPencil: {
        backgroundColor: "#FCDF6F", width: 35, height: 35, borderRadius: 20, justifyContent: "center",
        alignItems: "center", alignSelf: "center", marginRight: -70, marginTop: -30
    },
    viewIcon: {
        width: 30, height: 30, backgroundColor: "#FFF6D4", borderRadius: 5, marginRight: 10,
        justifyContent: "center", alignItems: "center",
    },
    viewIcon2: {
        width: 30, height: 30, borderRadius: 5, marginRight: 10,
        justifyContent: "center", alignItems: "center",
    },
    viewBtnConatiner: {
        width: "90%", alignSelf: "center", borderRadius: 15, marginTop: -45, overflow: "hidden", backgroundColor: "#EEF0EF",
    },
    viewItem: {
        width: "100%", height: 60, backgroundColor: "#fff", marginBottom: 1, flexDirection: "row",
        alignItems: "center", paddingHorizontal: 10
    },
    btnValider: {
        backgroundColor: Colors.yellow, width: "90%", justifyContent: "center", alignItems: "center",
        height: 50, borderRadius: 8, marginTop: 3, position: "absolute", bottom: 10
    },
    txtName: {
        alignSelf: "center", marginTop: 10, fontSize: 24, color: Colors.fontDark
    },
    viewImg: {
        width: 120,
        height: 120,
        borderRadius: 80, backgroundColor: "#bbb",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        marginTop: 50,
        alignSelf: "center"
    },
    viewProfile: {
        backgroundColor: Colors.yellow, width: "100%", height: Dimensions.get('window').height * 0.5, marginTop: -20,
        borderBottomLeftRadius: 40, borderBottomRightRadius: 40
    }
})