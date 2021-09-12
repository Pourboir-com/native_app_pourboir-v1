import axios from 'axios';
import { BASE_URL } from '../constants';

export const GET_RESTAURANT = async (get, e = {}) => {
  let res = await fetch(
    BASE_URL + `/v1/restaurants?location=${e.location}&search=${e.search}`,
    {
      method: 'get',
    },
  );
  return await res.json();
};
export const GET_FAVORITE_RESTAURANT = async (get, e = {}) => {
  let res = await axios.get(BASE_URL + `/v1/favorites`, {
    params: e,
  });
  return res.data;
};

// export const GET_FAVORITE_RESTAURANT = async (get, e = {}) => {
//   let res = await axios.get(BASE_URL + `/v1/favorites`, e);
//   return res.data;
// };
// &pageToken=${e.pageToken}&maxResults=${e.maxResults}
