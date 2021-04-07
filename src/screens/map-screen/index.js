import React from 'react';
import { ImageBackground } from 'react-native';
import { StatusBar } from 'react-native';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import GlobalHeader from '../../components/GlobalHeader';
import i18n from '../../li8n';

const MapScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 0 }}>
        <StatusBar translucent={true} style="dark" />
        <ImageBackground
          style={{
            width: '100%',
            height: 100,
          }}
          source={require('../../assets/images/Group3.png')}
        >
          <GlobalHeader
            arrow={true}
            headingText={'27 Qual des Belges 13001'}
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
          style={styles.map}
          initialRegion={{
            latitude: 43.296398,
            longitude: 5.37,
            latitudeDelta: 0.0092,
            longitudeDelta: 0.00421,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: 43.296398,
              longitude: 5.37,
            }}
            title={'Location'}
            description={'27 Qual des Belges 13001 Marselle, France'}
          />
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
