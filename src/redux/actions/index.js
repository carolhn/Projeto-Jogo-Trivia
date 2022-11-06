export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const saveUserData = (payload) => ({ type: SAVE_USER_DATA, payload });
export const updateScore = (payload) => ({ type: 'UPDATE_SCORE', payload });
export const resetScore = (payload) => ({ type: 'RESET_SCORE', payload });
