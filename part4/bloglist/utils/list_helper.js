const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(b => b.likes).reduce((total, sum) => total+sum, 0)
    //return 5 blogs?0:
}

module.exports = {
    dummy,
    totalLikes
}