import axios from 'axios';
import { BASE_URL } from '../constants';

export const GET_TICKETS = async (get, e = {}) => {
    let res = await fetch(
      BASE_URL + `/v1/restaurants/tokens?user_id=${e.user_id}`,
      {
        method: 'get',
      },
    );
    return await res.json();
  };