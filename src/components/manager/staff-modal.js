import React from 'react';
import { Image, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import RatingStar from '../../components/RatingComponent';
import { AntDesign } from '@expo/vector-icons';
import i18n from '../../li8n';
import { useQuery } from 'react-query';
import { RECRUITMENT_FORM } from '../../queries';
import { reactQueryConfig } from '../../constants';
import { last_exp } from '../../util';
import Dash from 'react-native-dash';

const StaffModal = ({ isModalVisible, setModalVisible, formId }) => {
  const obj = [1, 2, 3, 4, 5];
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

  return (
    <View style={{ flex: 1 }}>
      <Modal
        onBackdropPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={[styles.modal_container]}
        >
          <View style={{ alignItems: 'center', width: '100%' }}>
            <View style={styles.first_part_modal}>
              <View style={{ marginVertical: 20, alignItems: 'center' }}>
                <View>
                  <Image
                    source={{ uri: waiterFormData?.data[0]?.user_id?.picture }}
                    style={{ width: 90, height: 90, borderRadius: 50 }}
                  />
                </View>
                <View style={{ marginTop: 8 }}>
                  <View style={{ flexDirection: 'row' }}>
                    {obj.map((v, i) => {
                      return (
                        <TouchableOpacity style={{ marginRight: 3 }} key={i}>
                          <RatingStar
                            starSize={17}
                            type={
                              v <= waiterFormData?.data[0]?.rating
                                ? 'filled'
                                : v === waiterFormData?.data[0]?.rating + 0.5
                                ? 'half'
                                : 'empty'
                            }
                            notRatedStarColor="#f1f1f1"
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                <View style={{ marginTop: 14 }}>
                  <Text style={styles.text_dispon}>
                    {i18n.t('availability')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => alert('hello')}
                    style={styles.btn_green}
                  >
                    <Text style={styles.btnGreen_txt}>
                      {/* {waiterFormData?.data[0]?.time || 'loading..'} */}
                      available
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Dash style={{ width: '90%', height: 1 }} dashColor="#FCDF6F" />
            </View>
            <View style={styles.first_part_modal}>
              <View style={{ marginVertical: 20 }}>
                <View>
                  <View>
                    <Text style={styles.expsTxt}>{i18n.t('exp')} </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={styles.exp_year}>
                      {(!waiterFormLoading &&
                        waiterFormData?.data[0]?.experience) ||
                        ''}
                    </Text>
                    <Text style={styles.ansTxt}>
                      {' '}
                      {waiterFormLoading
                        ? 'loading..'
                        : waiterFormData?.data[0]?.experience
                        ? Number(waiterFormData?.data[0]?.experience) > 1
                          ? `${i18n.t('years')}s`
                          : i18n.t('years')
                        : 'none'}
                    </Text>
                  </View>
                </View>
              </View>
              <Dash style={{ width: '90%', height: 1 }} dashColor="#FCDF6F" />
            </View>
            <View style={styles.first_part_modal}>
              <View style={{ marginVertical: 20, alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.expsTxt}>{i18n.t('estb')}</Text>
                  </View>
                  <View>
                    <Text style={styles.petitTxt}>
                      {waiterFormLoading
                        ? 'loading..'
                        : last_exp(waiterFormData) || 'none'}
                    </Text>
                  </View>
                </View>
              </View>
              <Dash style={{ width: '90%', height: 1 }} dashColor="#FCDF6F" />
            </View>
            <View style={styles.first_part_modal}>
              <View style={{ marginVertical: 20 }}>
                <View>
                  <View>
                    <Text style={styles.expsTxt}>Qualifications</Text>
                  </View>
                  <View>
                    <Text style={styles.qualifDetail}>
                      {waiterFormLoading
                        ? 'loading..'
                        : waiterFormData?.data[0]?.education || 'none'}
                    </Text>
                  </View>
                </View>
              </View>
              <Dash style={{ width: '90%', height: 1 }} dashColor="#FCDF6F" />
            </View>
            <View style={{ marginVertical: 20 }}>
              <View style={{ alignItems: 'center' }}>
                <View>
                  <Text style={styles.expsTxt}>{i18n.t('recruit')}</Text>
                </View>
                <View style={styles.recruterBtns}>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/images/Call.png')}
                      style={{
                        width: 30,
                        height: 30,
                        resizeMode: 'contain',
                        marginRight: 20,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/images/Email.png')}
                      style={{ width: 30, height: 30, resizeMode: 'contain' }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setModalVisible(false)}
          >
            <Image
              source={require('../../assets/images/cross.png')}
              style={{ resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default StaffModal;
