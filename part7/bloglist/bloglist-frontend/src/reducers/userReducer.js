import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'SET_USER':
    return action.user
  default:
    return state
  }
}

export const setUser = (user) => {
  blogService.setToken(user.token)
  return {
    type: 'SET_USER',
    user
  }
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogsappUser')
  blogService.setToken(null)
  return {
    type: 'SET_USER',
    user: null
  }
}

export default userReducer