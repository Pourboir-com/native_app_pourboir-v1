import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-gesture-handler';
// import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
        <NavigationContainer>
          <View>
            <Text>Starting</Text>
          </View>
        </NavigationContainer>
  );
}

