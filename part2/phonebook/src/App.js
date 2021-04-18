import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const Person = ({person}) => (
  <div>{person.name} {person.number}</div>
)

const Persons = ({persons}) => (
  <div>
    {persons.map(person => <Person person={person} key={person.name}/>)}
  </div>
)

const App = () => {
  const [ persons, setPersons ] = useState( [] ) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')
  const dbUrl = 'http://localhost:3001/persons'

  useEffect(() => {
    axios
      .get(dbUrl)
      .then(response => setPersons(response.data))
  }, [])

  const addPerson = (e) => {
    e.preventDefault()

    const alreadyExists = persons.map(person => person.name).indexOf(newName) !== -1
    if(alreadyExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const person = { name: newName, number: newNumber }
    axios
    .post(dbUrl, person)
    .then(response => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
      console.log(response.data);
    })
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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App