import React, { useState, useEffect } from 'react'
import dbService from './services/persons'

const Notification = ({message, isError}) => {
  if (message === null) {
    return null
  } else {
    const className = isError?'error':'notification'
    return (
      <div className={className}>
        {message}
      </div>
    )
  }
}

const Filter = ({filterText, handleFilterChange}) => (
  <div>
    filter shown with: <input value={filterText} onChange={handleFilterChange} />
  </div>
)

const PersonForm = ({onSubmit, newName, newNumber, handleNameChange, handleNumberChange}) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
        <button type="submit">add</button>
    </div>
  </form>
)

const Person = ({person, deletePerson}) => (
  <div>{person.name} {person.number} <button onClick={deletePerson}>delete</button></div>
)

const Persons = ({persons, deletePerson}) => (
  <div>
    {persons.map(person => <Person person={person} key={person.id} deletePerson={() => deletePerson(person)} />)}
  </div>
)

const App = () => {
  const [ persons, setPersons ] = useState( [] ) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    dbService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (e) => {
    e.preventDefault()

    const alreadyExists = persons.map(person => person.name).indexOf(newName) !== -1
    if(alreadyExists) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        updateNumberOf(persons.find(person => person.name === newName), newNumber)
      }
      return
    }

    const newPerson = { name: newName, number: newNumber }
    dbService.create(newPerson)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      clearInputs()
    })

    setSuccessMessage(`Added ${newPerson.name}`) 
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  const deletePerson = (personToDelete) => {
    if(window.confirm(`Delete ${personToDelete.name}?`)) {
      dbService.remove(personToDelete.id)//.then(response => console.log(response))
      setPersons(persons.filter(person => person.id !== personToDelete.id))
    }
  }

  const updateNumberOf = (person, newNumber) => {
    dbService.update(person.id, { name: person.name, number: newNumber })
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        setSuccessMessage(`Updated number of ${returnedPerson.name}`) 
        setTimeout(() => setSuccessMessage(null), 3000)
      })
      .catch(error => {
        setErrorMessage(`Information of ${person.name}' was already removed from server`)
        setTimeout(() => setErrorMessage(null), 3000)
        setPersons(persons.filter(p => p.id !== person.id))
      })

    clearInputs()
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setFilterText(e.target.value)
  }

  const clearInputs = () => {
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} isError={false} />
      <Notification message={errorMessage} isError={true} />
      <Filter filterText={filterText} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App