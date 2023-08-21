const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

const { User, Blog } = require('../models')

usersRouter.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  try {
    const { username, name, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const savedUser = await User.create({
      username: username,
      name: name,
      passwordHash: passwordHash,
    })

    res.status(201).json(savedUser)
  } catch(error) {
    const message = error.message
    return res.status(400).json({ message })
  }
})

usersRouter.get('/:id', async (req, res) => {
  let where = {}

  if (req.query.read !== undefined) {
    where.read = req.query.read
  }
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ['passwordHash'] },
    include: [{
      model: Blog,
      as: 'readings',
      attributes: ['id', 'author', 'title', 'url', 'likes', 'year'],
      through: {
        as: 'reading_list',
        attributes: ['id', 'read'],
        where
      }
    }],
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

usersRouter.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findByPk(userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    await user.destroy()
    res.status(204).end()
  } catch(error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
})


usersRouter.put('/:username', async (req, res) => {
  const success = await User.update({ username: req.body.username }, {
    where: {
      username: req.params.username
    }
  })
  success ? res.status(200) : res.status(404).end()
})

module.exports = usersRouter