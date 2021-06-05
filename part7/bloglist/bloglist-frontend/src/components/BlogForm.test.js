import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('Blog form', () => {
  const createBlogMock = jest.fn()
  let component

  beforeEach(() => {
    component = render(
      <BlogForm createBlog={createBlogMock} />
    )
    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    fireEvent.change(inputTitle, {
      target: { value: 'This is a title' }
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'This is an author' }
    })
    fireEvent.change(inputUrl, {
      target: { value: 'This is an URL' }
    })
    const form = component.container.querySelector('form')
    fireEvent.submit(form)
  })

  test('calls the event handler it received as props', () => {
    expect(createBlogMock.mock.calls).toHaveLength(1)
  })

  test('uses the right details', () => {
    const expectedContent = {
      title: 'This is a title',
      author: 'This is an author',
      url: 'This is an URL'
    }
    const passedContent = createBlogMock.mock.calls[0][0]
    expect(passedContent).toEqual(expectedContent)
  })
})