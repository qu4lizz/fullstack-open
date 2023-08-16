const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user')

  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  console.log('authorizationToken', authorization)
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(404).json({ error: 'No users found in the database.' })
    }

    const blogData = {
      ...request.body,
      user: user._id,
    }

    const blog = new Blog(blogData)
    await blog.save()

    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    const res = await blog.populate('user')
    response.status(201).json(res)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(404).json({ error: 'No users found in the database.' })
  }

  const blog = await Blog.findById(request.params.id).populate('user')
  if (blog.user.username !== user.username) {
    return response.status(401).json({ error: 'Cannot delete' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blogToUpdate = await Blog.findById(request.params.id)

  if (blogToUpdate.user._id.toString() === user._id.toString()) {
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      comments: body.comments,
    }

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .populate('user')

      response.json(updatedBlog.toJSON())
    } catch (exception) {
      next(exception)
    }
  } else {
    return response.status(401).json({ error: 'Unauthorized' })
  }
})


module.exports = blogsRouter