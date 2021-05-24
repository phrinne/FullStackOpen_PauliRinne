import React, { useState } from 'react'
import  { useField } from '../hooks'

const CreateNew = (props) => {
    /*const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')*/
    const content = useField('text', 'content')
    const author = useField('text', 'author')
    const info = useField('text', 'info')
    const noReset = ({ reset, ...rest }) => rest
    const contentInput = noReset(content)
    const authorInput = noReset(author)
    const infoInput = noReset(info)

    const handleSubmit = (e) => {
        e.preventDefault()
        const newAnecdote = {
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        }
        console.log(newAnecdote)
        props.addNew(newAnecdote)
        props.setNotification(`A new anecdote ${content} created!`)
        setTimeout(() => props.setNotification(''), 10000)
    }

    const handleReset = (e) => {
        e.preventDefault()
        content.reset()
        author.reset()
        info.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...contentInput} />
                </div>
                <div>
                    author
                    <input {...authorInput} />
                </div>
                <div>
                    url for more info
                    <input {...infoInput} />
                </div>
                <input type='submit' value='create' />
                <button onClick={handleReset}>reset</button>
            </form>
        </div>
    )
}

export default CreateNew
//<input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />