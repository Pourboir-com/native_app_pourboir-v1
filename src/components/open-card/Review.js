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
import CheckInModal from '../modals/ThanksRatingModal';

const Review = ({
  reviewData,
  reviewRefetch,
  restaurant,
  distance,
  handleOpenModal,
  tourModal,
  section,
}) => {
  const [leaveRevModal, setLeaveRevModal] = useState(false);
  const { state } = useContext(Context);
  const [hospitality, setHospitality] = useState();
  const [comment, setComment] = useState('');
  const [createRestaurantReview, { isLoading: createLoading }] = useMutation(
    CREATE_REVIEW,
  );
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [token, setToken] = useState(0);

  const confirmClick = async () => {
    await createRestaurantReview(
      {
        user_id: state.userDetails.user_id,
        rating: hospitality,
        comment,
        place: restaurant,
      },
      {
        onSuccess: res => {
          reviewRefetch();
          setLeaveRevModal(false);
          setToken(res?.data?.data?.token || 0);
          setReviewSuccess(true);
        },
      },
    );
  };

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
          Review
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

      <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
        <FlatList
          data={reviewData?.data || []}
          renderItem={({ item }) => (
            <View style={{ marginRight: 7, marginBottom: 10, marginTop: 5 }}>
              <Text>
                {item.comment && (
                  <ReviewSlider rating={+item.rating} item={item} />
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
      {reviewSuccess && (
        <CheckInModal
          isVisible={reviewSuccess}
          handleModalClose={() => setReviewSuccess(false)}
          LotteryNumber={token}
          heading={'thank_review'}
          subText={'won_ticket'}
        />
      )}

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
