import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTHYEAR } from '../queries/queries'

const BirthYearForm = (props) => {
  const [name, setName] = useState('')
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
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          boorn <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </>
  )
}

export default BirthYearForm