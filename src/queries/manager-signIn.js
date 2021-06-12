import axios from 'axios';
import { BASE_URL } from '../constants';

export const SIGN_UP = async e => {
  const res = await axios.post(BASE_URL + `/v1/manager/signup`, e);
  return res.data;
};

export const LOGIN = async e => {
  const res = await axios.post(BASE_URL + `/v1/manager/signin`, e);
  return res.data;
};

export const RESET_PASSWORD = async e => {
  const res = await axios.post(BASE_URL + `/v1/manager/forget-password`, e);
  return res.data;
};
