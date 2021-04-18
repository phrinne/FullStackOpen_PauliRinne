import axios from 'axios'
const dbUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(dbUrl).then(response => response.data)

const create = (newObject) => axios.post(dbUrl, newObject).then(response => response.data)

const remove = (id) => axios.delete(`${dbUrl}/${id}`)

const update = (id, newObject) => axios.put(`${dbUrl}/${id}`, newObject).then(response => response.data)

const outbound = { getAll, create, remove, update }

export default outbound