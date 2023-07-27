const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phoneNumberValidator = function (value) {
  if (value.length < 8) {
    return false;
  }

  const parts = value.split('-');
  if (parts.length !== 2) {
    return false;
  }

  const firstPart = parts[0];
  if (firstPart.length !== 2 && firstPart.length !== 3) {
    return false;
  }

  if (!/^\d+$/.test(firstPart)) {
    return false;
  }

  const secondPart = parts[1];
  if (!/^\d+$/.test(secondPart)) {
    return false
  }

  return true
}

const personSchema = new mongoose.Schema({ 
    name: {
      type: String,
      minLength: 3,
    }, 
    number: {
      type: String,
      validate: {
        validator: phoneNumberValidator,
        message:
          'Invalid phone number format. Phone number must be in the format of two parts separated by \'-\', with the first part having two or three numbers, and the second part consisting of numbers only.',
      }
    }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)