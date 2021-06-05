const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

let token = null

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekretz', 10)
  const user = new User({
    username: 'testuser',
    name: 'James James',
    passwordHash,
  })
  const savedUser = await user.save()
  const login = { 'username': user.username, 'password': 'sekretz' }
  const loginResponse = await api.post('/api/login').send(login)
  token = loginResponse.body.token

  await Blog.deleteMany({})
  helper.initialBlogs.forEach(b => b.user = savedUser.id)
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned as json', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((b) => expect(b.id).toBeDefined())
  })
})

describe('addition of a new blog', () => {
  test('fails without token', async () => {
    const newBlog = {
      title: 'Blog epicness X',
      author: 'Arnold Blogzenegger',
      url: 'http://www.google.com',
      likes: 777
    }

    await api.post('/api/blogs').send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Blog epicness X',
      author: 'Arnold Blogzenegger',
      url: 'http://www.google.com',
      likes: 777
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    const titles = response.body.map(b => b.title)
    expect(titles).toContain(newBlog.title)
  })

  test('will default likes to 0 when likes is missing', async () => {
    const newBlog = {
      title: 'No likes',
      author: 'Mr. Sad',
      url: 'http://www.google.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    const noLikesBlog = response.body.find(b => b.title === 'No likes')
    expect(noLikesBlog.likes).toBe(0)
  })

  test('fails with 400 when title or url is missing', async () => {
    const badBlogs = [
      {
        title: 'Bad 1',
        author: 'Crappy Blogger',
        likes: 0
      },
      {
        author: 'Crappy Blogger',
        url: 'http://www.google.com',
        likes: 0
      },
      {
        author: 'Crappy Blogger',
        likes: 0
      }
    ]

    for (let b of badBlogs) {
      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(b)
        .expect(400)
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    }
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('succeeds with a valid blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 9999

    const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate)
    expect(response.body.likes).toBe(9999)

    const blogsAtEnd = await helper.blogsInDb()
    const updatetdBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)
    expect(updatetdBlog.likes).toBe(blogToUpdate.likes)
  }) 
})

afterAll(() => {
  mongoose.connection.close()
})