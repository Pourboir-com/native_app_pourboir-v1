import { useNavigation } from '@react-navigation/native';
import React, {
  useLayoutEffect,
  useRef,
  useEffect
} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Animated, { Extrapolate } from 'react-native-reanimated';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

import { SvgHeaderSearchIcon } from '../../components/svg/header_search_icon';
import { SvgHeaderUserIcon } from '../../components/svg/header_user_icon';

import { COLORS } from '../../constants/colors';
import { HEADER_BAR_HEIGHT, LAYOUT, spacing } from '../../constants/layout';

import i18n from '../../li8n';


const HEADER_HEIGHT = HEADER_BAR_HEIGHT * 3 + getStatusBarHeight();

export default HomeScreen = (props) => {
  const scrollRef = useRef(null);

  const navigation = useNavigation();

  const colorScheme = 'dark';
  const scrollYAnimatedValue = new Animated.Value(0);

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
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Setting')}>
            <SvgHeaderUserIcon height={HEADER_BAR_HEIGHT} />
          </TouchableOpacity>

        </View>
      );
    };
    const renderTitle = () => {
      return (
        <View>
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
              {i18n.t('hello')} Vincent Delacourt
            </Text>
          </Animated.View>
        </View>
      );
    };

    navigation.setOptions({
      headerTitle: renderTitle,
      headerRight: renderUserIcon,
      headerShown: true,
      headerLeft: null,
      headerTransparent: true,
      headerTitleAlign: 'left',
      headerRightContainerStyle: { paddingRight: spacing(2) }
    });

  });



  return (
    <>
      {/* <StatusBar backgroundColor={Colors.yellow}    /> */}
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingTop: props.searchIconPress ? 0 : HEADER_HEIGHT, minHeight: props.searchIconPress ? 0 : LAYOUT.window.height + HEADER_HEIGHT }}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }])}
      >

        {
          props.children
        }

      </Animated.ScrollView>
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
            borderRadius: HEADER_BAR_HEIGHT,
            backgroundColor: searchBarColor,

          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
            <TouchableOpacity
              onPress={() => props.setsearchIconPress(!props.searchIconPress)}
              style={{ paddingLeft: HEADER_BAR_HEIGHT / 4 }}>
              <SvgHeaderSearchIcon />
            </TouchableOpacity>
            <TextInput
              placeholder={i18n.t('find_your_restaurant')}
              style={{ flex: 1, paddingHorizontal: 25 }} />
          </View>
        </Animated.View>
      </Animated.View>
    </>
  );
};
