import axios from 'axios';
import { BASE_URL } from '../constants';

export const SUBMIT_REVIEW = async e => {
  let res = await axios.post(BASE_URL + `/v1/restaurants/review`, e);
  return res;
};
