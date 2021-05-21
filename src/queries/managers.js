import axios from 'axios';
import { BASE_URL } from '../constants';

export const RECRUITMENT_FORM = async (get, e = {}) => {
  const res = await axios.get(BASE_URL + `/v1/waiters-job-form`, {
    params: e,
  });
  return res.data;
};

export const DELETE_WAITER_FORMS = async e => {
  console.log(e);
  const res = await axios.post(
    BASE_URL + `/v1/waiters-job-form/update-list`,
    e,
  );
  return res.data;
};
