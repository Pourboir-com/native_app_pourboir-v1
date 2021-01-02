import { useNavigation } from "@react-navigation/native";
import React, { useState, } from "react";
import { ImageBackground } from "react-native";

import { Colors } from "../../constants/Theme";
import GlobalHeader from '../../components/GlobalHeader';

import HomeScreenContent from '../../components/HomeContent'

import i18n from "../../li8n";
import { View } from "react-native";
export default Remove = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchIconPress, setSearchIconPress] = useState(false);

    const navigation = useNavigation();

    return (
        <>
            <View style={{
                width: '100%', height: 100,
                backgroundColor: '#f9f9f9'
            }}>
                <View style={{
                    width: '100%', height: 100,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                    overflow: 'hidden',
                    backgroundColor: '#f9f9f9'
                }}>
                    <ImageBackground style={{
                        width: '100%', height: 100,
                    }} source={require('../../assets/images/Group3.png')}>

                        <GlobalHeader
                            arrow={true}
                            headingText={i18n.t('your_restaurant')}
                            fontSize={17}
                            color={Colors.fontDark}
                            navigation={navigation}
                            setting={true}
                            backgroundColor={'transparent'}
                            borderRadius={true}
                        />
                    </ImageBackground>
                </View>
            </View>

            <HomeScreenContent
                loading={loading}
                setLoading={setLoading}
                searchIconPress={searchIconPress}
                setSearchIconPress={setSearchIconPress}
                route={props.route}
            />
        </>
    );
};
