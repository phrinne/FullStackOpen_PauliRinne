import React, { useState } from 'react'
import Button from '../styles/buttonStyles'
import Input from '../styles/inputStyles'

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
        title:<br/>
        <Input value={newTitle} onChange={handleTitleChange} id='title' />
      </div>
      <div>
          author:<br/>
        <Input value={newAuthor} onChange={handleAuthorChange} id='author' />
      </div>
      <div>
        url:<br/>
        <Input value={newUrl} onChange={handleUrlChange} id='url' />
      </div>
      <Button id='create-blog-button' type="submit">create</Button>
    </form>
  )
}

export default BlogForm