import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, addLike, deleteBlog } from './reducers/blogReducer'
import { setUser, logout } from './reducers/userReducer'

import Notification from './components/Notification'
import Users from './components/Users'
import Blogs from './components/Blogs'

import loginService from './services/login'

import {
  BrowserRouter as Router,
  Switch, Route//, Link
} from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const notificationTime = 3

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('login failed', true, notificationTime))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const addBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, false, notificationTime))
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotification('Blog addition failed', true, 3))
    }
  }

  const likeBlog = async (id, likedBlog) => {
    try {
      dispatch(addLike(id, likedBlog))
      dispatch(setNotification(`Blog ${likedBlog.title} liked`, false, notificationTime))
    } catch (exception) {
      dispatch(setNotification('Blog like failed', true, notificationTime))
    }
  }

  const removeBlog = async (blogToDelete) => {
    if(window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      try {
        dispatch(deleteBlog(blogToDelete.id))
      } catch (exception) {
        dispatch(setNotification('Blog remove failed', true, notificationTime))
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification.value} isError={notification.isError} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input id='username' type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input id='password' type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </div>
    )
  }

  const blogsToShow = blogs.filter(b => b.user.username === user.username).sort((a, b) => b.likes - a.likes)

  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <Notification message={notification.value} isError={notification.isError} />
        <div>
          {user.name} logged-in
          <button type="button" onClick={handleLogout}>log out</button>
        </div>
        <br />
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Blogs blogs={blogsToShow} addBlog={addBlog} likeBlog={likeBlog} removeBlog={removeBlog} blogFormRef={blogFormRef} />
          </Route>
        </Switch>
      </div>
    </Router>
  )

  /*<Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Switch>
        <Route path="/notes">
          <Notes />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <div>
        <i>Note app, Department of Computer Science 2021</i>
      </div>
    </Router>*/

  /*{notes.map(note =>
      <li key={note.id}>
        <Link to={`/notes/${note.id}`}>{note.content}</Link>
      </li>
    )}*/

  /*<Route path="/notes/:id">
        <Note notes={notes} />
      </Route>*/

  /*import {
        // ...
        useParams
      } from "react-router-dom"

      const Note = ({ notes }) => {
        const id = useParams().id
        const note = notes.find(n => n.id === Number(id)) */
}

export default App