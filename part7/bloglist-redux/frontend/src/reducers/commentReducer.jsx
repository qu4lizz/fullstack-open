import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const commentSlice = createSlice({
  name: 'comment',
  initialState: [],
  reducers: {
    setComment(state, action){
      return action.payload
    },
    appendComment(state, action){
      state.push(action.payload)
    }
  }
})

export const { setComment, appendComment } = commentSlice.actions

export const initializeAllComments = (blogId) => {
  return async dispatch => {
    const comments = await blogService.getComment(blogId)
    dispatch(setComment(comments))
  }
}

export const createComments = (blogId, content) => {
  return async dispatch => {
    const newComment = await blogService.postComment(blogId, content)
    dispatch(appendComment(newComment))
  }
}

export default commentSlice.reducer