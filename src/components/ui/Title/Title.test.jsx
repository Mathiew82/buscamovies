import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Title from './Title'

/** Variables for testing */
const text = 'Test'

describe('Title Component', () => {
  it('should render correctly', () => {
    render(<Title>{text}</Title>)

    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
