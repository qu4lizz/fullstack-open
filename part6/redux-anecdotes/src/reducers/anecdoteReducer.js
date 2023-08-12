import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    increaseVote(state, action) {
      return state.map(anecdote =>
        anecdote.id === action.payload.id ? action.payload : anecdote
      ).sort((a1, a2) => a2.votes - a1.votes)
    },
    pushAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { increaseVote, pushAnecdote , setAnecdotes} = anecdoteSlice.actions

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(asObject(content))
    dispatch(pushAnecdote(newAnecdote))
  }
}

export const updateVotes = anecdote => {
  return async dispatch => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1}
    dispatch(increaseVote(updatedAnecdote))
    console.log(await anecdoteService.update(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer