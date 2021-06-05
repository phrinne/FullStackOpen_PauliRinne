const notificationReducer = (state = { value: null, isError: false, timeoutId: 0 }, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'NOTIFICATION': {
    window.clearTimeout(state.timeoutId)
    return {
      value: action.value,
      isError: action.isError,
      timeoutId: action.timeoutId
    }
  }
  default:
    return state
  }
}

export const setNotification = (value, isError, seconds) => {
  return async dispatch => {
    const timeoutId = setTimeout(() => dispatch(removeNotification()), seconds*1000)
    dispatch({
      type: 'NOTIFICATION',
      value,
      isError,
      timeoutId
    })
  }
}

const removeNotification = () => {
  return {
    type: 'NOTIFICATION',
    value: null,
    isError: false,
    timeoutId: 0
  }
}

export default notificationReducer