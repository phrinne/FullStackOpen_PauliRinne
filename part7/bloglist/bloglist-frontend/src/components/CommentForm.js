import React, { useState } from 'react'

const CommentForm = ({ createComment }) => {
  const [newComment, setNewComment] = useState('')

  const handleCommentChange = (event) => setNewComment(event.target.value)

  const addComment = (event) => {
    event.preventDefault()
    createComment(newComment)
    setNewComment('')
  }

  return (
    <form onSubmit={addComment}>
      <input value={newComment} onChange={handleCommentChange} id='comment' />
      <button id='create-comment-button' type="submit">add comment</button>
    </form>
  )
}

export default CommentForm