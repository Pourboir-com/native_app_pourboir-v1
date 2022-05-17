import axios from 'axios';
import { BASE_URL } from '../constants';

export const GET_BALANCE = async (get, e = {}) => {
  const res = await axios.get(BASE_URL + `/v1/account`, {
    params: e,
  });
  return res.data;
};
