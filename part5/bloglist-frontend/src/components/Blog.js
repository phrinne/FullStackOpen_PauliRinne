import React, { useState } from 'react'

const Blog = ({blog}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const details = () => (
    <>
    <div>{blog.url}</div>
    <div>
      likes {blog.likes}
      <button>like</button>
      </div>
    <div>{blog.user.name}</div>
    </>
  )

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded?'hide':'view'}</button>
      {isExpanded && details()}
    </div>
  )
}

export default Blog