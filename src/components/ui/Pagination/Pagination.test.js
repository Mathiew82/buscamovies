import React from 'react'
import { render, screen } from '@testing-library/react'
import Pagination from './Pagination'

describe('pagination', () => {
  test('component should render correctly', () => {
    const handleClickPage = () => {}
    const currentPage = 1
    const paginationLength = 200

    const { container } = render(
      <Pagination
        currentPage={currentPage}
        paginationLength={paginationLength}
        handleClickPage={handleClickPage}
      />
    )

    expect(container.getElementsByClassName('is-current').length).toBe(1)
  })
})
