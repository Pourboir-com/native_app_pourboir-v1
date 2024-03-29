import React, {useContext} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import { useQuery } from 'react-query';
import { RECRUITMENT_FORM } from '../../queries';
import { reactQueryConfig } from '../../constants';
import Dash from 'react-native-dash';
import { formatDate } from '../../util/format-date';
import { upperTitleCase } from '../../util';
import Context from '../../contextApi/context';

const StaffModal = ({ isModalVisible, setModalVisible, formId, profile }) => {
  const { localizationContext } = useContext(Context);

  const { data: waiterFormData, isLoading: waiterFormLoading } = useQuery(
    ['RECRUITMENT_FORM', { form_id: formId, rating_needed: true }],
    RECRUITMENT_FORM,
    {
      ...reactQueryConfig,
      onError: e => {
        alert(e?.response?.data?.message);
      },
    },
  );

  const openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${waiterFormData?.data[0]?.telephone_number}`;
    } else {
      number = `tel:${waiterFormData?.data[0]?.telephone_number}`;
    }
    Linking.openURL(number);
  };

  return (
    <Modal
      onBackdropPress={() => setModalVisible(false)}
      isVisible={isModalVisible}
      backdropColor={!profile ? '#f9f9f9' : '#000'}
      backdropOpacity={0.7}
    >
      <View style={styles.modal_container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={[{ alignItems: 'center', width: '100%' }]}
        >
          <View style={styles.first_part_modal}>
            <View style={{ marginVertical: 20, alignItems: 'center' }}>
              <View>
                <Image
                  source={{ uri: waiterFormData?.data[0]?.user_id?.picture }}
                  style={{ width: 90, height: 90, borderRadius: 50 }}
                />
              </View>
              <View style={{ marginTop: 14, alignItems: 'center' }}>
                <Text style={styles.full_name}>
                  {waiterFormLoading
                    ? 'loading..'
                    : waiterFormData?.data[0]?.user_id?.full_name
                    ? upperTitleCase(
                        waiterFormData?.data[0]?.user_id?.full_name,
                      )
                    : 'none'}
                </Text>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.text_dispon}
                >
                  {waiterFormLoading
                    ? 'loading..'
                    : waiterFormData?.data[0]?.position || 'none'}
                </Text>
                <TouchableOpacity style={styles.btn_green} activeOpacity={0.9}>
                  <Text style={styles.btnGreen_txt}>
                    {waiterFormLoading
                      ? 'loading..'
                      : waiterFormData?.data[0]?.time === 'half'
                      ? localizationContext.t('part_time')
                      : localizationContext.t('full')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Dash style={{ width: 170 }} dashColor="#FCDF6F" />
          </View>
          <View style={styles.first_part_modal}>
            <View style={{ marginVertical: 15, marginBottom: 19 }}>
              <View>
                <View>
                  <Text style={styles.expsTxt}>{localizationContext.t('exp')} </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: -7,
                  }}
                >
                  <Text style={styles.exp_year}>
                    {(!waiterFormLoading &&
                      waiterFormData?.data[0]?.experience_count) ||
                      '0'}
                  </Text>
                  <Text style={styles.ansTxt}>
                    {' '}
                    {waiterFormLoading
                      ? 'loading..'
                      : Number(waiterFormData?.data[0]?.experience_count) > 1
                      ? `${localizationContext.t('years')}s`
                      : localizationContext.t('years')}
                  </Text>
                </View>
              </View>
            </View>
            <Dash style={{ width: 170 }} dashColor="#FCDF6F" />
          </View>
          <View style={styles.first_part_modal}>
            <View
              style={{
                marginVertical: 15,
                marginBottom: Platform.OS === 'ios' ? 10 : 35,
                alignItems: 'center',
              }}
            >
              <View style={{ alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                  <Text
                    style={[
                      styles.expsTxt,
                      { marginBottom: Platform.OS === 'ios' ? 0 : -15 },
                    ]}
                  >
                    {localizationContext.t('estb')}
                  </Text>
                </View>
                <Text style={styles.petitTxt}>
                  {/* {waiterFormLoading
                        ? 'loading..'
                        : last_exp(waiterFormData) || 'none'} */}
                  {waiterFormLoading ? (
                    'loading..'
                  ) : waiterFormData?.data[0]?.experience[0]
                      ?.enterprise_name ? (
                    <View style={{ justifyContent: 'center' }}>
                      {waiterFormData?.data[0]?.experience.map(item => (
                        <View style={{ paddingTop: 10 }}>
                          <Text
                            style={{
                              fontFamily: 'ProximaNova',
                              fontSize: 16,
                            }}
                          >
                            {item?.enterprise_name.slice(0, 25) || 'none'}
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'ProximaNova',
                              fontSize: 16,
                            }}
                          >{`${localizationContext.t('of')} ${formatDate(
                            item?.start_date,
                          )} ${localizationContext.t('at')} ${
                            item?.end_date
                              ? formatDate(item?.end_date)
                              : localizationContext.t('still_working')
                          }`}</Text>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <Text style={{ fontSize: 16, color: 'black' }}>none</Text>
                  )}
                </Text>
              </View>
            </View>
            <Dash style={{ width: 170 }} dashColor="#FCDF6F" />
          </View>
          <View style={styles.first_part_modal}>
            <View style={{ marginVertical: 15, marginBottom: 55 }}>
              <View>
                <View>
                  <Text style={styles.expsTxt}>Qualifications</Text>
                </View>
                <View>
                  <Text style={styles.qualifDetail}>
                    {waiterFormLoading
                      ? 'loading..'
                      : waiterFormData?.data[0]?.diploma || 'none'}
                  </Text>
                </View>
              </View>
            </View>
            <Dash style={{ width: 170 }} dashColor="#FCDF6F" />
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ alignItems: 'center' }}>
              <View>
                <Text style={styles.expsTxt}>{localizationContext.t('contact')}</Text>
              </View>
              <View style={[styles.recruterBtns, { marginBottom: 40 }]}>
                <TouchableOpacity
                  onPress={() =>
                    waiterFormData?.data[0]?.telephone_number &&
                    openDialScreen()
                  }
                >
                  <Image
                    source={require('../../assets/images/Call.png')}
                    style={{
                      width: 32,
                      height: 32,
                      resizeMode: 'contain',
                      marginRight: 20,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(
                      `mailto:${waiterFormData?.data[0]?.user_id?.email}`,
                    );
                  }}
                >
                  <Image
                    source={require('../../assets/images/Email.png')}
                    style={{ width: 32, height: 32, resizeMode: 'contain' }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => setModalVisible(false)}
        >
          <Image
            source={require('../../assets/images/cross-icon.png')}
            style={{ resizeMode: 'contain', width: 22, height: 22 }}
          />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default StaffModal;
