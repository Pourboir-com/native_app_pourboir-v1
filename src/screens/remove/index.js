import { useNavigation } from "@react-navigation/native";
import React, { useState,  } from "react";
import { Colors } from "../../constants/Theme";
import GlobalHeader from '../../components/GlobalHeader';

import HomeScreenContent from '../../components/HomeContent'

import i18n from "../../li8n";
export default Remove = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchIconPress, setSearchIconPress] = useState(false);

    const navigation = useNavigation();

    return (
        <>
            <GlobalHeader
                arrow={true}
                headingText={i18n.t('your_restaurant')}
                fontSize={17}
                color={Colors.fontDark}
                navigation={navigation}
                setting={true}
            />
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
