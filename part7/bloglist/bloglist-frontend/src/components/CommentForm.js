import React, { useState } from 'react'
import { SmallButton } from '../styles/buttonStyles'
import Input from '../styles/inputStyles'

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
      <Input value={newComment} onChange={handleCommentChange} id='comment' />
      <SmallButton id='create-comment-button' type="submit">add comment</SmallButton>
    </form>
  )
}

export default CommentForm