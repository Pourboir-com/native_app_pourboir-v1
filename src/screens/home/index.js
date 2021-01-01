import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
  Image
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

import { placesList as LIST } from "../../dummyData/DummyData";
import { Colors } from "../../constants/Theme";
import HomeCard from "../../components/HomeCard";
import { spacing } from "../../constants/layout";

import Header from "./HeaderAnimated";
import HeaderSimple from "./HeaderSimple";
import GlobalHeader from '../../components/GlobalHeader';

import HomeScreenContent from '../../components/HomeContent'
import { StatusBar } from 'expo-status-bar';

import i18n from "../../li8n";
import { ImageBackground } from "react-native";
import { loadAsync } from 'expo-font';

export default HomeScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [searchIconPress, setSearchIconPress] = useState(false);

  const navigation = useNavigation();


  useEffect(async () => {
    await loadAsync({
      // Load a font `Montserrat` from a static resource
      ProximaNova: require('../../assets/fonts/ProximaNova/ProximaNova-Regular.otf'),
      ProximaNovaBold: require('../../assets/fonts/ProximaNova/ProximaNova-Bold.otf')
    });

    setTimeout(() => {
      setLoading(false)
    }, 2500)

    // setTimeout(() => {
    //     navigation.navigate('Home', { crossIcon: false })
    // }, 4000)

  }, [])


  return (
    <>
      {/* <StatusBar /> */}
      {
        !props.route.params.crossIcon ?
          <>
            {!searchIconPress ? (
              <Header
                setsearchIconPress={setSearchIconPress}
                searchIconPress={searchIconPress}
                navigation={props.navigation}
              >
                <StatusBar translucent={true} style='dark' />

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
            ) : (
                <>

                  <HeaderSimple
                    setSearchIconPress={setSearchIconPress}
                    searchIconPress={searchIconPress}
                  />
                  <StatusBar translucent={true} style='dark' />
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
              )}
          </>
          :
          <>
            <ImageBackground 
            style={{ backgroundColor: "red", width: '100%', height: 110 }}
            resizeMode='cover'
             source={require('../../assets/images/Group3.png')}>
              <GlobalHeader
                arrow={true}
                headingText={i18n.t('your_restaurant')}
                fontSize={17}
                color={Colors.fontDark}
                navigation={navigation}
                setting={true}
                backgroundColor={'transparent'}
              />
            </ImageBackground>
            <StatusBar translucent={true} style='dark' />
            <HomeScreenContent
              loading={loading}
              setLoading={setLoading}
              searchIconPress={searchIconPress}
              setSearchIconPress={setSearchIconPress}
              route={props.route}
            />
          </>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  inputSearch: {
    height: 45,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    paddingVertical: 0,
    flex: 1,
  },
  viewInputSearch: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "90%",
    marginTop: 45,
    alignSelf: "center",
    borderRadius: 7,
    overflow: "hidden",
  },
  viewHeader2: {
    width: "100%",
    height: 110,
    backgroundColor: Colors.yellow,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  inputSearch: {
    height: 45,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    paddingVertical: 0,
    flex: 1,
  },
  viewInputSearch: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "90%",
    marginTop: 45,
    alignSelf: "center",
    borderRadius: 7,
    overflow: "hidden",
  },
  viewHeader2: {
    width: "100%",
    height: 110,
    backgroundColor: Colors.yellow,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  txt1NoRest: {
    fontSize: 16,
    color: Colors.fontDark,
    textAlign: "center",
    maxWidth: 190,
    marginTop: 20,
  },
  txt2NoRest: {
    fontSize: 16,
    color: Colors.fontLight,
    textAlign: "center",
    maxWidth: 320,
    marginTop: 15,
  },
  viewEmptyList: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
    alignItems: "center",
  },
  btnCross: {
    backgroundColor: "#fff",
    position: "absolute",
    alignSelf: "flex-end",
    borderRadius: 20,
    margin: -1,
    right: 0,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  view2Card: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txt2Card: {
    color: "#EDEFEE",
    fontSize: 13,
  },
  imgCard: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  viewItemConatier: {
    width: Dimensions.get("window").width * 0.45,
    height: Dimensions.get("window").width * 0.56,
    margin: Dimensions.get("window").width * 0.02,
    backgroundColor: "red",
    borderRadius: 12,
    overflow: "hidden",
  },
  txtHeading: {
    fontSize: 22,
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
  },
});
