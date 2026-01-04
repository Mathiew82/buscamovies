import { describe, it, expect } from 'vitest'
import {
  searchMovie,
  searchMovies,
  searchPopularMovies,
  searchCredits,
} from './MoviesRepository'

describe('MoviesRepository', () => {
  it('should execute correctly the searchMovie method', async () => {
    const movieId = 1

    let response = null
    await searchMovie(movieId).then((data) => {
      response = data
    })

    expect(typeof response).toBe('object')
  })

  it('should execute correctly the searchMovies method', async () => {
    const term = 'avatar'
    const page = 1

    let response = null
    await searchMovies(term, page).then((data) => {
      response = data
    })

    expect(typeof response).toBe('object')
  })

  it('should execute correctly the searchPopularMovies method', async () => {
    const testURL = 'https://jsonplaceholder.typicode.com/todos/1'

    let response = null
    await searchPopularMovies(testURL).then((data) => {
      response = data
    })

    expect(typeof response).toBe('object')
  })

  it('should execute correctly the searchCredits method', async () => {
    const testURL = 'https://jsonplaceholder.typicode.com/todos/1'

    let response = null
    await searchCredits(testURL).then((data) => {
      response = data
    })

    expect(typeof response).toBe('object')
  })
})
