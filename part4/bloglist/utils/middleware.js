const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

/*const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}*/

/*const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}*/

const tokenExtractor = (request, response, next) => {
  request.token = null
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const { method } = request
  if (method === 'POST' || method === 'DELETE') {
    request.user = null
    if (!request.token) {
      return response.status(401).json({ error: 'token missing' })
    }
    const decodedToken = jwt.verify(request.token, process.env.TOKENSECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    request.user = await User.findById(decodedToken.id)
  }

  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }

  /*if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }*/

  next(error)
}

module.exports = {
  //requestLogger,
  //unknownEndpoint,
  tokenExtractor,
  userExtractor,
  errorHandler
}