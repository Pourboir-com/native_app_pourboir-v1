import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Menu from '../../components/braserri/menu';
import Team from '../../components/braserri/team';
import Media from '../../components/braserri/media';
import GlobalHeader from '../../components/GlobalHeader';
import styles from './styles';
import Context from '../../contextApi/context';
import i18n from '../../li8n';
import { reactQueryConfig } from '../../constants';
import { useQuery } from 'react-query';
import { GET_MENU, GET_WAITERS } from '../../queries';
const Braserri = ({ navigation, route }) => {
  const isFirstRun = useRef(true);
  const {
    restaurant_id,
    img,
    name,
    place_id,
    refetchWaiters,
    refetchInstaData,
    InstaData,
    refetchInstaFeed,
    refetchAll,
  } = route?.params || {};
  const [currentTab, setCurrentTab] = useState('team');
  const [dishName, setDishName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [changesSaved, setChangesSaved] = useState(false);
  const { state, localizationContext } = useContext(Context);
  const [headerBg, setHeaderBg] = useState(
    InstaData?.data?.background_image || '',
  );
  const [bgImage, setBgImage] = useState(
    InstaData?.data?.background_image || '',
  );
  const [discImg1, setDiscImg1] = useState(
    InstaData?.data?.discover_images[0] || '',
  );
  const [discImg2, setDiscImg2] = useState(
    InstaData?.data?.discover_images[1] || '',
  );
  const [discImg3, setDiscImg3] = useState(
    InstaData?.data?.discover_images[2] || '',
  );
  const [discImg4, setDiscImg4] = useState(
    InstaData?.data?.discover_images[3] || '',
  );
  const [discImg5, setDiscImg5] = useState(
    InstaData?.data?.discover_images[4] || '',
  );
  const [token, setToken] = useState(
    InstaData?.data?.instagram_access_token || '',
  );
  let states = {
    bgImage,
    setBgImage,
    discImg1,
    setDiscImg1,
    discImg2,
    setDiscImg2,
    discImg3,
    setDiscImg3,
    discImg4,
    setDiscImg4,
    discImg5,
    setDiscImg5,
    token,
    setToken,
    setHeaderBg,
    setChangesSaved,
    changesSaved
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    } else {
      setChangesSaved(true);
    }
  }, [bgImage, discImg1, discImg2, discImg3, discImg4, discImg5, token]);

  const { data: menus, refetch: refetchMenus } = useQuery(
    ['GET_MENU', { place_id: restaurant_id }],
    GET_MENU,
    {
      ...reactQueryConfig,
      onError: e => {
        alert(e?.response?.data?.message);
      },
    },
  );

  const { data: waiterData, refetch: refetchWaiterData } = useQuery(
    [
      'GET_WAITERS',
      {
        type: 'waiter',
        restaurant_id: place_id,
      },
    ],
    GET_WAITERS,
    {
      ...reactQueryConfig,
    },
  );

  const { data: cookData, refetch: refetchCookData } = useQuery(
    [
      'GET_WAITERS',
      {
        type: 'cook',
        restaurant_id: place_id,
      },
    ],
    GET_WAITERS,
    {
      ...reactQueryConfig,
    },
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9', alignItems: 'center' }}>
      <ImageBackground
        style={{
          width: '100%',
          height: 100,
          borderBottomLeftRadius: Dimensions.get('window').width * 0.06,
          borderBottomRightRadius: Dimensions.get('window').width * 0.06,
          overflow: 'hidden',
        }}
        source={{ uri: headerBg || img || null }}
      >
        <LinearGradient
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          colors={['black', 'transparent', 'black']}
        ></LinearGradient>
        <GlobalHeader
          arrow={true}
          BackIconColor={'#fff'}
          headingText={name}
          fontSize={17}
          color={'white'}
          navigation={navigation}
          setting={false}
          backgroundColor={'transparent'}
          borderRadius={true}
          changesSaved={changesSaved}
          // settingBtn={true}
        />
      </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: '90%', paddingTop: 30 }}
      >
        <View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              flex: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => setCurrentTab('team')}
              style={
                (styles.tabBtn,
                currentTab != 'team'
                  ? { ...styles.tabBtn, backgroundColor: '#fff' }
                  : styles.tabBtn)
              }
              activeOpacity={0.6}
            >
              <Image
                source={require('../../assets/images/team.png')}
                style={{ width: 28, height: 28, resizeMode: 'contain' }}
              />
              <Text style={styles.tabTxt}>
                {localizationContext.t('the_team')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCurrentTab('menu')}
              style={
                (styles.tabBtn,
                currentTab != 'menu'
                  ? { ...styles.tabBtn, backgroundColor: '#fff' }
                  : styles.tabBtn)
              }
              activeOpacity={0.6}
            >
              <Image
                source={require('../../assets/images/menu.png')}
                style={{ width: 24, height: 24, resizeMode: 'contain' }}
              />
              <Text style={styles.tabTxt}>
                {localizationContext.t('the_menu')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCurrentTab('media')}
              style={
                (styles.tabBtn,
                currentTab != 'media'
                  ? { ...styles.tabBtn, backgroundColor: '#fff' }
                  : styles.tabBtn)
              }
              activeOpacity={0.6}
            >
              <Image
                source={require('../../assets/images/Bitmap.png')}
                style={{ width: 22, height: 24, resizeMode: 'contain' }}
              />
              <Text style={styles.tabTxt}>{i18n.t('the_media')}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 20 }}>
            {currentTab === 'menu' ? (
              <Menu
                currentTab={currentTab}
                dishName={dishName}
                setDishName={setDishName}
                description={description}
                setDescription={setDescription}
                price={price || ''}
                setPrice={setPrice}
                restaurant_id={restaurant_id || ''}
                place_id={place_id}
                menuData={menus?.data || []}
                refetchMenus={refetchMenus}
              />
            ) : currentTab === 'team' ? (
              <Team
                restaurant_id={restaurant_id || ''}
                place_id={place_id}
                navigation={navigation}
                refetchWaiters={refetchWaiters}
                waiterData={waiterData}
                refetchWaiterData={refetchWaiterData}
                cookData={cookData}
                refetchCookData={refetchCookData}
              />
            ) : (
              <Media
                refetchInstaData={refetchInstaData}
                InstaData={InstaData}
                user_id={state.userDetails.user_id}
                place_id={restaurant_id}
                refetchInstaFeed={refetchInstaFeed}
                refetchAll={refetchAll}
                states={states}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Braserri;
