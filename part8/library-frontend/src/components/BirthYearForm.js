import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTHYEAR } from '../queries/queries'

const BirthYearForm = ({ authorNames }) => {
  const [name, setName] = useState(authorNames[0])
  const [year, setYear] = useState('')
  const [ changeBirthYear, result ] = useMutation(EDIT_BIRTHYEAR)

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('person not found')
    }
  }, [result.data])

  const submit = (event) => {
    event.preventDefault()

    changeBirthYear({ variables: { name, year: parseInt(year) } })

    setName('')
    setYear('')
  }

  return (
    <>
    <h3>Set birthyear</h3>
    <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authorNames.map(a => <option value={a} key={a}>{a}</option>)}
        </select>
        <div>
          born <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </>
  )
}
/*<div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>*/
export default BirthYearForm