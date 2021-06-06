const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    if(!request.body.title || !request.body.url) {
        return response.status(400).end()
    }
    
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
        //user: request.user._id
        user: request.user
    })
    const savedBlog = await blog.save()
    request.user.blogs = request.user.blogs.concat(savedBlog._id)
    await request.user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
    if(!request.body.comment) {
        return response.status(400).end()
    }
    const oldBlog = await Blog.findById(request.params.id)
    const newComments = [...oldBlog.comments, request.body.comment]
    const blog = {
        comments: newComments
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1, id: 1 })
    response.json(updatedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === request.user._id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'only the creator can remove a blog' })
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes || 0,
        user: request.body.user //the id
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1, id: 1 })
    //const populatedBlog = updatedBlog.populate('user', { username: 1, name: 1, id: 1 })
    //console.log(updatedBlog)
    response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter