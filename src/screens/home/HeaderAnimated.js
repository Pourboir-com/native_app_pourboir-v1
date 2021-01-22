import { useNavigation } from '@react-navigation/native';
import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
  useContext,
} from 'react';
import { Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import Animated, { Extrapolate } from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';
import { SvgHeaderSearchIcon } from '../../components/svg/header_search_icon';
import { SvgHeaderUserIcon } from '../../components/svg/header_user_icon';
import { COLORS } from '../../constants/colors';
import { HEADER_BAR_HEIGHT, LAYOUT, spacing } from '../../constants/layout';
import { AntDesign } from '@expo/vector-icons';
import i18n from '../../li8n';
import Context from '../../contextApi/context';
// import * as Font from 'expo-font';
// import AppLoading from 'expo-app-loading';

const HomeScreen = props => {
  // const [fontLoaded, setFontLoaded] = useState(false);
  const { state } = useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  // const [userImage, setuserImage] = useState(
  //   state ? state.userDetails.image : '',
  // );
  // const [userName, setuserName] = useState(state ? state.userDetails.name : '');

  // const fetchFont = () => {
  //   return Font.loadAsync({
  //     ProximaNovaBold: require('../../assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
  //   });
  // };

  // useEffect(() => {
  //   setuserName(state.userDetails.name);
  //   setuserImage(state.userDetails.image);
  // }, [state]);

  const HEADER_HEIGHT = HEADER_BAR_HEIGHT * 3.1 + getStatusBarHeight();

  const scrollRef = useRef(null);

  const navigation = useNavigation();

  const colorScheme = 'dark';
  const scrollYAnimatedValue = new Animated.Value(0);

  const headerHeight = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    // outputRange: [0, -HEADER_HEIGHT + HEADER_BAR_HEIGHT + getStatusBarHeight() + spacing(1)],
    outputRange: [
      0,
      -HEADER_HEIGHT + 1.5 * HEADER_BAR_HEIGHT + getStatusBarHeight(),
    ],
    extrapolate: Extrapolate.CLAMP,
  });
  const searchBarOpacity = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT / 6],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const searchBarWidth = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2],
    outputRange: [LAYOUT.window.width - spacing(5), HEADER_BAR_HEIGHT],
    // outputRange: [LAYOUT.window.width - spacing(5), LAYOUT.window.width - spacing(5)],
    extrapolate: Extrapolate.CLAMP,
  });
  const searchBarHeight = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    // outputRange: [50, HEADER_BAR_HEIGHT],
    outputRange: [HEADER_BAR_HEIGHT, HEADER_BAR_HEIGHT],
    extrapolate: Extrapolate.CLAMP,
  });
  const searchBarLocation = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [10, spacing(2.5)],
    extrapolate: Extrapolate.CLAMP,
  });
  const searchBarColor = Animated.interpolateColors(scrollYAnimatedValue, {
    inputRange: [0, HEADER_HEIGHT / 2],
    outputColorRange: [
      COLORS[colorScheme].common.white,
      COLORS[colorScheme].secondary.main,
    ],
  });
  const searchBarTop = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT - getStatusBarHeight()],
    // outputRange: [100, spacing(1) + getStatusBarHeight()],
    // outputRange: [spacing(1) * 2 + getStatusBarHeight() * 2, spacing(1) + getStatusBarHeight()],
    // outputRange: [HEADER_HEIGHT - 1.5 * HEADER_BAR_HEIGHT + ((getStatusBarHeight() - 24) * 3), spacing(1) + getStatusBarHeight() - ((getStatusBarHeight() - 24) * 3)],
    // outputRange: [HEADER_HEIGHT - (1.5 * HEADER_BAR_HEIGHT) - getStatusBarHeight(), spacing(1)],
    outputRange: [
      HEADER_HEIGHT - 1.5 * HEADER_BAR_HEIGHT,
      getStatusBarHeight() + spacing(1),
    ],

    extrapolate: Extrapolate.CLAMP,
  });
  const titleHeaderMarginLeft = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT / 2],
    outputRange: [0, HEADER_BAR_HEIGHT + spacing(2)],
    // outputRange: [0, (LAYOUT.window.width * 0.5) ],

    extrapolate: Extrapolate.CLAMP,
  });

  const borderRadiusIcon = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_BAR_HEIGHT],
    outputRange: [10, HEADER_BAR_HEIGHT],
    extrapolate: Extrapolate.CLAMP,
  });

  useLayoutEffect(() => {
    // alert(())
    const renderUserIcon = () => {
      // return <Ionicons name="ios-contact" size={30} onPress={(): void => propsUserIcon.navigation.navigate('SelectSignIn')} />;
      return (
        <View
          style={[
            { position: 'absolute', right: spacing(2.5), top: spacing(1) },
            // Platform.OS === 'ios' ? { marginTop: HEADER_BAR_HEIGHT / 1.5 } : { marginTop: HEADER_BAR_HEIGHT / 1.5 }
          ]}
        >
          {state.userDetails.image === '' ? (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('socialLogin')}
            >
              <SvgHeaderUserIcon height={40} width={40} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Setting')}
            >
              <Image
                style={{
                  borderRadius: 90,
                  width: 40,
                  height: 40,
                }}
                source={{
                  uri: state.userDetails.image,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      );
    };

    const renderTitle = () => {
      return (
        <>
          {/* {!fontLoaded ? (
            <AppLoading
              startAsync={fetchFont}
              onFinish={() => {
                setFontLoaded(true);
              }}
              onError={() => console.log('ERROR')}
            />
          ) : ( */}
          <View
            style={[
              { position: 'absolute', left: spacing(2.5), top: spacing(1) },
              // Platform.OS === 'ios' ? { marginTop: HEADER_BAR_HEIGHT / 1.5 } : { marginTop: HEADER_BAR_HEIGHT / 1.5 }
            ]}
          >
            <Animated.View
              style={{
                marginLeft: titleHeaderMarginLeft,
                height: HEADER_BAR_HEIGHT,
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: COLORS[colorScheme].text.primary,
                  fontFamily: 'ProximaNovaBold',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {state.userDetails.name === '' ? 'Bonjour' : state.userDetails.name}
              </Text>
            </Animated.View>
          </View>
          {/* )} */}
        </>
      );
    };

    navigation.setOptions({
      headerLeft: renderTitle,
      headerRight: renderUserIcon,
      headerShown: true,
      headerTitle: null,
      headerTransparent: true,
      headerTitleAlign: 'left',
      headerRightContainerStyle: { position: 'absolute' },
      headerLeftContainerStyle: { position: 'absolute' },
    });
  });

  // useEffect(() => {

  //   setInterval(() => {
  //     setLoading(false)
  //   }, 100)

  // }, [isFocused])

  return (
    <>
      {/* <View style={[{ position: "absolute", left: spacing(2.5), top: spacing(1), zIndex: 999999999, marginTop: getStatusBarHeight() },
        // Platform.OS === 'ios' ? { marginTop: HEADER_BAR_HEIGHT / 1.5 } : { marginTop: HEADER_BAR_HEIGHT / 1.5 }
      ]}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Setting')}>
          <SvgHeaderUserIcon height={HEADER_BAR_HEIGHT} />
        </TouchableOpacity>

      </View> */}
      {/* <StatusBar backgroundColor={Colors.yellow}    /> */}
      {loading ? (
        <View>
          <Animated.ScrollView
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            bounces={false}
            ref={scrollRef}
            contentContainerStyle={{
              paddingTop: props.searchIconPress ? 0 : HEADER_HEIGHT,
              minHeight: props.searchIconPress
                ? 0
                : LAYOUT.window.height + HEADER_HEIGHT,
            }}
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } },
            ])}
          >
            {props.children}
          </Animated.ScrollView>
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <Animated.View
              style={[
                {
                  position: 'relative',
                  top: headerHeight,
                  height: HEADER_HEIGHT,
                },
              ]}
            >
              <Svg viewBox="0 0 375 190" preserveAspectRatio="none">
                <Defs>
                  <ClipPath id="prefix__a">
                    <Path
                      d="M0 0h375v170a20 20 0 01-20 20H20a20 20 0 01-20-20V0z"
                      transform="translate(0 .981)"
                      fill="#fcdf6f"
                    />
                  </ClipPath>
                </Defs>
                <Path
                  data-name="Mask"
                  d="M0 0h375v170a20 20 0 01-20 20H20a20 20 0 01-20-20V0z"
                  fill="#fcdf6f"
                />
                <G
                  data-name="BG"
                  clipPath="url(#prefix__a)"
                  transform="translate(0 -.981)"
                >
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
                marginTop: 0,
                // height: HEADER_BAR_HEIGHT,
                height: searchBarHeight,
                width: searchBarWidth,
                left: spacing(2.5),
                // left: 10,
                // left: searchBarLocation,
                borderRadius: borderRadiusIcon,
                backgroundColor: searchBarColor,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.2,
                shadowRadius: 0.1,
                elevation: 5,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    props.setsearchIconPress(!props.searchIconPress)
                  }
                  style={{ paddingLeft: HEADER_BAR_HEIGHT / 4 }}
                >
                  <SvgHeaderSearchIcon />
                </TouchableOpacity>
                <TextInput
                  value={props.searchVal}
                  onFocus={() => {
                    setIsFocused(true);
                  }}
                  onBlur={() => {
                    setLoading(!loading);
                    setIsFocused(false);
                  }}
                  onChangeText={e => {
                    props.setSearchVal(e);
                  }}
                  placeholder={i18n.t('find_your_restaurant')}
                  placeholderTextColor={'#485460'}
                  style={{ flex: 1, paddingHorizontal: 25 }}
                />

                {isFocused && (
                  <TouchableOpacity
                    onPress={() => {
                      props.setSearchVal('');
                    }}
                    style={{ paddingHorizontal: 8 }}
                  >
                    <View
                      style={{
                        backgroundColor: '#FCDF6F',
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 4,
                      }}
                    >
                      {/* <Entypo
                  name="cross"
                  color={'#1E272E'}
                  size={25}
              /> */}
                      <AntDesign name="close" size={14} color="#485460" />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </Animated.View>
          </Animated.View>
        </View>
      ) : (
        <>
          <Animated.ScrollView
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            bounces={false}
            ref={scrollRef}
            contentContainerStyle={{
              paddingTop: props.searchIconPress ? 0 : HEADER_HEIGHT,
              minHeight: props.searchIconPress
                ? 0
                : LAYOUT.window.height + HEADER_HEIGHT,
            }}
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: scrollYAnimatedValue } } },
            ])}
          >
            {props.children}
          </Animated.ScrollView>
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <Animated.View
              style={[
                {
                  position: 'relative',
                  top: headerHeight,
                  height: HEADER_HEIGHT,
                },
              ]}
            >
              <Svg viewBox="0 0 375 190" preserveAspectRatio="none">
                <Defs>
                  <ClipPath id="prefix__a">
                    <Path
                      d="M0 0h375v170a20 20 0 01-20 20H20a20 20 0 01-20-20V0z"
                      transform="translate(0 .981)"
                      fill="#fcdf6f"
                    />
                  </ClipPath>
                </Defs>
                <Path
                  data-name="Mask"
                  d="M0 0h375v170a20 20 0 01-20 20H20a20 20 0 01-20-20V0z"
                  fill="#fcdf6f"
                />
                <G
                  data-name="BG"
                  clipPath="url(#prefix__a)"
                  transform="translate(0 -.981)"
                >
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
                marginTop: 0,
                // height: HEADER_BAR_HEIGHT,
                height: searchBarHeight,
                width: searchBarWidth,
                left: spacing(2.5),
                // left: 10,
                // left: searchBarLocation,
                borderRadius: borderRadiusIcon,
                backgroundColor: searchBarColor,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.2,
                shadowRadius: 0.1,
                elevation: 5,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    props.setsearchIconPress(!props.searchIconPress)
                  }
                  style={{ paddingLeft: HEADER_BAR_HEIGHT / 4 }}
                >
                  <SvgHeaderSearchIcon />
                </TouchableOpacity>
                <TextInput
                  value={props.searchVal}
                  onFocus={() => {
                    setIsFocused(true);
                  }}
                  onBlur={() => {
                    setLoading(!loading);
                    setIsFocused(false);
                  }}
                  onChangeText={e => {
                    props.setSearchVal(e);
                  }}
                  placeholder={i18n.t('find_your_restaurant')}
                  style={{ flex: 1, paddingHorizontal: 25 }}
                />

                {isFocused && (
                  <TouchableOpacity
                    onPress={() => {
                      props.setSearchVal('');
                    }}
                    style={{ paddingHorizontal: 8 }}
                  >
                    <View
                      style={{
                        backgroundColor: '#FCDF6F',
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 4,
                      }}
                    >
                      {/* <Entypo
                      name="cross"
                      color={'#1E272E'}
                      size={25}
                  /> */}
                      <AntDesign name="close" size={14} color="#485460" />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </Animated.View>
          </Animated.View>
        </>
      )}
    </>
  );
};

export default HomeScreen;
