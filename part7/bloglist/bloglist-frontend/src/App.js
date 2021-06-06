import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, addLike, addComment/*, deleteBlog*/ } from './reducers/blogReducer'
import { setUser, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import BlogView from './components/BlogView'

import loginService from './services/login'

import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)
  const users = useSelector(state => state.users)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const userMatch = useRouteMatch('/users/:id')
  const userFromMatch = userMatch?users.find(u => u.id === userMatch.params.id):null
  const blogMatch = useRouteMatch('/blogs/:id')
  const blogFromMatch = blogMatch?blogs.find(b => b.id === blogMatch.params.id):null

  const notificationTime = 3

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

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

  const commentBlog = async (id, comment) => {
    try {
      dispatch(addComment(id, comment))
      dispatch(setNotification('Comment added', false, notificationTime))
    } catch (exception) {
      dispatch(setNotification('Blog comment failed', true, notificationTime))
    }
  }

  /*const removeBlog = async (blogToDelete) => {
    if(window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`)) {
      try {
        dispatch(deleteBlog(blogToDelete.id))
      } catch (exception) {
        dispatch(setNotification('Blog remove failed', true, notificationTime))
      }
    }
  }*/

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
  const padding = { padding: 5 }

  return (
    <div>
      <div style={{ backgroundColor: 'lightgrey', padding: 5 }}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <span style={padding}>{user.name} logged-in</span>
        <button style={padding} type="button" onClick={handleLogout}>log out</button>
      </div>
      <h2>blog app</h2>
      <Notification message={notification.value} isError={notification.isError} />
      <br />
      <Switch>
        <Route path="/users/:id">
          <User user={userFromMatch} />
        </Route>
        <Route path="/blogs/:id">
          <BlogView blog={blogFromMatch} handleLike={likeBlog} handleComment={commentBlog} />
        </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/">
          <Blogs blogs={blogsToShow} addBlog={addBlog} blogFormRef={blogFormRef} />
        </Route>
      </Switch>
    </div>
  )
}
//likeBlog={likeBlog} removeBlog={removeBlog}

export default App