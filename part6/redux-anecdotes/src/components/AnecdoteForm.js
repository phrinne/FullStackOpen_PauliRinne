import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote, setNotification } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log('add', content)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`Anecdote ${content} created`))
    setTimeout(() => dispatch(setNotification(null)), 3000)
  }

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={newAnecdote}>
      <div><input name='anecdote' /></div>
      <button type='submit'>create</button>
    </form>
    </>
  )
}

export default AnecdoteForm