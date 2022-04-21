import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect, useRef, useContext } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import Animated, { Extrapolate } from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';
import { SvgHeaderSearchIcon } from '../../components/svg/header_search_icon';
import { SvgHeaderUserIcon } from '../../components/svg/header_user_icon';
import { COLORS } from '../../constants/colors';
import { HEADER_BAR_HEIGHT, LAYOUT, spacing } from '../../constants/layout';
import { AntDesign } from '@expo/vector-icons';
import Context from '../../contextApi/context';
import { userGivenName } from '../../util';

const HomeScreen = props => {
  const scrollRef = useRef(null);
  const TextInputRef = React.useRef(null);
  const { state, localizationContext } = useContext(Context);

  const HEADER_HEIGHT = HEADER_BAR_HEIGHT * 3.1 + getStatusBarHeight() + 0;

  const navigation = useNavigation();

  const colorScheme = 'dark';
  const scrollYAnimatedValue = new Animated.Value(0);

  const headerHeight = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    // outputRange: [0, -HEADER_HEIGHT + HEADER_BAR_HEIGHT + getStatusBarHeight() + spacing(1)],
    outputRange: [
      0,
      -HEADER_HEIGHT + 1.5 * HEADER_BAR_HEIGHT + getStatusBarHeight() + 0,
    ],
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

  const searchBarColor = Animated.interpolateColors(scrollYAnimatedValue, {
    inputRange: [0, HEADER_HEIGHT / 2],
    outputColorRange: [
      COLORS[colorScheme].common.white,
      COLORS[colorScheme].secondary.main,
    ],
  });
  const searchBarTop = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT - getStatusBarHeight()],
    outputRange: [
      HEADER_HEIGHT - 1.5 * HEADER_BAR_HEIGHT,
      getStatusBarHeight() + spacing(1.1),
    ],

    extrapolate: Extrapolate.CLAMP,
  });

  const borderRadiusIcon = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_BAR_HEIGHT],
    outputRange: [10, HEADER_BAR_HEIGHT],
    extrapolate: Extrapolate.CLAMP,
  });

  useLayoutEffect(() => {
    const renderUserIcon = () => {
      return (
        <View
          style={[
            {
              position: 'absolute',
              right: spacing(2.5),
              top: spacing(1),
              marginTop: 0,
            },
          ]}
        >
          {state.userDetails.user_id ? (
            <>
              {state.userDetails.image ? (
                // props.yourRestaurantLoading ? (
                //   <ActivityIndicator color="black" size={38} />
                // ) : (
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('PublicProfile')}
                >
                  <Image
                    style={{
                      borderRadius: 90,
                      width: 40,
                      height: 40,
                    }}
                    source={{ uri: state?.userDetails?.image }}
                  />
                </TouchableOpacity>
              ) : (
                // ) : props.yourRestaurantLoading ? (
                //   <ActivityIndicator color="black" size={38} />
                // ) : (
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('PublicProfile')}
                >
                  <Image
                    style={{
                      borderRadius: 90,
                      width: 40,
                      height: 40,
                    }}
                    source={{
                      uri:
                        'https://www.kindpng.com/picc/m/136-1369892_avatar-people-person-business-user-man-character-avatar.png',
                    }}
                  />
                </TouchableOpacity>
              )}
            </>
          ) : (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('socialLogin')}
            >
              <SvgHeaderUserIcon height={40} width={40} />
            </TouchableOpacity>
          )}
        </View>
      );
    };

    const renderTitle = () => {
      return (
        <>
          <View
            style={[
              {
                position: 'absolute',
                left: spacing(2.5),
                top: spacing(1),
                marginTop: 0,
              },
            ]}
          >
            <Animated.View
              style={{
                position: 'absolute',
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
                  // width:'50%'
                }}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {!state.userDetails.name
                  ? localizationContext.t('hello')
                  : localizationContext.t('hello') +
                    ' ' +
                    userGivenName(state.userDetails.name)}
              </Text>
            </Animated.View>
          </View>
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
  return (
    <>
      <Animated.ScrollView
        style={{ backgroundColor: '#F9F9F9' }}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={true}
        bounces={true}
        keyboardShouldPersistTaps={'handled'}
        refreshControl={
          <RefreshControl
            //refresh control used for the Pull to Refresh
            refreshing={props.resIsFetching}
            // onRefresh={() => {}}
            onRefresh={props.refetchRestaurant}
          />
        }
        // bounces={true}
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
            height: searchBarHeight,
            width: searchBarWidth,
            left: spacing(2.5),
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
              paddingLeft: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (scrollRef.current && scrollRef.current.getNode) {
                  const node = scrollRef.current.getNode();
                  if (node) {
                    // if (scrollPosition > 0) {
                    node.scrollTo({ y: -50, animated: true });
                    setTimeout(() => {
                      TextInputRef.current.focus();
                    }, 200);
                  }
                }
              }}
            >
              <SvgHeaderSearchIcon />
            </TouchableOpacity>

            <TextInput
              ref={TextInputRef}
              returnKeyLabel="Search"
              returnKeyType="done"
              value={props.searchVal}
              onSubmitEditing={() => props.setsearchEnter(props.searchVal)}
              onChangeText={e => {
                props.setSearchVal(e);
              }}
              placeholder={localizationContext.t('find_your_restaurant')}
              style={{ flex: 1, paddingHorizontal: 10 }}
            />

            {props.searchVal ? (
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
                  <AntDesign name="close" size={14} color="#485460" />
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </Animated.View>
      </Animated.View>
    </>
  );
};

export default HomeScreen;
