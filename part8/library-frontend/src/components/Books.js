import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries/queries'

const Books = (props) => {
  const [genre, setGenre] = useState('all genres')
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const books = result.data.allBooks
  console.log(books)

  let genres = ['all genres']
  for(const b of books) {
    for(const g of b.genres) {
      if(!genres.includes(g)) {
        genres = [...genres, g]
      }
    }
  }

  const filteredBooks = (genre === 'all genres')?books:books.filter(b => b.genres.includes(genre))

  return (
    <div>
      <h2>books</h2>
      <p>in genre <strong>{genre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filteredBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
    </div>
  )
}

export default Books