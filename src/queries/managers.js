import axios from 'axios';
import { BASE_URL } from '../constants';

export const RECRUITMENT_FORM = async (get, e = {}) => {
  const res = await axios.get(BASE_URL + `/v1/waiters-job-form`, {
    params: e,
  });
  return res.data;
};
