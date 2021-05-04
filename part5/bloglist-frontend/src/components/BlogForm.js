import React from 'react'

const BlogForm = ({ handleSubmit, handleTitleChange, handleAuthorChange, handleUrlChange, newTitle, newAuthor, newUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                title:
                <input value={newTitle} onChange={handleTitleChange} />
            </div>
            <div>
                author:
                <input value={newAuthor} onChange={handleAuthorChange} />
            </div>
            <div>
                url:
                <input value={newUrl} onChange={handleUrlChange} />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm