import { BASE_URL } from '../constants';

export const ADD_RATINGS = async e => {
  let res = await fetch(BASE_URL + `/v1/waiters-voting/add`, {
    method: 'Post',
    body: JSON.stringify(e),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};