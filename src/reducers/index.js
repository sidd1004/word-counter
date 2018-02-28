import { REQUEST_TEXT } from '../actions';

export default (state = { text: null }, action) => {
  switch (action.type) {
    case REQUEST_TEXT:
      return {
        ...state,
        text: action.payload
      };
    default:
      return state;
  }
};
