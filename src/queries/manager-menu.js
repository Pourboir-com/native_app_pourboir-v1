import axios from 'axios';
import { BASE_URL } from '../constants';

export const GET_MENU = async (get, e = {}) => {
  const res = await axios.get(BASE_URL + `/v1/menu`, {
    params: e,
  });
  return res.data;
};

export const PUBLISH_MENU = async e => {
  let res = await axios.post(BASE_URL + `/v1/menu`, e);
  return res;
};

export const MANAGER_APPROVAL = async e => {
  let res = await axios.post(BASE_URL + `/v1/manager/user-manager`, e);
  return res;
};
export const SAVE_CHANGES = async e => {
  let res = await axios.post(BASE_URL + `/v1/menu`, e);
  return res;
};

export const DELETE_DISH = async e => {
  let res = await axios.delete(BASE_URL + `/v1/menu/dish`, {
    data: e,
  });
  return res;
};

export const DELETE_MENU = async e => {
  let res = await axios.delete(BASE_URL + `/v1/menu`, {
    data: {
      ...e,
    },
  });
  return res;
};
export const GET_REVIEWS = async (get, e = {}) => {
  const res = await axios.get(BASE_URL + `/v1/restaurants/review`, {
    params: e,
  });
  return res.data;
};

export const CREATE_REVIEW = async e => {
  const res = await axios.post(BASE_URL + `/v1/restaurants/review`, e);
  return res;
};
