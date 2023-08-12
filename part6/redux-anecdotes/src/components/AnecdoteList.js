import { useSelector, useDispatch } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const anecdotes = useSelector(state => {
		return state.anecdotes.filter(a => a.content.includes(state.filter))
	})
  const dispatch = useDispatch()

  const handleVote = anecdote => {
    dispatch(updateVotes(anecdote))
		dispatch(showNotification(`You voted for ${anecdote.content}`, 5))
  }

	return (
		<div>
			{anecdotes.sort((a1, a2) => a2.votes - a1.votes).map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default AnecdoteList