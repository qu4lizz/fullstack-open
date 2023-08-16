import { useDispatch, useSelector } from 'react-redux'
import { addLikes } from '../reducers/blogReducer'
import { deleteBlogs } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const authUser = useSelector(state => state.authUser)

  if (!blog)
    return null

  const handleLike = () => {
    dispatch(addLikes(blog))
    dispatch(showNotification(`You liked "${blog.title}" !`, 'info', 5))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlogs(blog.id))
      dispatch(showNotification(`You deleted "${blog.title}" !`, 'info', 5))
    }
  }

  const showDelete = blog.user.username === authUser.username ? true : false

  return (
    <div className='blog'>
      <h2>{blog.title} by {blog.author}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>{blog.likes} likes<button id='like-button' onClick={handleLike}>like</button></div>
      <div>added by {blog.user.username}</div>
      {showDelete &&
          <button id='delete' onClick={handleDelete}>delete</button> }
    </div>
  )
}

export default Blog
