import React from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries/queries'
import BookList from './BookList'

const Recommend = ({ show, favGenre }) => {
  const { loading, data } = useQuery(ALL_BOOKS, { variables: { genre: favGenre } })

  if (!show) {
    return null
  }

  if (loading)  {
    return <div>loading...</div>
  }
  
  const filteredBooks = data.allBooks

  return (
    <>
    <h2>Recommendations</h2>
    <p>books in your favorite genre <strong>{favGenre}</strong></p>
    <BookList books={filteredBooks} />
    </>
  )
}

export default Recommend