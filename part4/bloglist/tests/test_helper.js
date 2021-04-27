const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Blog title 1',
    author: 'James McBlog',
    url: 'http://www.google.com',
    likes: 6
  },
  {
    title: 'Blog title 2',
    author: 'Ernerst Blogersson',
    url: 'http://www.google.com',
    likes: 7
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

/*const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon', date: new Date() })
  await note.save()
  await note.remove()

  return note._id.toString()
}*/

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}