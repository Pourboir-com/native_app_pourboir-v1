import { BASE_URL } from '../constants';
import axios from 'axios';

export const UPDATE_PICTURE = async e => {
  let res = await fetch(BASE_URL + `/v1/users/change-display/${e.user_id}`, {
    method: 'put',
    body: e.image,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return await res.json();
};

export const GET_ACCOUNTS = async () => {
  const res = await axios.get(BASE_URL + `/v1/account/update-values`);
  return res.data;
};
