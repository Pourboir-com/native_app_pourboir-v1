import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolate } from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

import { SvgHeaderSearchIcon } from '../../components/svg/header_search_icon';
import { SvgHeaderUserIcon } from '../../components/svg/header_user_icon';

import { COLORS } from '../../constants/colors';
import { HEADER_BAR_HEIGHT, LAYOUT, spacing } from '../../constants/layout';

const HEADER_HEIGHT = HEADER_BAR_HEIGHT * 3 + getStatusBarHeight();

export default HomeScreen = (props) => {

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
    outputRange: [HEADER_HEIGHT - 1.5 * HEADER_BAR_HEIGHT, getStatusBarHeight()],
    extrapolate: Extrapolate.CLAMP,
  });
  const titleHeaderMarginLeft = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, HEADER_BAR_HEIGHT + spacing(1)],
    extrapolate: Extrapolate.CLAMP,
  });

  useLayoutEffect(() => {

    const renderUserIcon = () => {

      // return <Ionicons name="ios-contact" size={30} onPress={(): void => propsUserIcon.navigation.navigate('SelectSignIn')} />;
      return (
        <TouchableOpacity onPress={() => propsUserIcon.navigation.navigate('SelectSignIn')}>
          <SvgHeaderUserIcon height={HEADER_BAR_HEIGHT} />
        </TouchableOpacity>
      );
    };
    const renderTitle = () => {

      return (
        <Animated.View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginLeft: titleHeaderMarginLeft,
          }}
        >
          <Text style={{ fontFamily: 'ProximaNova-Bold', fontSize: 20, color: COLORS[colorScheme].text.primary }} ellipsizeMode="tail" numberOfLines={1}>
            Bonjour '80' Vincent Delacourt
          </Text>
        </Animated.View>
      );
    };

    navigation.setOptions({
      title: 'Bonjour Comment allez-vous tous et nous ewnsemble',
      headerTitle: renderTitle,
      headerRight: renderUserIcon,
    });

  }, [colorScheme,  navigation, titleHeaderMarginLeft ]);

  return (
    <>
      <Animated.ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingTop: HEADER_HEIGHT, minHeight: LAYOUT.window.height + HEADER_HEIGHT }}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } }])}
      >
        <View>
          <Text>
            yay
          </Text>
        </View>
        <View>
          <Text>
            yay
          </Text>
        </View>
        <View>
          <Text>
            yay
          </Text>
        </View>
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
            backgroundColor: searchBarColor
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
            <View style={{ paddingLeft: HEADER_BAR_HEIGHT / 4 }}>
              <SvgHeaderSearchIcon />
            </View>
            <Animated.Text style={[{
               fontSize: 14,
               fontFamily: 'ProximaNova-Regular',
               color: COLORS[colorScheme].text.secondary,
            }, { paddingLeft: spacing(1), opacity: searchBarOpacity }]}>Recherchez votre restaurant</Animated.Text>
          </View>
        </Animated.View>
      </Animated.View>
    </>
  );
};
