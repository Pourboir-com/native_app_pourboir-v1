import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import { Rating } from 'react-native-ratings';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import i18n from '../../li8n';

const StaffModal = ({ isModalVisible, toggleModal }) => {
  const ratingCompleted = rating => {
    console.log(rating);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modal_container}>
          <ScrollView style={{ width: '100%' }}>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity style={styles.cancelBtn} onPress={toggleModal}>
                <Image 
                source={require('../../assets/images/cross.png')}
                style={{resizeMode:'contain'}}
                />
              </TouchableOpacity>
              <View style={styles.first_part_modal}>
                <View style={{ marginVertical: 20 }}>
                  <View>
                    <Image
                      source={require('../../assets/images/Bitmap.png')}
                      style={{ resizeMode: 'contain', width: 110, height: 110 }}
                    />
                  </View>
                  <View style={{ marginTop: 8 }}>
                    <Rating
                      imageSize={18}
                      style={{ paddingTop: 4 }}
                      ratingCount={5}
                      readonly
                      startingValue={3}
                      onFinishRating={ratingCompleted}
                    />
                  </View>
                  <View style={{ marginTop: 14 }}>
                    <Text style={styles.text_dispon}>{i18n.t('availability')}</Text>
                    <TouchableOpacity
                      onPress={() => alert('hello')}
                      style={styles.btn_green}
                    >
                      <Text style={styles.btnGreen_txt}>{i18n.t('immediate')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.first_part_modal}>
                <View style={{ marginVertical: 20 }}>
                  <View>
                    <View>
                      <Text style={styles.expsTxt}>{i18n.t('exp')}</Text>
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
                <View style={{ marginVertical: 20 }}>
                  <View>
                    <View>
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
                <View>
                  <View>
                    <Text style={styles.expsTxt}>{i18n.t('recruit')}</Text>
                  </View>
                  <View style={styles.recruterBtns}>
                    <TouchableOpacity>
                      <AntDesign
                        name="checkcircleo"
                        size={20}
                        color="#6DD400"
                        style={{paddingRight:5}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <AntDesign
                        name="closecircleo"
                        size={20}
                        color="#FA6400"
                        style={{paddingLeft:5}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default StaffModal;
