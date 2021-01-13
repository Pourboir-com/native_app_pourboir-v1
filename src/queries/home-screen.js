import axios from 'axios';
import { BASE_URL } from '../constants';

export const GET_RESTAURANT = async (e = {}) => {
  let res = await fetch(BASE_URL + `/v1/restaurants`, {
    method: 'get',
  });
  return await res.json();
};
