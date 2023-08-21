const blogsRouter = require('express').Router()
const { Blog, User } = require('../models')
const { findUserByToken } = require('../utils/middleware')
const { Op } = require('sequelize')


blogsRouter.get('/', async (request, response) => {
  let where = {}

  if (request.query.search) {
    where = {
      [Op.or]: [{
        title: {
          [Op.iLike]: `%${request.query.search}%`
        }
      },
      {
        author: {
          [Op.iLike]: `%${request.query.search}%`
        }
      }
      ]
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User
    },
    order: [
      ['likes', 'DESC'],
    ],
    where
  })
  response.json(blogs)
})

blogsRouter.post('/', findUserByToken, async (request, response) => {
  const user = request.user
  const blog = await Blog.create({ ...request.body, userId: user.id })
  return response.json(blog)
})

const blogFinder = async (request, response, next) => {
  request.blog = await Blog.findByPk(request.params.id)
  next()
}

blogsRouter.delete('/:id', blogFinder, findUserByToken, async (request, response) => {
  if (request.blog) {
    console.log(request.blog.userId, request.decodedToken.id)
    if (request.blog.userId === request.user.id)
    {
      await request.blog.destroy()
      return response.status(204).end()
    }
    return response.status(401).end()
  }
  return response.status(404).end()
})

blogsRouter.get('/:id', blogFinder, async (request, response) => {
  if (request.blog) {
    response.json(request.blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

module.exports = blogsRouter