import { useState, useEffect } from 'react'
import PersonForm from './component/PersonForm'
import Filter from './component/Filter'
import Persons from './component/Persons'
import personsService from './services/persons'
import Notification from './component/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterInput, setFilterInput] = useState('')
  const [idCount, setIdCount] = useState(0)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  const personFilter = persons.filter(elem => elem.name.includes(filterInput))

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)

        let maxId = 0;
        initialPersons.forEach(person => {
          if (person.id > maxId) {
            maxId = person.id
          }
        })

        setIdCount(maxId + 1)
      })
  }, [])

  const remove = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(id)
        .catch(err => {
          alert('can\'t delete')
        })
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  const setNewMessage = (msg, type) => {
    setMessageType(type)
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addName = (event) => {
    event.preventDefault()
    setIdCount()
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with new one?`)) {
        const updatedPerson = { ...existingPerson, number: newPhone }

        personsService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            const updatedIndex = persons.findIndex(person => person.id === existingPerson.id)

            const updatedPersons = [...persons]
            updatedPersons[updatedIndex] = returnedPerson

            setPersons(updatedPersons)
            setNewName('')
            setNewPhone('')
            setNewMessage(`Person ${returnedPerson.name} got number updated to ${returnedPerson.number}`, 'info')
          })
          .catch(error => {
            console.error("Error updating person:", error)
            setNewMessage(`Information of ${updatedPerson.name} has been removed from the server`, 'error')
            setPersons(persons.filter(p => p.id !== updatedPerson.id))
          });
      }
    } else {
      setIdCount(idCount + 1)
      const personObject = { name: newName, number: newPhone, id: idCount }
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')
        })
      setNewMessage(`Added new person ${personObject.name}`, 'info')

    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }
  const handleFilterInputChange = (event) => {
    setFilterInput(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter input={filterInput} handle={handleFilterInputChange} />
      <h2>Add a new</h2>
      <Notification message={message} type={messageType}/>
      <PersonForm addName={addName}
        newName={newName}
        newPhone={newPhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange} />
      <h2>Numbers</h2>
      <Persons personFilter={personFilter} del={remove} />
    </div>
  )
}

export default App