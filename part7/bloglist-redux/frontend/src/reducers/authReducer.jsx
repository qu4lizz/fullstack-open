import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { showNotification } from './notificationReducer'

const authSlice = createSlice({
  name: 'auth',
  initialState: [],
  reducers: {
    initUser(state, action){
      return action.payload
    },
    loginUser(state, action){
      return action.payload
    },
    logoutUser(){
      return null
    }
  }
})

export const { initUser, loginUser, logoutUser } = authSlice.actions

export const initializeUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(initUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(loginUser(user))
      dispatch(showNotification(`${user.username} successfully logged in`, 5))
    } catch (exception) {
      dispatch(showNotification('Wrong username or password', 5))
    }}
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logoutUser())
    dispatch(showNotification('You logged out', 'info', 5))
  }
}

export default authSlice.reducer
