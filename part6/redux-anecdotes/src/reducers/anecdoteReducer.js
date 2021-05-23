/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]*/

//const getId = () => (100000 * Math.random()).toFixed(0)

/*const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}*/

//const initialState = anecdotesAtStart.map(asObject)//{anecdotes: anecdotesAtStart.map(asObject), notification: null}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [...state, action.data]//{...state, anecdotes: [...state.anecdotes, action.data]}
    case 'VOTE': {
      /*const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const changedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes+1 
      }*/
      const id = action.data.id
      const changedAnecdote = action.data
      const orderedAnecdotes = state.map(a => a.id !== id ? a : changedAnecdote ).sort((a, b) => b.votes - a.votes)
      return orderedAnecdotes
    }
    default:
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

/*export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}*/
export const addVote = (data) => {
  return {
    type: 'VOTE',
    data
  }
}

export default anecdoteReducer