import React from 'react'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer Component', () => {
  it('should render correctly', () => {
    render(<Footer />)
    const link = screen.getByRole('contentinfo')

    expect(link).toBeInTheDocument()
  })
})
