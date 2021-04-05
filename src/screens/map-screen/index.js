import React from 'react'
import { Dimensions } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import MapView from 'react-native-maps';

const MapScreen = () => {
    return (
        <View style={styles.container}>
      <MapView 
      style={styles.map} 
       initialRegion={{
        latitude:	43.296398,
        longitude: 	5.370000,
        latitudeDelta: 0.0092,
        longitudeDelta: 0.00421,
      }}>
       <MapView.Marker
      coordinate={{
        latitude:	43.296398,
        longitude: 	5.370000,
      }}
      title={"Location"}
      description={"27 Qual des Belges 13001 Marselle, France"}
    />
      </MapView>
    </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },    
})
