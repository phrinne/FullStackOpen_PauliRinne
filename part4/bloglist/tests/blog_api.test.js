const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = helper.initialBlogs.map(b => new Blog(b))
    const promiseArray = blogObjects.map(b => b.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach( (b) => expect(b.id).toBeDefined() )
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Blog epicness X',
    author: 'Arnold Blogzenegger',
    url: 'http://www.google.com',
    likes: 777
  }

  await api.post('/api/blogs').send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  const titles = response.body.map(b => b.title)
  expect(titles).toContain(newBlog.title)
})

test('likes will default to 0', async () => {
  const newBlog = {
    title: 'No likes',
    author: 'Mr. Sad',
    url: 'http://www.google.com'
  }

  await api.post('/api/blogs').send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  const noLikesBlog = response.body.find(b => b.title === 'No likes')
  expect(noLikesBlog.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})