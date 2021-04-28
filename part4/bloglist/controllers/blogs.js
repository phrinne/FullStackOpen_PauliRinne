const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    if(!request.body.title || !request.body.url) {
        return response.status(400).end()
    }

    //const user = await User.findById(body.userId)
    const users = await User.find({})
    const randomIndex = Math.floor(Math.random() * users.length)
    const user = users[randomIndex]
    
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
        user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0
    }
    const updatetdBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatetdBlog)
})

module.exports = blogsRouter