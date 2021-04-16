import React, { useState } from 'react'

const Person = ({person}) => (
  <div>{person.name} {person.number}</div>
)

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')

  const addPerson = (e) => {
    e.preventDefault()

    const alreadyExists = persons.map(person => person.name).indexOf(newName) !== -1
    if(alreadyExists) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const person = { name: newName, number: newNumber }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
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
      <div>
        filter shown with: <input value={filterText} onChange={handleFilterChange} />
      </div>
      <form onSubmit={addPerson}>
        <h2>Add a new</h2>
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
      <h2>Numbers</h2>
      {filteredPersons.map(person => <Person person={person} key={person.name}/>)}
    </div>
  )
}

export default App