/* eslint-disable indent */
import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { ReviewSlider } from './ReviewSlider';
import LeaveReviewModal from '../modals/leave-review-modal';
import { Entypo } from '@expo/vector-icons';
import Context from '../../contextApi/context';

const Review = ({
  reviewData,
  distance,
  handleOpenModal,
  tourModal,
  section,
  confirmClick,
  setLeaveRevModal,
  createLoading,
  leaveRevModal,
}) => {
  const { localizationContext } = useContext(Context);
  const [hospitality, setHospitality] = useState();
  const [comment, setComment] = useState('');

  const handleAddClick = () => {
    if (Number(distance) < 300) {
      setLeaveRevModal(true);
      setHospitality();
      setComment();
    } else {
      handleOpenModal();
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 15,
          alignItems: 'center',
        }}
      >
        <Text style={[styles.txtHeading, { fontFamily: 'ProximaNovaBold' }]}>
          {localizationContext.t('review')}
        </Text>
        {!tourModal || section !== 4 ? (
          <TouchableOpacity
            disabled={createLoading}
            onPress={handleAddClick}
            activeOpacity={0.5}
            style={{
              marginLeft: 15,
              backgroundColor: '#FCDF6F',
              padding: 2,
              borderRadius: 100,
            }}
          >
            <View>
              <Entypo name="plus" size={22} color="white" />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={{ marginLeft: 20, marginVertical: 10 }}>
        <FlatList
          data={reviewData?.data || []}
          renderItem={({ item }) => (
            <View style={{ marginRight: 7, marginBottom: 10, marginTop: 5 }}>
              <Text>
                {item.comment && (
                  <ReviewSlider rating={item.rating} item={item} />
                )}
              </Text>
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={item => item.id}
        />
      </View>

      <LeaveReviewModal
        leaveRevModal={leaveRevModal}
        setLeaveRevModal={setLeaveRevModal}
        hospitality={hospitality}
        setHospitality={setHospitality}
        comment={comment}
        setComment={setComment}
        confirmClick={() => confirmClick(hospitality, comment)}
        createLoading={createLoading}
      />
    </View>
  );
};

export { Review };
