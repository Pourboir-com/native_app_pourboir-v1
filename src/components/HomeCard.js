import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Colors } from '../constants/Theme';
import RatingStar from './RatingComponent';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const HomeCard = ({
  navigation,
  img,
  rating,
  name,
  distance,
  services,
  crossIcon,
  deleteCall,
  place_id,
  refetchRestaurant,
}) => {
  const [fontLoaded, setFontLoaded] = useState(false);
  // const {crossIcon} = routes.params;
  // Star arrayyyyyyyy
  const [starSelect, setstarSelect] = useState(rating);
  const obj = [1, 2, 3, 4, 5];
  const onPressStar = v => {
    setstarSelect(v);
  };
  const fetchFont = () => {
    return Font.loadAsync({
      ProximaNova: require('../assets/fonts/ProximaNova/ProximaNova-Regular.otf'),
      ProximaNovaBold: require('../assets/fonts/ProximaNova/ProximaNova-Bold.otf'),
    });
  };

  if (!fontLoaded) {
    return (
      <>
        <AppLoading
          startAsync={fetchFont}
          onFinish={() => {
            setFontLoaded(true);
          }}
          onError={() => console.log('ERROR')}
        />
      </>
    );
  } else {
    return (
      <>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('OpenCardReviews', {
              img: img,
              rating: starSelect,
              name: name,
              distance: distance,
              services: services,
              place_id: place_id,
              refetchRestaurant,
            })
          }
          style={[styles.viewItemConatier]}
        >
          <ImageBackground style={styles.imgCard} source={{ uri: img }}>
            <LinearGradient
              style={{
                zIndex: 100,
                position: 'absolute',
                width: '100%',
                height: '20%',
              }}
              colors={['rgba(0,0,0,0.5)', 'transparent']}
            ></LinearGradient>
            {crossIcon && (
              <TouchableOpacity
                style={[
                  styles.btnCross,
                  { zIndex: 1000, marginRight: -5, marginTop: -5 },
                ]}
                // onPress={deleteCall}
              >
                <View
                  style={{
                    height: 35,
                    width: 35,
                    borderWidth: 5,
                    borderColor: '#f9f9f9',
                    justifyContent: 'center',
                    borderRadius: 35,
                    backgroundColor: Colors.yellow,
                  }}
                >
                  {/* <Entypo
                                    name="cross"
                                    size={8}
                                    color="#485460"
                                    style={{ backgroundColor: Colors.yellow, borderRadius: 20 }}
                                /> */}
                  <Entypo
                    name="cross"
                    size={16}
                    color="#485460"
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#485460',
                      // textAlignVertical: 'center'
                    }}
                  />
                </View>
              </TouchableOpacity>
            )}

            <View style={{ zIndex: 101, padding: 12 }}>
              <View pointerEvents="none" style={{ flexDirection: 'row', zIndex: 9999 }}>
                {obj.map((v, i) => {
                  return (
                    <TouchableOpacity
                      style={{ marginRight: 3 }}
                      key={i}
                      onPress={() => {
                        onPressStar(v);
                      }}
                    >
                      <RatingStar
                        starSize={16}
                        type={
                          v <= starSelect
                            ? 'filled'
                            : v === starSelect + 0.5
                              ? 'half'
                              : 'empty'
                        }
                        notRatedStarColor="rgba(255,255,255, 0.6)"
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text style={{ color: 'red' }}></Text>
            </View>
            <View style={{ zIndex: 101, padding: 12 }}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={3}
                style={[styles.txtName, { fontFamily: 'ProximaNovaBold' }]}
              >
                {name}
              </Text>
              <View style={styles.view2Card}>
                <Text style={[styles.txt2Card, { fontFamily: 'ProximaNova' }]}>
                  {distance}m
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      color: Colors.yellow,
                      fontFamily: 'ProximaNovaBold',
                      fontSize: 12,
                    }}
                  >
                    {services}
                  </Text>
                  <Text
                    style={[styles.txt2Card, { fontFamily: 'ProximaNova' }]}
                  >
                    {' '}
                    serveurs
                  </Text>
                </View>
              </View>
            </View>
            <LinearGradient
              // Button Linear Gradient
              style={{
                zIndex: 100,
                position: 'absolute',
                width: '100%',
                height: '50%',
                bottom: 0,
              }}
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              // style={{ flex: 1 }}
            ></LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </>
    );
  }
};
export default HomeCard;

const styles = StyleSheet.create({
  view2Card: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  txtName: {
    color: '#fff',
    fontSize: 18,
    // fontFamily:'ProximaNovaBold'
  },
  btnCross: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt2Card: {
    color: '#EDEFEE',
    fontSize: 12,
    // fontFamily:'ProximaNova'
  },
  imgCard: {
    flex: 1,
    justifyContent: 'space-between',
  },
  viewItemConatier: {
    width: Dimensions.get('window').width * 0.45,
    height: Dimensions.get('window').width * 0.56,
    margin: Dimensions.get('window').width * 0.02,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 0,
    marginBottom: Dimensions.get('window').width * 0.04,
  },
  txtHeading: {
    fontSize: 22,
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
});
