import React, { useContext } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Context from '../contextApi/context';

const NoFavRestaurant = () => {
  const { localizationContext } = useContext(Context);

  return (
    <View style={styles.container_box}>
      <Text style={styles.upper_txt}>{localizationContext.t('no_fav_1')}</Text>
      <Text style={styles.lower_txt}>{localizationContext.t('no_fav_2')}</Text>
    </View>
  );
};

export default NoFavRestaurant;

const styles = StyleSheet.create({
  container_box: {
    width: Dimensions.get('window').width * 0.45,
    height: Dimensions.get('window').width * 0.56,
    margin: Dimensions.get('window').width * 0.02,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderColor: '#E1E1E1',
    borderStyle: 'dashed',
    borderWidth: 2,
  },
  upper_txt: {
    width: 150,
    fontSize: 15,
    fontFamily: 'ProximaNova',
    textAlign: 'center',
  },
  lower_txt: {
    width: 130,
    fontSize: 15,
    fontFamily: 'ProximaNovaBold',
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: -5,
  },
});
