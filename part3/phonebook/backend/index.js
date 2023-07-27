const express = require('express')
const morgan = require('morgan')
const static = require('static')
require('dotenv').config()

const app = express()

const Person = require('./models/person')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })

  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(express.json())
app.use(morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }))
app.use(express.static('build'))

let people = []

app.get('/api/people', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
}) 

app.get('/info', (request, response) => {
  Person.find({}).then(people => {
    const length = people.length
    const date = new Date()
    response.send(
        `<div><p>Phonebook has info for ${length} people</p><p>${date}</p></div>`
    )
  })
}) 

app.get('/api/people/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    }
    else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.post('/api/people', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json( {error: 'name or number is missing'} )
    }

    const person = new Person({
        name: body.name, 
        number: body.number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/people/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' }) 
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/people/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})