const notificationReducer = (state = {value: null, timeoutId: 0}, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  switch (action.type) {
    case 'NOTIFICATION': {
      window.clearTimeout(state.timeoutId)
      return {
        value: action.notification,
        timeoutId: action.timeoutId
      }
    }
    default:
      return state
  }
}

export const setNotification = (notification, seconds) => {
  return async dispatch => {
    const timeoutId = setTimeout(() => dispatch(removeNotification()), seconds*1000)
    dispatch({
      type: 'NOTIFICATION',
      notification,
      timeoutId
    })
  }
}

const removeNotification = () => {
  return {
    type: 'NOTIFICATION',
    notification: null,
    timeoutId: 0
  }
}

export default notificationReducer