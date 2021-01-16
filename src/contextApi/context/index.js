import { createContext } from 'react';

const Context = createContext({
  userDetails: {
    name: '',
    image: '',
    email: '',
    accessToken: '',
  },
});

export default Context;
