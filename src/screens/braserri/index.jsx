import React, { useState, useContext } from 'react';
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

const Braserri = ({ navigation, route }) => {
  const { restaurant_id, img, name, place_id, refetchWaiters } = route?.params || {};
  const [currentTab, setCurrentTab] = useState('team');
  const [dishName, setDishName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const { localizationContext } = useContext(Context);

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
        source={{ uri: img || 'https://www.tandoor.pk/img/sl3.jpg' }}
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
              <Text style={styles.tabTxt}>{localizationContext.t('the_team')}</Text>
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
              <Text style={styles.tabTxt}>{localizationContext.t('the_menu')}</Text>
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
              />
            ) : currentTab === 'team' ? (
              <Team
                restaurant_id={restaurant_id || ''}
                place_id={place_id}
                navigation={navigation}
                refetchWaiters={refetchWaiters}
              />
            ) :  (
              <Media />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Braserri;
