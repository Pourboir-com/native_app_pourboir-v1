import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import RatingStar from '../../components/RatingComponent';
import { AntDesign } from '@expo/vector-icons';
import i18n from '../../li8n';

const StaffModal = ({ isModalVisible, toggleModal, setModalVisible }) => {
  const obj = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(3);
  return (
    <View style={{ flex: 1 }}>
      <Modal onBackdropPress={() => setModalVisible(false)} isVisible={isModalVisible}>
        <View style={styles.modal_container}>
          <View style={{ alignItems: 'center', width: '100%' }}>
            <View style={styles.first_part_modal}>
              <View style={{ marginVertical: 20, alignItems: 'center' }}>
                <View>
                  <Image
                    source={require('../../assets/images/Bitmap.png')}
                    style={{ resizeMode: 'contain', width: 110, height: 110 }}
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
                              v <= rating
                                ? 'filled'
                                : v === rating + 0.5
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
                      {i18n.t('immediate')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
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
                      paddingTop: 15,
                      paddingHorizontal: 10,
                    }}
                  >
                    <Text style={styles.exp_year}>5 </Text>
                    <Text style={styles.ansTxt}> {i18n.t('years')}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.first_part_modal}>
              <View style={{ marginVertical: 20, alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.expsTxt}>{i18n.t('estb')}</Text>
                  </View>
                  <View>
                    <Text style={styles.petitTxt}>Le Petit Nice</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.first_part_modal}>
              <View style={{ marginVertical: 20 }}>
                <View>
                  <View>
                    <Text style={styles.expsTxt}>Qualifications</Text>
                  </View>
                  <View>
                    <Text style={styles.qualifDetail}>
                      {i18n.t('mark_cater')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ marginVertical: 20 }}>
              <View style={{ alignItems: 'center' }}>
                <View>
                  <Text style={styles.expsTxt}>{i18n.t('recruit')}</Text>
                </View>
                <View style={styles.recruterBtns}>
                  <TouchableOpacity>
                    <AntDesign
                      name="checkcircleo"
                      size={20}
                      color="#6DD400"
                      style={{ paddingRight: 5 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <AntDesign
                      name="closecircleo"
                      size={20}
                      color="#FA6400"
                      style={{ paddingLeft: 5 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.cancelBtn} onPress={toggleModal}>
            <Image
              source={require('../../assets/images/cross.png')}
              style={{ resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default StaffModal;
