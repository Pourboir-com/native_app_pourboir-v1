import { createContext } from 'react';

const Context = createContext({
  userDetails: {
    name: '',
    image: '',
    email: '',
    accessToken: '',
  },
  restaurantsDetails: [],
  yourRestaurants: [],
});

export default Context;
