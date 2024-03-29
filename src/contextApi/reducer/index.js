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
    case actionTypes.YOUR_RESTAURANTS:
      return {
        ...state,
        yourRestaurants: payload,
      };
    case actionTypes.REFRESH_ANIMATION:
      return {
        ...state,
        refreshAnimation: payload,
      };
    case actionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: payload,
      };
    default:
      return state;
  }
};

export default reducer;
