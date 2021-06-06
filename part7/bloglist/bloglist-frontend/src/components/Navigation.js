import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SmallButton } from '../styles/buttonStyles'

const StyledNav = styled.div`
  padding: 1rem 0;
  display: flex;
  gap: 1rem;

  & span {
    display: inline-block;
    margin-left: auto;

    & button {
      margin-left: 0.5rem;
    }
  }
`

const Navigation = ({ handleLogout, user }) => {
  return (
    <StyledNav>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <span>
        {user.name} logged-in
        <SmallButton type="button" onClick={handleLogout}>log out</SmallButton>
      </span>
    </StyledNav>
  )
}

export default Navigation