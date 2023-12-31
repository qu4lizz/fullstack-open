const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')

const { SECRET } = require('../utils/config')
const { User, Session } = require('../models')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  if ((user.disabled)) {
    return response.status(401).json({
      error: 'User disabled!'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }
  const token = jwt.sign(userForToken, SECRET)

  await Session.destroy({
    where: {
      userId: user.id
    }
  })
  await Session.create({
    userId: user.id,
    token: token,
  })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter