import React, { useContext } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-elements';
import { Text } from 'react-native-svg';
import RatingStar from '../RatingComponent';
import { SvgHeaderUserIcon } from '../svg/header_user_icon';
import { MaterialIcons } from '@expo/vector-icons';
import Context from '../../contextApi/context';
import { StyleSheet } from 'react-native';

const WaiterCard = ({
  navigation,
  waitersLoading,
  data,
  place_id,
  restaurant_id,
}) => {
  const { state, localizationContext } = useContext(Context);
  const obj = [1, 2, 3, 4, 5];

  return (
    <FlatList
      data={waitersLoading ? null : data}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item._id}
      renderItem={itemData => (
        <TouchableOpacity
          activeOpacity={0.5}
          key={itemData?.item?._id}
          onPress={() => {
            if (state.userDetails.user_id !== itemData.item?.user_id?._id) {
              navigation.navigate('RateYourService', {
                name:
                  itemData?.item?.user_id?.full_name ||
                  itemData?.item.full_name ||
                  'name missing',
                image:
                  itemData?.item?.user_id && itemData?.item?.user_id?.picture,
                restaurant_id: place_id,
                waiter_id: itemData?.item?._id,
                place_id: restaurant_id,
              });
            } else {
              alert(localizationContext.t('cannot_vote'));
            }
          }}
          style={styles.viewItemConatier}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {itemData?.item?.user_id ? (
              <Image
                style={{ width: 55, height: 55, borderRadius: 30 }}
                source={{ uri: itemData?.item?.user_id.picture }}
              />
            ) : (
              <SvgHeaderUserIcon height={45} width={45} />
            )}

            <View style={{ marginLeft: 10 }}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.txtItemName}
              >
                {itemData?.item?.user_id?.full_name ||
                  itemData?.item?.full_name ||
                  'name missing'}
              </Text>
              <View
                pointerEvents="none"
                style={{ flexDirection: 'row', marginTop: 7 }}
              >
                {obj.map((v, i) => {
                  return (
                    <TouchableOpacity style={{ marginRight: 3 }} key={i}>
                      <RatingStar
                        starSize={16}
                        type={
                          v <= itemData.item.rating
                            ? 'filled'
                            : v === itemData.item.rating + 0.5
                            ? 'half'
                            : 'empty'
                        }
                        notRatedStarColor="rgba(0,0,0,0.1)"
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={28} color="grey" />
        </TouchableOpacity>
      )}
    />
  );
};

export default WaiterCard;
const styles = StyleSheet.create({
  viewItemConatier: {
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    height: 80,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  txtItemName: {
    fontFamily: 'ProximaNova',
    fontSize: 17,
    letterSpacing: 0,
    lineHeight: 24,
  },
});
