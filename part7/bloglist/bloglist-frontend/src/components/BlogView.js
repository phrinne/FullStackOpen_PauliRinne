import React from 'react'
import CommentForm from './CommentForm'
import { v4 as uuidv4 } from 'uuid'

const BlogView = ({ blog, handleLike, handleComment/*, handleDelete*/ }) => {

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

  const addComment = (comment) => {
    handleComment(blog.id, comment)
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
      <h3>comments</h3>
      <CommentForm createComment={addComment} />
      <ul>
        {blog.comments.map(c => <li key={uuidv4()}>{c}</li>)}
      </ul>
    </>
  )
}

/*<div>
  <button onClick={deleteBlog}>remove</button>
</div>*/

export default BlogView