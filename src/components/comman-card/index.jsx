import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../../screens/braserri/styles';
import RatingStar from '../RatingComponent';
import { SvgHeaderUserIcon } from '../../components/svg/header_user_icon';

const CommonCard = ({
  waiter_name,
  waiter_email,
  cook_name,
  cook_email,
  picture,
}) => {
  const obj = [1, 2, 3, 4, 5];
  return (
    <TouchableOpacity
      // onPress={() => toggleModal(data?._id)}
      underlayColor="#f9f9f9"
      style={[styles.main_card_container, { width: '98%' }]}
      activeOpacity={0.6}
    >
      <>
        <View style={styles.section1}>
          <View>
            {picture ? (
              <Image
                style={{ width: 55, height: 55, borderRadius: 30 }}
                source={{ uri: picture }}
              />
            ) : (
              <SvgHeaderUserIcon height={45} width={45} />
            )}
          </View>
          <View style={{ paddingLeft: 10, alignSelf: 'center' }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.name_staff}
            >
              {/* {upperTitleCase(data?.user_id?.full_name)} */}
              {waiter_name || cook_name}
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 7 }}>
              {obj.map((v, i) => {
                return (
                  <TouchableOpacity style={{ marginRight: 3 }} key={i}>
                    <RatingStar
                      starSize={17}
                      type={
                        v <= 0 ? 'filled' : v === 3 + 0.5 ? 'half' : 'empty'
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
          <TouchableOpacity>
            <AntDesign name="right" size={20} color="#485460" />
          </TouchableOpacity>
        </View>
      </>
    </TouchableOpacity>
  );
};

export default CommonCard;
