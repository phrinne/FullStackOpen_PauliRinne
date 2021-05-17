import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote, setNotification } from '../reducers/anecdoteReducer'
import Notification from './Notification'

const Anecdote = ({ anecdote, handleVote }) => {
  return(
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const handleVote = (a) => {
    dispatch(addVote(a.id))
    dispatch(setNotification(`Voted for ${a.content}`))
    setTimeout(() => dispatch(setNotification(null)), 3000)
  }
  
  return(
    <>
    <Notification />
    {anecdotes.map(a => <Anecdote key={a.id} anecdote={a} handleVote={() => handleVote(a)} />)}
    </>
  )
}

export default AnecdoteList