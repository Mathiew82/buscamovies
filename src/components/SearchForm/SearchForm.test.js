import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SearchForm from './SearchForm'

/** Variables for testing */
const inputText = 'test'

/** Props */
let inputValue = ''
const setInputValue = () => inputText
const handleSubmit = jest.fn((e) => {
  e.preventDefault()
  return true
})

describe('searchform', () => {
  test('component should render correctly', () => {
    const { queryByTestId, unmount } = render(
      <SearchForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        submit={handleSubmit}
      />
    )

    const searchForm = queryByTestId('search-form')
    expect(searchForm).toBeTruthy()
    unmount()
  })

  test('updates on change', () => {
    const { queryByTestId, unmount } = render(
      <SearchForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        submit={handleSubmit}
      />
    )

    const searchButton = queryByTestId('search-button')
    fireEvent.change(searchButton, { target: { value: inputText } })
    expect(searchButton.value).toBe(inputText)
    expect(setInputValue()).toBe(inputText)
    unmount()
  })

  test('the form is submitted correctly', () => {
    const { queryByTestId, unmount } = render(
      <SearchForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        submit={handleSubmit}
      />
    )

    const searchForm = queryByTestId('search-form')
    fireEvent.submit(searchForm)
    expect(handleSubmit).toHaveBeenCalled()
    unmount()
  })
})
