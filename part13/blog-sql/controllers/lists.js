const listsRouter = require('express').Router()
const { List } = require('../models')
const { findUserByToken } = require('../utils/middleware')

listsRouter.post('/', async (request, response) => {
  const list = await List.create(request.body)
  response.json(list)
})

listsRouter.put('/:id', findUserByToken, async (req, res) => {
  const { read } = req.body
  const id = req.params.id

  const list = await List.findByPk(id)

  const currentId = req.user.id
  const listUserId = list.toJSON().userId
  if (!(currentId === listUserId)) {
    throw Error('You can only update your own reading list!')
  }
  const updatedList = await List.update({ read: read }, {
    where: {
      id: id
    }
  })
  res.json(updatedList)
})

module.exports = listsRouter