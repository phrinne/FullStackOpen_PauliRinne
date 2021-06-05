import React, { useState, useEffect } from 'react'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(async () => {
    const usersFromDb = await userService.getAll()
    setUsers(usersFromDb)
  }, [])

  return (
    <>
      <h2>Users</h2>
      <table>
        <tr>
          <th></th>
          <th>Blogs created</th>
        </tr>
        {users.map(u =>
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.blogs.length}</td>
          </tr>)}
      </table>
    </>
  )
}

export default Users