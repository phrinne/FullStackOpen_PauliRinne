import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'www.blogtest.com',
    likes: 666,
    user: 123456
  }
  let component
  const mockHandlerLikes = jest.fn()
  const mockHandlerDelete = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} handleLike={mockHandlerLikes} handleDelete={mockHandlerDelete} />
    )
  })

  test('renders its title and author', () => {
    expect(component.container).toHaveTextContent(
      'Test title'
    )
    expect(component.container).toHaveTextContent(
      'Test author'
    )
  })

  test('does not render the url and likes by default', () => {
    expect(component.container).not.toHaveTextContent(
      'www.blogtest.com'
    )
    expect(component.container).not.toHaveTextContent(
      '666'
    )
  })

  test('renders likes and url after clicking view', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(
      'www.blogtest.com'
    )
    expect(component.container).toHaveTextContent(
      '666'
    )
  })

  test('calls event handler twice after clicking like twice', () => {
    const button_view = component.getByText('view')
    fireEvent.click(button_view)

    const button_like = component.getByText('like')
    fireEvent.click(button_like)
    fireEvent.click(button_like)

    expect(mockHandlerLikes.mock.calls).toHaveLength(2)
  })
})