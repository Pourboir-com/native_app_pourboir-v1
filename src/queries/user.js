import axios from 'axios';
import { BASE_URL } from '../constants';

export const GET_USER_DETAILS = async (get, e = {}) => {
  const res = await axios.get(BASE_URL + `/v1/users/${e.user_id}`);
  return res.data;
};
