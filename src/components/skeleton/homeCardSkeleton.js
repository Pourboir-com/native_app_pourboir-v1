import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const HomeCardSkeleton = () => {
  return (
    <View style={styles.viewDummyCard}>
      <SkeletonPlaceholder backgroundColor='#f6f6f9' highlightColor='#E0E0E0'>
        <View style={styles.view1dumy} />
        <View style={styles.view2dumy} />
        <View style={styles.view3dumy} />
        <View style={styles.view4dumy} />
      </SkeletonPlaceholder>
    </View>
  );
};
export { HomeCardSkeleton };

const styles = StyleSheet.create({
  view1dumy: {
    width: '80%',
    height: 20,
    marginBottom: 70,
  },
  view2dumy: {
    width: '100%',
    height: 15,
    marginTop: 10,
  },
  view3dumy: {
    width: '80%',
    height: 15,
    marginTop: 10,
  },
  view4dumy: {
    width: '30%',
    height: 15,
    marginTop: 10,
  },
  viewDummyCard: {
    width: Dimensions.get('window').width * 0.455,
    height: 210,
    margin: Dimensions.get('window').width * 0.02,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 20,
  },
});
