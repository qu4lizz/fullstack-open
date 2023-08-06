import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import { render, fireEvent } from '@testing-library/react'

describe('Blog Component', () => {
  test('renders title and author, but not URL or likes by default', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test-url.com',
      likes: 5,
      user: {
        username: 'testuser',
      },
    }

    const component = render(<Blog blog={blog} />)

    expect(component.getByText('Test Blog by Test Author')).toBeInTheDocument()
    expect(component.queryByText('https://test-url.com')).toBeNull()
    expect(component.queryByText('likes 5')).toBeNull()
  })
})

describe('Blog Component', () => {
  test('renders URL and likes when details button is clicked', () => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test-url.com',
      likes: 5,
      user: {
        username: 'testuser',
      },
    }

    const handleUpdateMock = jest.fn()
    const handleDeleteMock = jest.fn()

    const component = render(<Blog blog={blog} handleDelete={handleDeleteMock} handleUpdate={handleUpdateMock}/>)
    const button = component.getByText('view')

    fireEvent.click(button)

    expect(component.getByText('https://test-url.com')).toBeInTheDocument()
    expect(component.getByText('likes 5')).toBeInTheDocument()
  })
})


describe('Blog Component', () => {
  test('renders title and author by default, but not URL or likes', () => {
    const blog = {
      title: 'Test Title',
      author: 'Test Author',
      url: 'https://test-url.com',
      likes: 5,
      user: { username: 'testuser' },
    }

    const handleUpdateMock = jest.fn()
    const handleDeleteMock = jest.fn()

    const component = render(
      <Blog
        blog={blog}
        handleUpdate={handleUpdateMock}
        handleDelete={handleDeleteMock}
      />
    )

    const titleAuthorElement = component.getByText('Test Title by Test Author')
    const urlElement = component.queryByText('https://test-url.com')
    const likesElement = component.queryByText('likes 5')
    expect(titleAuthorElement).toBeInTheDocument()
    expect(urlElement).not.toBeInTheDocument()
    expect(likesElement).not.toBeInTheDocument()
  })
})
