import React from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import RatingStar from '../../components/RatingComponent';
import Swipeout from 'react-native-swipeout';
import { Feather } from '@expo/vector-icons';

const StaffCard = ({ toggleModal, data, handleDeleteForm }) => {
  const obj = [1, 2, 3, 4, 5];
  var swipeoutBtns = [
    {
      text: (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleDeleteForm(data?._id)}
          style={{
            backgroundColor: '#fff',
            height: '100%',
            width: 55,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
          }}
        >
          <Feather name="x-circle" size={34} color="#FCDF6F" />
        </TouchableOpacity>
      ),
      height: '100%',
      backgroundColor: '#f1f1f1',
    },
  ];
  return (
    <Swipeout
      style={{
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderRadius: 15,
        marginBottom: 14,
        width: '90%',
        alignSelf: 'center',
      }}
      right={swipeoutBtns}
    >
      <TouchableOpacity activeOpacity={0.8} style={styles.main_card_container}>
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
              {/* {obj.map((v, i) => {
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
              })} */}
              <Text style={{ fontFamily: 'ProximaNovaBold', fontSize: 15 }}>
                lorem
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section2}>
          <TouchableOpacity onPress={() => toggleModal(data?._id)}>
            <AntDesign name="right" size={20} color="#485460" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Swipeout>
  );
};

export default StaffCard;
