import React from 'react'
import { render, screen } from '@testing-library/react'
import Title from './Title'

/** Variables for testing */
const text = 'Test'

describe('title', () => {
  test('component should render correctly', () => {
    render(<Title>{text}</Title>)

    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
