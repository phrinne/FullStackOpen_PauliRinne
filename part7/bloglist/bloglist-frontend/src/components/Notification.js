import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'

const StyledNotification = styled.div`
  background: ${props => props.error?lighten(0.7, props.theme.error):lighten(0.5, props.theme.success)};
  color: ${props => props.error?props.theme.error:props.theme.success};
  font-size: 1rem;
  border: 1px solid;
  border-radius: ${props => props.theme.borderRadius};
  padding: 1rem;
  margin-bottom: 1rem;
`
//color: ${props => lighten(0.2, (props.error?'props.theme.error':'props.theme.success'))};
//color: ${props => lighten(0.2, props.theme.success)};
const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  } else {
    return (
      <StyledNotification error={isError}>{message}</StyledNotification>
    )
  }
}

export default Notification