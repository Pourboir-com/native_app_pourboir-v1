import axios from 'axios';

export const userSignUp = async accessToken => {
  return await axios.get('https://www.googleapis.com/userinfo/v2/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
