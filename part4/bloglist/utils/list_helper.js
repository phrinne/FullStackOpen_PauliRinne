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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}