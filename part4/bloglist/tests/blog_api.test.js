const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  /*const blogObjects = helper.initialBlogs.map(b => new Blog(b))
  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)*/
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
  test('succeeds with valid data', async () => {
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

  test('will default likes to 0 when missin', async () => {
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
      await api.post('/api/blogs').send(b).expect(400)
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(helper.initialBlogs.length)
    }
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})