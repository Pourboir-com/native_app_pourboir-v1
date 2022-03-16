import { createContext } from 'react';

const Context = createContext({
  userDetails: {
    name: '',
    image: '',
    email: '',
    accessToken: '',
    user_id: '',
  },
  language: 'en-US',
  refreshAnimation: false,
  restaurantsDetails: false,
  yourRestaurants: [],
});

export default Context;
