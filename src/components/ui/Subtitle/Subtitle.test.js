import React from 'react'
import { render, screen } from '@testing-library/react'
import Subtitle from './Subtitle'

/** Variables for testing */
const text = 'Test'

describe('Subtitle Component', () => {
  it('should render correctly', () => {
    render(<Subtitle>{text}</Subtitle>)

    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
