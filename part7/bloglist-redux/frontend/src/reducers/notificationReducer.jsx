import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: null,
  },
  reducers: {
    setNotification(state, action) {
      console.log(action.payload)
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    },
    clearNotification() {
      return {
        message: null,
        type: null,
      }
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, type, seconds) => {
  return async dispatch => {
    dispatch(setNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer