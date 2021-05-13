import types from './types';

export const decrementBreak = () => ({
  type: types.DECREAMENT.BREAK
});

export const incrementBreak = () => ({
  type: types.INCREAMENT.BREAK
});

export const decrementSession = () => ({
  type: types.DECREAMENT.SESSION
});

export const incrementSession = () => ({
  type: types.INCREAMENT.SESSION
});