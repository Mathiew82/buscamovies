import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchForm from './SearchForm'

describe('SearchForm Component', () => {
  it('should render correctly', () => {
    const inputValue = ''
    const setInputValue = jest.fn()
    const handleSubmit = jest.fn()

    const { container } = render(
      <SearchForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        submit={handleSubmit}
      />
    )
    const form = container.querySelector('form')

    expect(form).toBeInTheDocument()
  })

  it('should be updated correctly the input value', async () => {
    let inputValue = ''
    const setInputValue = jest.fn()
    const handleSubmit = jest.fn()

    render(
      <SearchForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        submit={handleSubmit}
      />
    )
    const input = screen.getByRole('textbox')
    userEvent.type(input, 'Hello')

    expect(input).toHaveValue('Hello')
  })

  it('the form is submitted correctly', () => {
    let inputValue = ''
    const setInputValue = jest.fn()
    const handleSubmit = jest.fn((e) => {
      e.preventDefault()
      return true
    })

    render(
      <SearchForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        submit={handleSubmit}
      />
    )
    const buttonForm = screen.queryByRole('button')
    userEvent.click(buttonForm)

    expect(handleSubmit.mock.calls).toHaveLength(1)
  })
})
