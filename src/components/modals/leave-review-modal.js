import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../constants/Theme';
import Modal from 'react-native-modal';
import RatingStar from '../RatingComponent';
import { Textarea } from 'native-base';
import Context from '../../contextApi/context';

const LeaveReviewModal = ({
  leaveRevModal,
  setLeaveRevModal,
  hospitality,
  setHospitality,
  comment,
  setComment,
  confirmClick,
  createLoading,
}) => {
  const obj = [1, 2, 3, 4, 5];
  const { localizationContext } = useContext(Context);

  return (
    <Modal
      isVisible={leaveRevModal}
      backdropOpacity={0}
      style={{
        width: '100%',
        marginHorizontal: 0,
        marginTop: 0,
        marginBottom: 0,
        position: 'relative',
      }}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.7)',
        }}
      >
        <View>
          <Text style={styles.ReviewTxt}>
            {localizationContext.t('your_rev')}
          </Text>
        </View>
        {/* Section 1 */}
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 12,
            paddingVertical: 25,
            width: '90%',
            marginTop: 70,
          }}
        >
          <Text style={styles.tellTxt}>{localizationContext.t('how_exp')}</Text>
          <View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              {obj.map((v, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      setHospitality(v);
                    }}
                    style={{ marginHorizontal: 15, marginTop: 8 }}
                  >
                    <RatingStar
                      // padding={true}
                      starSize={35}
                      type={
                        v <= hospitality
                          ? 'filled'
                          : v === hospitality + 0.5
                          ? 'half'
                          : 'empty'
                      }
                      notRatedStarColor="#e6e6e6"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
        {/* Section2  */}
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 20,
            width: '90%',
            marginTop: 30,
          }}
        >
          <Text style={styles.tellTxt}>{localizationContext.t('tell_us')}</Text>
          <View style={styles.textArea}>
            <Textarea
              style={{ height: 100, fontFamily: 'ProximaNova', fontSize: 15 }}
              placeholder={localizationContext.t('exp_placeholder')}
              value={comment}
              onChangeText={e => setComment(e)}
            />
          </View>
        </View>

        {/* Section 3  */}
        <View style={styles.buttonsModal}>
          <TouchableOpacity
            onPress={() => setLeaveRevModal(false)}
            activeOpacity={0.7}
            style={{ ...styles.btn, backgroundColor: '#EAEAEA' }}
          >
            <Text style={styles.btnTxt}>{localizationContext.t('cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={confirmClick}
          >
            {createLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.btnTxt}>
                {localizationContext.t('confirm')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          setLeaveRevModal(false);
        }}
        style={{
          alignSelf: 'flex-end',
          position: 'absolute',
          top: 30,
          right: 10,
        }}
      >
        <AntDesign name="close" size={29} color="white" />
      </TouchableOpacity>
    </Modal>
  );
};

export default LeaveReviewModal;

const styles = StyleSheet.create({
  ReviewTxt: {
    color: '#fff',
    fontFamily: 'ProximaNovaBold',
    fontSize: 24,
    textAlign: 'center',
  },
  tellTxt: {
    fontFamily: 'ProximaNovaBold',
    fontSize: 16,
    textAlign: 'center',
  },
  textArea: {
    borderWidth: 2,
    borderColor: '#E3E3E3',
    borderRadius: 12,
    marginTop: 10,
    padding: 8,
  },
  buttonsModal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginTop: 60,
  },
  btn: {
    backgroundColor: Colors.yellow,
    borderRadius: 7,
    width: 115,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  btnTxt: {
    fontFamily: 'PrxoimaNova',
    fontSize: 14,
  },
});
