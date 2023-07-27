const mongoose = require('mongoose')

const argsLength = process.argv.length

const password = process.argv[2]

const url =
  `mongodb+srv://monty:${password}@cluster0.528z4hq.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({ 
  name: String, 
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (argsLength === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name, 
    number: number
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
else if (argsLength === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
else {
  console.log('wrong number of args')
}