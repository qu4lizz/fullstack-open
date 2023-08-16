import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = ( ) => {
  const blogs = useSelector(state => state.blogs.slice().sort((a,b) => b.likes - a.likes))

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    margin: 10
  }

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link className="link link-secondarys" style={{ padding: 10 }} key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList