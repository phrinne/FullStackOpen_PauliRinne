import React, { useState, useEffect } from 'react'
import dbService from './services/persons'

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

  useEffect(() => {
    dbService.getAll().then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (e) => {
    e.preventDefault()

    const alreadyExists = persons.map(person => person.name).indexOf(newName) !== -1
    if(alreadyExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const person = { name: newName, number: newNumber }
    dbService.create(person)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
  }

  const deletePerson = (personToDelete) => {
    if(window.confirm(`Delete ${personToDelete.name}?`)) {
      dbService.remove(personToDelete.id)//.then(response => console.log(response))
      setPersons(persons.filter(person => person.id !== personToDelete.id))
    }
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

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
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