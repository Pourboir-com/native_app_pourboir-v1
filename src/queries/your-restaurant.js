import { BASE_URL } from '../constants';

export const GET_YOUR_RES = async (get, e = {}) => {
  let res = await fetch(
    BASE_URL + `/v1/restaurants/${e.user_id}?location=${e.location}`,
    {
      method: 'get',
    },
  );
  return await res.json();
};
// &max_results=${e.max_results}&page_no=${e.page_no}