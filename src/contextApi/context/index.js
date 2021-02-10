import { createContext } from 'react';

const Context = createContext({
  userDetails: {
    name: '',
    image: '',
    email: '',
    accessToken: '',
  },
  refreshAnimation: false,
  restaurantsDetails: [],
  yourRestaurants: [],
});

export default Context;
