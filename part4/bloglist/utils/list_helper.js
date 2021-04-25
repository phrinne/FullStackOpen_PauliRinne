const _ = require("lodash")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(b => b.likes).reduce((total, sum) => total+sum, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) {
        return null
    }
    
    let favorite = blogs[0]
    for(let blog of blogs) {
        if(blog.likes > favorite.likes) {
            favorite = blog
        }
    }

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) {
        return null
    }
    
    let author = ''
    let maxBlogs = 0
    const authors = _.reduce(blogs, (result, blog) => {
        if(!result[blog.author]) {
            result[blog.author] = {}
            result[blog.author] = 0
        }
        result[blog.author]++
        if(result[blog.author] > maxBlogs) {
            author = blog.author
            maxBlogs = result[blog.author]
        }

        return result
    }, [])
    
    return {
        author: author,
        blogs: maxBlogs
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}