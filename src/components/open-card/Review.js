/* eslint-disable indent */
import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { ReviewSlider } from './index';
import LeaveReviewModal from '../modals/leave-review-modal';
import { Entypo } from '@expo/vector-icons';
import { useMutation } from 'react-query';
import { CREATE_REVIEW } from '../../queries';
import Context from '../../contextApi/context';

const Review = ({ reviewData, reviewRefetch, restaurant }) => {
  const [leaveRevModal, setLeaveRevModal] = useState(false);
  const { state } = useContext(Context);
  const [hospitality, setHospitality] = useState();
  const [comment, setComment] = useState('');
  const [createRestaurantReview] = useMutation(CREATE_REVIEW);
  const confirmClick = async () => {
    await createRestaurantReview(
      {
        user_id: state.userDetails.user_id,
        rating: hospitality,
        comment,
        place: restaurant,
      },
      {
        onSuccess: () => {
          reviewRefetch();
          setLeaveRevModal(false);
          alert('Review successfully added!');
        },
      },
    );
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
          Review
        </Text>
        <TouchableOpacity
          onPress={() => {
            setLeaveRevModal(true), setHospitality(), setComment();
          }}
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
      </View>

      <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
        <FlatList
          data={reviewData?.data || []}
          renderItem={({ item }) => (
            <ReviewSlider rating={+item.rating} item={item} />
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
        confirmClick={confirmClick}
      />
    </View>
  );
};

export { Review };
