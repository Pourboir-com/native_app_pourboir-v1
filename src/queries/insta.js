import axios from 'axios';
import { BASE_URL } from '../constants';

export const SUBMIT_INSTA_DETAILS = async e => {
  let res = await axios.post(BASE_URL + `/v1/users/storeDetails`, e);
  return res;
};

export const GET_INSTA_DETAILS = async (get, e = {}) => {
  const res = await axios.get(BASE_URL + `/v1/users/storeDetails`, {
    params: e,
  });
  return res.data;
};

export const GET_INSTA_POSTS = async (get, e = {}) => {
  const res = await axios.get(BASE_URL + `/v1/users/storeInstagramPosts`, {
    params: e,
  });
  return res.data;
};
