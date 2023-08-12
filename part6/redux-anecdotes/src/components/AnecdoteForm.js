import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const [input, setInput] = useState('')

    const dispatch = useDispatch()

    const handleInputChange = event => {
      setInput(event.target.value)
    }

    const handleNewAnecdote = event => {
			event.preventDefault()
			dispatch(createAnecdote(input))
			dispatch(showNotification('You\'ve added a new anecdote', 5))
			setInput('')
		}

    return (
        <div>
      		<h2>create new</h2>
					<form onSubmit={handleNewAnecdote}>
						<div><input type="text" value={input} onChange={handleInputChange}/></div>
						<button type="submit">create</button>
          </form>
        </div>
    )
}

export default AnecdoteForm