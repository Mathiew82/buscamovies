import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from './Footer'

describe('Footer Component', () => {
  it('should render correctly', () => {
    render(<Footer />)
    const link = screen.getByRole('contentinfo')

    expect(link).toBeInTheDocument()
  })
})
