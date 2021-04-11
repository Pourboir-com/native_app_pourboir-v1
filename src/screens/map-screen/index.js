import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import GlobalHeader from '../../components/GlobalHeader';

const MapScreen = ({ navigation, route }) => {
  const [mapReady, setMapReady] = useState(false);
  const { geometry, name } = route?.params;
  const handleMapReady = () => {
    setMapReady(true);
  };
  return (
    <View style={styles.container}>
      <View style={{}}>
        <StatusBar translucent={true} style="dark" />
        <ImageBackground
          style={{
            width: '100%',
            height: 100,
            borderBottomLeftRadius: Dimensions.get('window').width * 0.06,
            borderBottomRightRadius: Dimensions.get('window').width * 0.06,
            overflow: 'hidden',
          }}
          source={require('../../assets/images/Group3.png')}
        >
          <GlobalHeader
            arrow={true}
            headingText={name}
            fontSize={17}
            color={'black'}
            navigation={navigation}
            setting={false}
            backgroundColor={'transparent'}
            borderRadius={true}
          />
        </ImageBackground>
      </View>
      <View style={{ flex: 1 }}>
        <MapView
          onLayout={handleMapReady}
          style={styles.map}
          initialRegion={{
            latitude: geometry?.lat || 0,
            longitude: geometry?.lng || 0,
            latitudeDelta: 0.0092,
            longitudeDelta: 0.00421,
          }}
        >
          {mapReady && (
            <MapView.Marker
              coordinate={{
                latitude: geometry?.lat,
                longitude: geometry?.lng,
              }}
              title={'Location'}
              description={name}
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
