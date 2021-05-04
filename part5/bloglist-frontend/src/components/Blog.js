import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    handleLike(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user.id
    })
  }

  const deleteBlog = () => {
    handleDelete(blog)
  }

  const details = () => {
    return (
      <>
        <div>
          {blog.url}
        </div>
        <div>
        likes {blog.likes}
          <button onClick={addLike}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded?'hide':'view'}</button>
      {isExpanded && details()}
    </div>
  )
}

export default Blog