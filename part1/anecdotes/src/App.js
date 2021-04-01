/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))//useState([0, 0, 0, 0, 0, 0])

  const handleNext = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  const handleVote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
  }

  const getMostVoted = () => {
    let mostVoted = 0;
    for(let i = 1; i < points.length; i++) {
      if(points[i] > points[mostVoted]) {
        mostVoted = i;
      }
    }
    return mostVoted;
  }

  return (
    <>
    <h1>Anecdote of the day</h1>
    <div>
      {anecdotes[selected]}<br />
      has {points[selected]} votes
    </div>
    <button onClick={handleVote}>vote</button>
    <button onClick={handleNext}>next anecdote</button>
    <h1>Anecdote with most votes</h1>
    <div>
      {anecdotes[getMostVoted()]}<br />
      has {points[getMostVoted()]} votes
    </div>
    </>
  )
}

export default App