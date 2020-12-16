export const languages = [
    {
      name: 'English',
      countryCode: 'US',
      languageTag: 'en-US',
      languageCode: 'en',
      isRTL: false,
    },
    {
      name: 'French',
      countryCode: 'FR',
      languageTag: 'fr-FR',
      languageCode: 'fr',
      isRTL: true,
    },
  ];
  
  import React, {useState} from 'react'
  
  const [language, setLanguage] = useState(english)
  
  const english = languages[0].languageCode;
  const french = languages[1].languageCode;
  
  export const currentLanguage = language;
  
  export const SelectLanguage = ({selectLanguageProp}) => {
      if(selectLanguageProp === 'en') {
          setLanguage(english)
      } 
      else if(selectLanguageProp === 'fr') {
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
  