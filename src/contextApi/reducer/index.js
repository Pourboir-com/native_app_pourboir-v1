import * as actionTypes from '../actionTypes';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.USER_DETAILS:
      return {
        userDetails: payload,
      };
    default:
      return state;
  }
};

export default reducer;
