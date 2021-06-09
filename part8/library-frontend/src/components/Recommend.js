import React from 'react'
import { useQuery } from '@apollo/client';
import { ME, ALL_BOOKS } from '../queries/queries'
import BookList from './BookList'

const Recommend = ({ show }) => {
  const result = useQuery(ME)
  const booksResult = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (result.loading || booksResult.loading)  {
    return <div>loading...</div>
  }

  const genre = result.data.me.favoriteGenre
  const books = booksResult.data.allBooks
  const filteredBooks = books.filter(b => b.genres.includes(genre))

  return (
    <>
    <h2>Recommendations</h2>
    <p>books in your favorite genre <strong>{genre}</strong></p>
    <BookList books={filteredBooks} />
    </>
  )
}

export default Recommend