import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import RatingStar from '../../components/RatingComponent';

const StaffCard = ({ toggleModal }) => {
  const obj = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(3);
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
          <View style={{ flexDirection: 'row', marginTop: 6 }}>
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
      </View>
      <View style={styles.section2}>
        <AntDesign name="right" size={20} color="#485460" />
      </View>
    </TouchableOpacity>
  );
};

export default StaffCard;
