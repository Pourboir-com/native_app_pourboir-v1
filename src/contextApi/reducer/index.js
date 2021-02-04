import * as actionTypes from '../actionTypes';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case actionTypes.USER_DETAILS:
      return {
        ...state,
        userDetails: payload,
      };
    case actionTypes.RESTAURANTS_DETAILS:
      return {
        ...state,
        restaurantsDetails: payload,
      };
    default:
      return state;
  }
};

export default reducer;
