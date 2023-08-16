import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import NewBlog from './NewBlog'

test('<NewBlog /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <NewBlog handleCreate={createBlog} />
  )

  const input = component.container.querySelector('#title')
  const form = component.container.querySelector('form')

  fireEvent.change(input, {
    target: { value: 'Go To Statement Considered Harmful' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Go To Statement Considered Harmful' )
})