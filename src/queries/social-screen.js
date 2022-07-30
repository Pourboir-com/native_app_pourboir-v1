import axios from 'axios';
import { BASE_URL } from '../constants';

export const GOOGLE_SIGNUP = async e => {
  let res = await fetch(BASE_URL + `/v1/users/google-signup`, {
    method: 'Post',
    body: JSON.stringify(e),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const SIGN_UP_USER = async e => {
  let res = await axios.post(BASE_URL + `/v1/register`, e);
  return res;
};
