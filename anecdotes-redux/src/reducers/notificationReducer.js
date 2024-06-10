import { createSlice } from '@reduxjs/toolkit';

const initialState = 'Notifications logged here';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return 'Notifications logged here';
    }
  }
});

let timeoutId;

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch(notificationSlice.actions.setNotification(message));
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      dispatch(notificationSlice.actions.clearNotification());
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
