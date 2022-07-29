import axios from 'axios';
import { BASE_URL } from '../constants';

export const ADDING_WAITERS = async e => {
  let res = await fetch(BASE_URL + `/v1/restaurant-waiters`, {
    method: 'Post',
    body: JSON.stringify(e),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const GET_WAITERS = async (get, e = {}) => {
  const res = await axios.get(BASE_URL + `/v1/restaurant-waiters`, {
    params: e,
  });
  return res.data;
};

export const I_AM_WAITER = async e => {
  let res = await axios.post(BASE_URL + `/v1/users/add-to-waiters`, e);
  return res;
};

export const REGISTER_RESTAURANT = async e => {
  let res = await axios.post(BASE_URL + `/v1/restaurants/save`, e);
  return res;
};

export const GET_RESTAURANT_DETAILS = async (get, e = {}) => {
  const { _id, ...rest } = e;
  const res = await axios.get(BASE_URL + `/v1/restaurants/detail/${_id}`, {
    params: rest,
  });
  return res.data;
};
