import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleAuthorChange = (event) => setNewAuthor(event.target.value)
  const handleUrlChange = (event) => setNewUrl(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
                title:
        <input value={newTitle} onChange={handleTitleChange} id='title' />
      </div>
      <div>
                author:
        <input value={newAuthor} onChange={handleAuthorChange} id='author' />
      </div>
      <div>
                url:
        <input value={newUrl} onChange={handleUrlChange} id='url' />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm