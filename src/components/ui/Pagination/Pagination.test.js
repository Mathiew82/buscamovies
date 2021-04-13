import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from './Pagination'

describe('Pagination Component', () => {
  it('should render correctly', () => {
    const handleClickPage = jest.fn()
    const currentPage = 1
    const paginationLength = 200

    const { container } = render(
      <Pagination
        currentPage={currentPage}
        paginationLength={paginationLength}
        clickPage={handleClickPage}
      />
    )
    const currentLink = container.querySelector('.is-current')

    expect(currentLink).toBeInTheDocument()
  })

  it('should call clickPage correctly of current link', () => {
    const handleClickPage = jest.fn()
    const currentPage = 1
    const paginationLength = 200

    const { container } = render(
      <Pagination
        currentPage={currentPage}
        paginationLength={paginationLength}
        clickPage={handleClickPage}
      />
    )
    const currentPageButton = container.querySelector('.is-current')
    userEvent.click(currentPageButton)

    expect(handleClickPage.mock.calls).toHaveLength(1)
  })

  it('should call clickPage correctly of all links', () => {
    const handleClickPage = jest.fn()
    const currentPage = 5
    const paginationLength = 200

    const { container } = render(
      <Pagination
        currentPage={currentPage}
        paginationLength={paginationLength}
        clickPage={handleClickPage}
      />
    )
    const paginationLinks = container.getElementsByClassName('pagination-link')
    Array.from(paginationLinks).forEach((pageLink) => {
      userEvent.click(pageLink)
    })

    expect(handleClickPage.mock.calls).toEqual([[1], [4], [5], [6], [200]])
  })
})
