import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const comment = async (id, comment) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment }, config)
  return response.data
}

const remove = async (id) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

const blogServices = { setToken, getAll, create, update, remove, comment }
export default blogServices