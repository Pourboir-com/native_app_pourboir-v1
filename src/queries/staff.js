import axios from 'axios';
import { BASE_URL } from '../constants';

export const STAFF = async e => {
  const res = await axios.get(BASE_URL + `/v1/staff`, {
    params: e,
  });
  return res.data;
};

export const ADD_STAFF = async e => {
  const res = await axios.post(BASE_URL + `/v1/staff`, e);
  return res.data;
};
