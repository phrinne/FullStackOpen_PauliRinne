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

  export const setNotification = (notification) => {
    return {
      type: 'NOTIFICATION',
      notification
    }
  }

  export const removeNotification = () => {
    return {
      type: 'NOTIFICATION',
      notification: null
    }
  }

  export default notificationReducer