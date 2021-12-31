import axios from 'axios';
import { BASE_URL } from '../constants';

export const ADD_CHECKIN = async e => {
  const res = await axios.post(BASE_URL + `/v1/restaurants/check-in`, e);
  return res.data;
};