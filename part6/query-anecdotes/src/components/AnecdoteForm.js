import { useQueryClient, useMutation } from "react-query"
import { createAnecdote } from "../services/requests"
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))

      dispatch({ type: 'SHOW', payload: `You've added: ${newAnecdote.content}` })
      setTimeout(() => { dispatch({ type: 'HIDE' }) }, 5000)
    },
    onError: () => {
      dispatch({ type: 'SHOW', payload: `Must be 5 character long` })
      setTimeout(() => { dispatch({ type: 'HIDE' }) }, 5000)
    }
  })

  const getId = () => (100000 * Math.random()).toFixed(0)

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, id: getId(), votes: 0})

  }


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
