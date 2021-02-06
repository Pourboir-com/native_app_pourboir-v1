import { createContext } from 'react';

const Context = createContext({
  userDetails: {
    name: '',
    image: '',
    email: '',
    accessToken: '',
  },
  refreshAnimation: true,
  restaurantsDetails: [],
  yourRestaurants: [],
});

export default Context;
