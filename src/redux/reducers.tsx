import { combineReducers } from 'redux';

import types from './types';

type Action = {
  type: string
}

const breakTime = (state = 5, action: Action) => {
  switch (action.type) {
    case types.INCREAMENT.BREAK:
      return state + 5;
    case types.DECREAMENT.BREAK:
      return state - 5;
  }
  return state;
}


const sessionTime = (state = 5, action: Action) => {
  switch (action.type) {
    case types.INCREAMENT.SESSION:
      return state + 5;
    case types.DECREAMENT.SESSION:
      return state - 5;
  }
  return state;
}

const reducers = combineReducers({
  breakTime,
  sessionTime
});


export default reducers;