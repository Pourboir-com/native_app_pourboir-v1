import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import { StyleSheet, View, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import GlobalHeader from '../../components/GlobalHeader';

const MapScreen = ({ navigation, route }) => {
  const { geometry, name } = route?.params || {};
  const [isMapReady, setIsMapReady] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} style="dark" />
      <View style={{flex: 1, marginTop: '5%'}}>
        <MapView
          showsUserLocation
          onLayout={() => setIsMapReady(true)}
          // provider={Platform.OS != 'ios' && PROVIDER_GOOGLE}
          {...(Platform.OS != 'ios'
            ? {
                provider: PROVIDER_GOOGLE,
              }
            : {})}
          style={styles.map}
          initialRegion={{
            latitude: geometry?.lat || 0,
            longitude: geometry?.lng || 0,
            latitudeDelta: 0.0092,
            longitudeDelta: 0.00421,
          }}
        >
          {isMapReady && (
            <>
              <MapView.Marker
              rotation={4}
                coordinate={{
                  latitude: geometry?.lat || 0,
                  longitude: geometry?.lng || 0,
                }}
                title={'Location'}
                description={name}
              />
              {/* <MapView.Marker
                coordinate={{
                  latitude: saveLocation?.latitude || 0,
                  longitude: saveLocation?.longitude || 0,
                }}
                pinColor={'#006400'}
                title={'Home'}
                // description={name}
              /> */}
            </>
          )}
        </MapView>
      </View>
      <ImageBackground
        style={{
          width: '100%',
          height: 100,
          top: 0,
          borderBottomLeftRadius: Dimensions.get('window').width * 0.06,
          borderBottomRightRadius: Dimensions.get('window').width * 0.06,
          overflow: 'hidden',
          backgroundColor: 'transparent',
          position: 'absolute',
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
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
