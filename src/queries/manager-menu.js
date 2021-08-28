import axios from 'axios';
import { BASE_URL } from '../constants';

export const GET_MENU = async (get, e = {}) => {
  const res = await axios.get(BASE_URL + `/v1/menu`, {
    params: e,
  });
  return res.data;
};

export const PUBLISH_MENU = async e => {
  let res = await axios.post(BASE_URL + `/v1/menu/bulk`, e);
  return res;
};

export const DELETE_DISH = async e => {
  let res = await axios.delete(BASE_URL + `/v1/menu/dish`, e);
  return res;
};

export const DELETE_MENU = async e => {
  let res = await axios.delete(BASE_URL + `/v1/menu`, e);
  return res;
};
