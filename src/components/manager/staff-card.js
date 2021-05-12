import React from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import RatingStar from '../../components/RatingComponent';

const StaffCard = ({ toggleModal, data }) => {
  const obj = [1, 2, 3, 4, 5];

  return (
    <TouchableOpacity
      onPress={() => toggleModal(data?._id)}
      activeOpacity={0.8}
      style={styles.main_card_container}
    >
      <View style={styles.section1}>
        <View>
          <Image
            source={{ uri: data?.user_id.picture }}
            style={{
              borderRadius: 30,
              width: 55,
              height: 55,
            }}
          />
        </View>
        <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={styles.name_staff}
          >
            {data?.user_id?.full_name}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 7 }}>
            {obj.map((v, i) => {
              return (
                <TouchableOpacity style={{ marginRight: 3 }} key={i}>
                  <RatingStar
                    starSize={17}
                    type={
                      v <= data?.rating
                        ? 'filled'
                        : v === data?.rating + 0.5
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
