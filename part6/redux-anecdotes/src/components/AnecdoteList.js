import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import Notification from './Notification'
import Filter from './Filter'

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
  const filter = useSelector(state => state.filter)

  const handleVote = async (a) => {
    dispatch(addVote(a))
    dispatch(setNotification(`Voted for ${a.content}`, 5))
  }

  const filteredAnecdotes = filter?anecdotes.filter(a => a.content.includes(filter)):anecdotes
  
  return(
    <>
    <Notification />
    <Filter />
    {filteredAnecdotes.map(a => <Anecdote key={a.id} anecdote={a} handleVote={() => handleVote(a)} />)}
    </>
  )
}

export default AnecdoteList