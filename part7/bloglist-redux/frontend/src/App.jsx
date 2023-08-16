import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Menu from './components/Menu'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/authReducer'
import { initializeAllUsers } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import { Route, Routes, useMatch } from 'react-router-dom'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const authUser = useSelector(state => state.authUser)
  const users = useSelector(state => state.users.slice().sort((u1, u2) => u2.blogs.length - u1.blogs.length))
  const blogs = useSelector(state => state.blogs.slice())

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeAllUsers())
  }, [dispatch])

  const matchUser = useMatch('/users/:id')

  let userId = null
  if (matchUser !== null)
    userId = matchUser.params.id

  const user = userId
    ? users.find(u => u.id === userId)
    : null

  const matchBlog = useMatch('/blogs/:id')

  let blogId = null
  if (matchBlog !== null)
    blogId = matchBlog.params.id

  const blog = blogId
    ? blogs.find(u => u.id === blogId)
    : null

  return (
    <div>
      {authUser === null ? (
        <div>
          <LoginForm />
        </div>
      ) : (
        <div>
          <Menu />
          <h1 style={{ margin: 10 }}>BLOGS</h1>
          <Notification />
          <Routes>
            <Route path="/" element={
              <>
                <Togglable buttonLabel="create new blog" ref={blogFormRef}>
                  <NewBlog />
                </Togglable><BlogList />
              </> } />
            <Route path='/users' element={ <UserList /> } />
            <Route path='/users/:id' element={ <User user={user} /> } />
            <Route path='/blogs/:id' element={ <Blog blog={blog} />} />
          </Routes>
        </div>
      )}
    </div>
  )

}

export default App