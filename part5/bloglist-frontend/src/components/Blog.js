import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  }
  const [blog, setBlogObject] = useState(props.blog)
  const [extended, setExtended] = useState(false)
  const buttonLabel = extended ? 'hide' : 'view'

  const handleClick = () => setExtended(!extended)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    props.handleUpdate(updatedBlog)
    setBlogObject(updatedBlog)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} by {blog.author}
        <button onClick={handleClick}>{buttonLabel}</button>
      </div>
      {extended && (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button id='like-button' onClick={handleLike}>like</button></div>
          <div>{blog.user.username}</div>
          {props.creator === blog.user.username &&
          <button id='delete' onClick={function() { props.handleDelete(blog) }}>delete</button> }
        </div>
      )}
    </div>
  )
}

export default Blog
