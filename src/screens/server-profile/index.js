import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CommonButton from '../../components/common-button';
import GlobalHeader from '../../components/GlobalHeader';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import i18n from '../../li8n';

const ServerProfile = ({ navigation }) => {
  const [state, setState] = useState(true);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{
            width: '100%',
            height: 100,
            borderBottomLeftRadius: Dimensions.get('window').width * 0.06,
            borderBottomRightRadius: Dimensions.get('window').width * 0.06,
            overflow: 'hidden',
          }}
          source={require('../../assets/images/Group3.png')}
        >
          <GlobalHeader
            arrow={true}
            headingText={i18n.t('profile_server')}
            fontSize={17}
            color={'black'}
            navigation={navigation}
            setting={false}
            backgroundColor={'transparent'}
            borderRadius={true}
          />
        </ImageBackground>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', marginTop: 8 }}>
            <View>
              <Image
                source={require('../../assets/images/emptyRestaurantList.png')}
                style={{ resizeMode: 'contain', height: 280, width: 280 }}
              />
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <View>
                <Text style={styles.textBold}>
                {i18n.t('no_restaurant')}
                </Text>
                <Text style={styles.textLight}>
                {i18n.t('search_rest')}:{' '}
                  <Text style={{ fontWeight: '700' }}>{i18n.t('you_waiter')}</Text>
                </Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <CommonButton
                  title={i18n.t('ind_rest')}
                  navigation={'Home'}
                />
              </View>
            </View>
            <View
              style={{
                marginHorizontal: 20,
                marginVertical: 30,
                alignSelf: 'flex-start',
              }}
            >
              {state ? (
                <View>
                  <View>
                    <Text style={styles.textBold}>
                    {i18n.t('are_you_job')}
                    </Text>
                    <Text style={{ ...styles.textLight, marginHorizontal: 25 }}>
                    {i18n.t('comp_job')}
                    </Text>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <CommonButton
                      title={i18n.t('look_job')}
                      navigation="FindJob"
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <View>
                    <Text style={styles.boldTxt2}>{i18n.t('your_cand_prof')}</Text>
                    <Text style={styles.lighTxt2}>
                    {i18n.t('prev_rec')}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.main_card_container}
                    >
                      <View style={styles.section1}>
                        <View>
                          <Image
                            source={require('../../assets/images/Bitmap.png')}
                            style={{
                              borderRadius: 30,
                              width: 57,
                              height: 57,
                            }}
                          />
                        </View>
                        <View
                          style={{ justifyContent: 'center', paddingLeft: 10 }}
                        >
                          <Text
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            style={styles.name_staff}
                          >
                            Ammy Farha
                          </Text>
                          <View style={{ flexDirection: 'row', marginTop: 7 }}>
                            <Text style={{ fontFamily: 'ProximaNovaBold' }}>
                            {i18n.t('waitress')}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.section2}>
                        <AntDesign name="right" size={20} color="#485460" />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop:10}}>
                  <CommonButton
                  title={i18n.t('modif_prof')}
                />
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ServerProfile;
