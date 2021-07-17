import axios from 'axios';
import { BASE_URL } from '../constants';

export const ADD_FAVORITE = async e => {
  const res = await axios.post(BASE_URL + `/v1/favorites`, e);
  return res.data;
};

export const GET_FAVORITES = async (get, e = {}) => {
  const res = await axios.get(BASE_URL + `/v1/favorites`, {
    params: e,
  });
  return res.data;
};
