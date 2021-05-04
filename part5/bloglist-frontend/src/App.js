import React, { useState, useEffect, useRef } from 'react'
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
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const blogFormRef = useRef()

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

  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleAuthorChange = (event) => setNewAuthor(event.target.value)
  const handleUrlChange = (event) => setNewUrl(event.target.value)

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
      setNotification(true, 'login failed')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs( blogs.concat(returnedBlog) )
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setNotification(false, `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setNotification(true, 'Blog addition failed')
    }
  }

  const setNotification = (isError, message) => {
    if(isError) {
      setErrorMessage(message)
      setTimeout(() => setErrorMessage(null), 3000)
    } else {
      setSuccessMessage(message) 
      setTimeout(() => setSuccessMessage(null), 3000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} isError={true} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password
            <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const blogsToShow = blogs.filter(b => b.user.username === user.username)

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={successMessage} isError={false} />
      <Notification message={errorMessage} isError={true} />
      <div>
        {user.name} logged-in
        <button type="button" onClick={handleLogout}>log out</button>
      </div>
      <br />

      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm handleSubmit={addBlog} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl} />
      </Togglable>
      <br />

      {blogsToShow.map(b => <Blog key={b.id} blog={b} />)}
    </div>
  )
}

export default App