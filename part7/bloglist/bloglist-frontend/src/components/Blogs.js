import React from 'react'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

const Blogs = ({ blogs, addBlog/*, likeBlog, removeBlog*/, blogFormRef }) => {
  return (
    <>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <br />
      {blogs.map(b => <Blog key={b.id} blog={b} />)}
    </>
  )
}
//handleLike={likeBlog} handleDelete={removeBlog}

export default Blogs