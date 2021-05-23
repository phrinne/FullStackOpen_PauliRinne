import anecdoteService from '../services/anecdotes'

const orderAnecdotes = (anecdotes) => anecdotes.sort((a, b) => b.votes - a.votes)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return orderAnecdotes(action.data)
    case 'NEW_ANECDOTE':
      return orderAnecdotes([...state, action.data])
    case 'VOTE': {
      const id = action.data.id
      const changedAnecdote = action.data
      const updatedAnecdotes = state.map(a => a.id !== id ? a : changedAnecdote )
      return orderAnecdotes(updatedAnecdotes)
    }
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = {...anecdote, votes: anecdote.votes+1}
    const votedAnecdoteFromBackend = await anecdoteService.update(anecdote.id, votedAnecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdoteFromBackend
    })
  }
}

export default anecdoteReducer