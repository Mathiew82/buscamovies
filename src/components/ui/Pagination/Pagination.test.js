import React from 'react'
import { render } from '@testing-library/react'
import Pagination from './Pagination'

describe('pagination', () => {
  test('component should render correctly', () => {
    const handleClickPage = () => {}
    const currentPage = 1
    const paginationLength = 200

    const { queryByTestId, unmount } = render(
      <Pagination
        currentPage={currentPage}
        paginationLength={paginationLength}
        handleClickPage={handleClickPage}
      />
    )

    expect(queryByTestId('pagination-list')).toBeTruthy()
    unmount()
  })
})
