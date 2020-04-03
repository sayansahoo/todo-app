import * as actionTypes from "./actionTypes";

export const actions = {
  setName: name => ({
    type: actionTypes.SET_USER_NAME,
    name
  }),
  setEmail: email => ({
    type: actionTypes.SET_USER_EMAIL,
    email
  }),
  setData: userData => ({
    type: actionTypes.SET_USER_DATA,
    userData
  })
};

const initialState = {
  name: "",
  email: "",
  userData: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_NAME: {
      return {
        ...state,
        name: action.name
      };
    }
    case actionTypes.SET_USER_EMAIL: {
      return {
        ...state,
        email: action.email
      };
    }
    case actionTypes.SET_USER_DATA: {
      return {
        ...state,
        userData: action.userData
      }
    }
  }

  return state;
};

export default reducer;
