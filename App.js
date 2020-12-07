import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
        <NavigationContainer>
          <RootNavigator/>
        </NavigationContainer>
  );
}

