import React from 'react'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  } else {
    const className = isError ? 'error' : 'notification'
    return (
      <div className={className}>
        {message}
      </div>
    )
  }
}

export default Notification