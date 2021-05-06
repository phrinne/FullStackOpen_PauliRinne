import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

/*test('renders content', () => {
  const blog = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const component = render(
    <Note note={note} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})*/

describe('<Blog />', () => {
  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'www.blogtest.com',
    likes: 666,
    user: 123456
  }
  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} handleLike={null} handleDelete={null} />
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

  /*test('after clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })*/

})