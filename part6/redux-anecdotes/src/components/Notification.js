import React from 'react'
//import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  //const notification = useSelector(state => state.notification)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notificationDiv = () => (
    <div style={style}>
      {props.notification}
    </div>
  )

  return (
    <>
    {props.notification?notificationDiv():null}
    </>
  )
}

//export default Notification
const mapStateToProps = (state) => {
  return {
    notification: state.notification.value
  }
}
const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification