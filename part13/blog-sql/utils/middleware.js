const logger = require('./logger')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const { User } = require('../models')
const validateSession = require('./validateSession')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const findUserByToken = async (req, res, next) => {
  const token = tokenExtractor(req)
  const decodedToken = jwt.verify(token, SECRET)
  req.user = await User.findByPk(decodedToken.id)
  const id = req.user.id
  const validSession = await validateSession({ id, token })
  if (!decodedToken.id || !validSession) {
    throw Error('Session not valid!')
  }
  if(req.user.disabled){
    throw Error('User disabled!')
  }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  findUserByToken
}