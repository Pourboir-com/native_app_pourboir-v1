import axios from 'axios';
import { BASE_URL } from '../constants';

export const UPDATE_PICTURE = async e => {
  let res = await fetch(BASE_URL + `/v1/users/change-display/${e.user_id}`, {
    method: 'put',
    body: e,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });
  return await res.json();
};
