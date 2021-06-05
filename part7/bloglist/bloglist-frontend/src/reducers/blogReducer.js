import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE': {
    const id = action.data.id
    const changedBlog = action.data
    const updatedBlogs = state.map(b => b.id !== id ? b : changedBlog )
    return updatedBlogs
  }
  case 'REMOVE':
    return state.filter(b => b.id !== action.id)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const addLike = (id, likedBlog) => {
  return async dispatch => {
    const likedBlogFromBackend = await blogService.update(id, likedBlog)
    dispatch({
      type: 'LIKE',
      data: likedBlogFromBackend
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      id
    })
  }
}

export default blogReducer