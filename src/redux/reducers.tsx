import { combineReducers } from 'redux';

import types from './types';

type Action = {
  type: string
}

const breakTime = (state = 300, action: Action) => {
  switch (action.type) {
    case types.INCREAMENT.BREAK:
      return state + 60;
    case types.DECREAMENT.BREAK:
      if (state <= 60) {
        return 60
      }
      return state - 60;
  }
  return state;
}


const sessionTime = (state = 1500, action: Action) => {
  switch (action.type) {
    case types.INCREAMENT.SESSION:
      return state + 60;
    case types.DECREAMENT.SESSION:
      if (state <= 60) {
        return 60
      }
      return state - 60;
  }
  return state;
}

const reducers = combineReducers({
  breakTime,
  sessionTime
});

export type RootState = {
  breakTime: number,
  sessionTime: number
}


export default reducers;