import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const notificationTime = 3

  useEffect(() => {
    blogService.getAll().then(bs => {
      setBlogs(bs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))
    } catch (exception) {
      dispatch(setNotification('login failed', true, notificationTime))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs( blogs.concat(returnedBlog) )
      dispatch(setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, false, notificationTime))
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotification('Blog addition failed', true, 3))
    }
  }

  const addLike = async (id, likedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, likedBlog)
      setBlogs(blogs.map(b => b.id === id ? returnedBlog:b))
      dispatch(setNotification(`Blog ${returnedBlog.title} liked`, false, notificationTime))
    } catch (exception) {
      dispatch(setNotification('Blog like failed', true, notificationTime))
    }
  }

  const removeBlog = async (blogToDelete) => {
    if(window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      try {
        const response = await blogService.remove(blogToDelete.id)
        console.log(response)
        setBlogs(blogs.filter(b => b.id !== blogToDelete.id))
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
    <div>
      <h2>blogs</h2>
      <Notification message={notification.value} isError={notification.isError} />
      <div>
        {user.name} logged-in
        <button type="button" onClick={handleLogout}>log out</button>
      </div>
      <br />

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <br />

      {blogsToShow.map(b => <Blog key={b.id} blog={b} handleLike={addLike} handleDelete={removeBlog} />)}
    </div>
  )
}

export default App