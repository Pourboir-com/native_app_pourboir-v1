import axios from 'axios';
import { BASE_URL } from '../constants';

export const ADDING_WAITERS = async e => {
  let res = await fetch(BASE_URL + `/v1/restaurant-waiters/add-waiter`, {
    method: 'Post',
    body: JSON.stringify(e),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};

export const GET_WAITERS = async (get, e = {}) => {
  let res = await fetch(BASE_URL + `/v1/restaurant-waiters?restaurant_id=${e.restaurant_id}`, {
    method: 'get',
  });
  return await res.json();
};

export const I_AM_WAITER = async e => {
  let res = await fetch(BASE_URL + `/v1/users/add-to-waiters`, {
    method: 'Post',
    body: JSON.stringify(e),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};
