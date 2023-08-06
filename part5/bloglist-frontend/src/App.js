import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setNewMessage = (msg, type) => {
    setMessageType(type)
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })


      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setNewMessage('Successful login', 'info')
    } catch (exception) {
      setNewMessage('Wrong credentials', 'error')
    }
    setUsername('')
    setPassword('')
  }

  const handleLogout = async () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    setNewMessage('You logged out', 'info')
  }

  const handleCreate = async ({ title, author, url }) => {
    try {
      const blog = {
        title: title,
        author: author,
        url: url,
        likes: 0
      }

      const newBlog = await blogService.create(blog)
      console.log(newBlog)
      blogFormRef.current.toggleVisibility()

      setBlogs(blogs.concat(newBlog))

      setNewMessage(`New blog ${title} created, author is ${author}`, 'info')
    } catch (error) {
      console.log('Error creating blog:', error)
      setNewMessage('An error occurred while creating the blog', 'error')
    }
  }

  const handleUpdate = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(blogToUpdate)
      console.log(updatedBlog)
      console.log(blogs)
      setNewMessage(`Blog ${blogToUpdate.title} was successfully updated`, 'info')
      setBlogs((prevBlogs) => prevBlogs.map((blog) => (blog.id !== blogToUpdate.id ? blog : updatedBlog)))
    } catch (exception) {
      setNewMessage(`Cannot update blog ${blogToUpdate.title}`, 'error')
    }
  }

  const handleDelete = async (blogToDelete) => {
    if (window.confirm(`Delete ${blogToDelete.title} ?`)) {
      try {
        await blogService.remove(blogToDelete.id)
        setNewMessage(`Successfully deleted ${blogToDelete.title}`, 'info')
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
      } catch (exception) {
        setNewMessage(`Cannot delete blog ${blogToDelete.title}`, 'error')
      }
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />
      {user !== null ? (
        <div>
          <p>
            {user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <h2>create new</h2>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <NewBlog handleCreate={handleCreate}/>
          </Togglable>
          <h2>your blogs</h2>
          {blogs
            .sort((b1, b2) => b2.likes - b1.likes)
            .map(blog => <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} handleDelete={handleDelete} creator={user.username}/>)
          }
        </div>
      ) : (
        <div>
          <h2>Log in to application</h2>
          <Login
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
      )}
    </div>
  )

}

export default App