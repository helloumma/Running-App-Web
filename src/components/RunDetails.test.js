import React from 'react'
import { screen, render, cleanup } from '@testing-library/react'
import RunDetails from './RunDetails'

describe('App component', () => {
  beforeAll(() => {
    render(<RunDetails />)
  })

  it('should have the right message in the dom', () => {
    const message = 'Time'

    expect(screen.getByText(message)).toBeInTheDocument()
  })

  afterAll(cleanup)
})
