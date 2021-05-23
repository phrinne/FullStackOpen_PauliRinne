const notificationReducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  switch (action.type) {
    case 'NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (notification, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      notification
    })
    setTimeout(() => dispatch(removeNotification()), seconds*1000)
  }
}

const removeNotification = () => {
  return {
    type: 'NOTIFICATION',
    notification: null
  }
}

export default notificationReducer