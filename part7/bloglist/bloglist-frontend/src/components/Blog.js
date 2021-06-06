import React/*, { useState }*/ from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledBlog = styled.div`
  padding: 1rem;
  border: 'solid';
  border: 1px solid;
  margin-bottom: 0.5rem;
`

const Blog = ({ blog/*, handleLike, handleDelete*/ }) => {
  //const [isExpanded, setIsExpanded] = useState(false)

  /*const addLike = () => {
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
        <div className='blogUrl'>
          {blog.url}
        </div>
        <div className='blogLikes'>
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
  }*/

  return (
    <StyledBlog className='blogitem'>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </StyledBlog>
  )
}
//<button onClick={() => setIsExpanded(!isExpanded)}>{isExpanded?'hide':'view'}</button>
//{isExpanded && details()}

export default Blog