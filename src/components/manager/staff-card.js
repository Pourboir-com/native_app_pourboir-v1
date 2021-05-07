import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';

const StaffCard = ({ toggleModal }) => {
  const ratingCompleted = rating => {
    console.log(rating);
  };
  return (
    <TouchableOpacity
      onPress={toggleModal}
      activeOpacity={0.8}
      style={styles.main_card_container}
    >
      <View style={styles.section1}>
        <View>
          <Image
            source={require('../../assets/images/Bitmap.png')}
            style={{
              borderRadius: 100,
              width: 60,
              height: 60,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
          <Text style={styles.name_staff}>Amy Farha</Text>
          <Rating
            imageSize={16}
            style={{ paddingTop: 4 }}
            ratingCount={5}
            readonly
            startingValue={3}
            onFinishRating={ratingCompleted}
          />
        </View>
      </View>
      <View style={styles.section2}>
        <AntDesign name="right" size={20} color="#485460" />
      </View>
    </TouchableOpacity>
  );
};

export default StaffCard;
