import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Image, Dimensions, TouchableOpacity, StatusBar, FlatList } from 'react-native';
import Animated, { Extrapolate } from 'react-native-reanimated';
import { MaterialIcons, Feather, Entypo } from "@expo/vector-icons";

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

  useLayoutEffect(() => {

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
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingTop: searchIconPress ? 0 : HEADER_HEIGHT, minHeight: searchIconPress ? 0 : LAYOUT.window.height + HEADER_HEIGHT }}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }])}
      >
        {searchIconPress ?
          <View style={styles.viewHeader2}>
            <View style={styles.viewInputSearch}>
              <TouchableOpacity
                onPress={() => setsearchIconPress(!searchIconPress)}
                style={{ paddingHorizontal: 8 }}
              >
                <Feather name="search" color={Colors.yellow} size={25} />
              </TouchableOpacity>
              <TextInput placeholder="Search" style={styles.inputSearch} />
              <TouchableOpacity style={{ paddingHorizontal: 8 }}>
                <Entypo name="circle-with-cross" color={Colors.yellow} size={25} />
              </TouchableOpacity>
            </View>
          </View>
          : null}
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
                Vous n’avez aucun restaurant pour le moment
                </Text>
              <Text style={styles.txt2NoRest}>
                Recherchez votre restaurant et ajoutez vous en choisissant: Vous êtes serveur
                </Text>
            </View>
            :
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
        }
      </Animated.ScrollView>
      {searchIconPress ? null :
        <Animated.View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}>
          <Animated.View style={[{ position: 'relative', top: headerHeight, height: HEADER_HEIGHT }]}>
            <Svg viewBox="0 0 375 190" preserveAspectRatio="none">
              <Defs>
                <ClipPath id="prefix__a">
                  <Path d="M0 0h375v170a20 20 0 01-20 20H20a20 20 0 01-20-20V0z" transform="translate(0 .981)" fill="#fcdf6f" />
                </ClipPath>
              </Defs>
              <Path data-name="Mask" d="M0 0h375v170a20 20 0 01-20 20H20a20 20 0 01-20-20V0z" fill="#fcdf6f" />
              <G data-name="BG" clipPath="url(#prefix__a)" transform="translate(0 -.981)">
                <Path
                  data-name="Weird Shape"
                  d="M238.418-41.74c59.628-43.534 217.933 62.136 224.724 167.256s-148.41 240.355-200.258 210.42 13.883-143.786 11.81-189.565S178.788 1.791 238.417-41.74z"
                  fill="#ffe685"
                />
              </G>
            </Svg>
          </Animated.View>

          <Animated.View
            style={{
              position: 'absolute',
              top: searchBarTop,
              height: HEADER_BAR_HEIGHT,
              width: searchBarWidth,
              left: spacing(1.5),
              borderRadius: HEADER_BAR_HEIGHT- HEADER_BAR_HEIGHT*0.75,
              backgroundColor: searchBarColor
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
              <TouchableOpacity 
              onPress={()=> setsearchIconPress(!searchIconPress)}
              style={{ paddingLeft: HEADER_BAR_HEIGHT / 4 }}>
                <SvgHeaderSearchIcon />
              </TouchableOpacity>
              <TextInput
                placeholder="Recherchez votre restaurant"
                style={{ flex: 1, paddingHorizontal: 25 }} />
            </View>
          </Animated.View>
        </Animated.View>
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
    marginTop: 15, alignSelf: "center", borderRadius: 7, overflow: "hidden"
  },
  viewHeader2: {
    width: "100%", height: 80, backgroundColor: Colors.yellow, borderBottomLeftRadius: 20,
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
