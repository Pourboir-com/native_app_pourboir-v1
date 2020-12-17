import React, { useState } from 'react';
import SelectLanguageScreen from '../screens/selectLanguage'
//   import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList } from 'react-native';

export const languages = [
    {
        name: 'English',
        countryCode: 'US',
        languageTag: 'en-US',
        languageCode: 'en',
    },
    {
        name: 'French',
        countryCode: 'FR',
        languageTag: 'fr-FR',
        languageCode: 'fr',
    },
];

const english = languages[0].languageCode;
const french = languages[1].languageCode;


const SelectLanguage = ({ selectLanguageProp }) => {

    const [language, setLanguage] = useState(english)

    let currentLanguage = language;

    if (selectLanguageProp === 'en') {
        setLanguage(english)
    }
    else if (selectLanguageProp === 'fr') {
        setLanguage(french)
    }
}



  // export const changeSelectedLanguage = (selectedLanguage) => (dispatch) => {
  //   dispatch({
  //     type: types.SET_LANGUAGE,
  //     payload: {
  //       isLoading: false,
  //       isError: false,
  //       errorMessage: null,
  //       selectedLanguage: selectedLanguage,
  //       online: true,
  //     },
  //   });
  // };
