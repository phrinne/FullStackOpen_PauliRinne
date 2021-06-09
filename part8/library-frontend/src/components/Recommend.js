import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';
import { ME, ALL_BOOKS } from '../queries/queries'
import BookList from './BookList'

const Recommend = ({ show }) => {
  const [favGenre, setFavGenre] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState([])

  const meResult = useQuery(ME)
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if(!meResult.loading) {
      setFavGenre(meResult.data.me.favoriteGenre)
      getBooks({ variables: { genre: favGenre } })
    }
  }, [meResult, favGenre, getBooks])

  useEffect(() => {
    if (booksResult.data) {
      setFilteredBooks(booksResult.data.allBooks)
    }
  }, [booksResult])

  if (!show) {
    return null
  }

  if (meResult.loading || booksResult.loading)  {
    return <div>loading...</div>
  }

  return (
    <>
    <h2>Recommendations</h2>
    <p>books in your favorite genre <strong>{favGenre}</strong></p>
    <BookList books={filteredBooks} />
    </>
  )
}

export default Recommend