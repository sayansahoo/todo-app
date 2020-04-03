import * as actionTypes from "./actionTypes";

export const actions = {
  setAction: Todo => ({
    type: actionTypes.SET_ACTION,
    Todo
  }),
  setDate: date => ({
    type: actionTypes.SET_DATE,
    date
  }),
  setData: todoData => ({
    type: actionTypes.SET_TODO_DATA,
    todoData
  })
};

const initialState = {
  Todo: "",
  date: "",
  todoData: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTION: {
      return {
        ...state,
        Todo: action.Todo
      };
    }
    case actionTypes.SET_DATE: {
      return {
        ...state,
        date:action.date
      };
    }
    case actionTypes.SET_TODO_DATA: {
      return {
       ...state,
       todoData: action.todoData
      }
    }
  }

  return state;
};

export default reducer;
