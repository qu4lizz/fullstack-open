import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'
import Notification from './Notification'
import { initializeBlogs } from '../reducers/blogReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(login(username, password))
    dispatch(initializeBlogs())
  }

  return (
    <div>
      <h2 style={{ margin: 10 }}>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div style={{ margin: 10 }}>
            username
          <input placeholder="Type username" className="input input-sm input-bordered w-full max-w-xs"
            type="text"
            name="Username"
            id="username"
          />
        </div>
        <div style={{ margin: 10 }}>
            password
          <input placeholder="Type password" className="input input-sm input-bordered w-full max-w-xs"
            type="password"
            name="Password"
            id="password"
          />
        </div>
        <button className="btn btn-primary" style={{ margin: 10 }} type="submit" id="login-button">
            login
        </button>
      </form>
    </div>
  )
}

export default LoginForm