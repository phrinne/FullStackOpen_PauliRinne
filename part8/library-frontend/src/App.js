import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import { ME, BOOK_ADDED, ALL_BOOKS } from './queries/queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const [favGenre, setFavGenre] = useState(null)
  const [getMe, meResult] = useLazyQuery(ME)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map(b => b.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({ query: ALL_BOOKS, data: { allBooks : dataInStore.allBooks.concat(addedBook) } })
    }  
  }
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData.data.bookAdded)
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

  useEffect(() => {
    if(meResult.data) {
      setFavGenre(meResult.data.me.favoriteGenre)
    }
  }, [meResult])

  const login = (token) => {
    setToken(token)
    localStorage.setItem('library-user-token', token)
    getMe()
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={() => logout()}>log out</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
      </div>
      <Authors show={page === 'authors'} loggedIn={token !== null} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} favGenre={favGenre} />
      <Recommend show={page === 'recommend'} favGenre={favGenre} />
      <Login show={page === 'login'} handleLogin={login} setPage={setPage} />
    </div>
  )
}

export default App