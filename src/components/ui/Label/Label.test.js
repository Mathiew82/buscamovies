import React from 'react'
import { render, screen } from '@testing-library/react'
import Label from './Label'

/** Variables for testing */
const text = 'Test'

describe('label', () => {
  it('component should render correctly', () => {
    render(<Label>{text}</Label>)

    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
