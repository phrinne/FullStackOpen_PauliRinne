//import loginService from '../services/login'
import blogService from '../services/blogs'
//import { useDispatch } from 'react-redux'
//import { setNotification } from '../reducers/notificationReducer'

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

/*export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        user
      })
    } catch(exception) {
      //const dispatch = useDispatch()
      //dispatch(setNotification('login failed', true, 3))
    }
  }
}*/

export const logout = () => {
  window.localStorage.removeItem('loggedBlogsappUser')
  blogService.setToken(null)
  return {
    type: 'SET_USER',
    user: null
  }
}

export default userReducer