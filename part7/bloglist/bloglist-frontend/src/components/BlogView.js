import React from 'react'

const BlogView = ({ blog, handleLike/*, handleDelete*/ }) => {

  if (!blog) {
    return null
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

  /*const deleteBlog = () => {
    handleDelete(blog)
  }*/

  return (
    <>
      <h2>{blog.title}</h2>
      <div className='blogUrl'>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div className='blogLikes'>
        {blog.likes} likes
        <button onClick={addLike}>like</button>
      </div>
      <div>
        added by {blog.user.name}
      </div>
    </>
  )
}

/*<div>
  <button onClick={deleteBlog}>remove</button>
</div>*/

export default BlogView