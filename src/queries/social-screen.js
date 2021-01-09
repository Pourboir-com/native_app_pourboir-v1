import axios from 'axios';
import { BASE_URL } from '../constants';

export const GOOGLE_SIGNUP = async e => {
  const res = await axios.post(BASE_URL + `/v1/users/google-signup`, e);
  return res;
};
