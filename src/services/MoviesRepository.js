export const searchMovie = (url) => {
  return fetch(url).then((response) => response.json())
}

export const searchMovies = (url) => {
  return fetch(url).then((response) => response.json())
}

export const searchPopularMovies = (url) => {
  return fetch(url).then((response) => response.json())
}

export const searchCredits = (url) => {
  return fetch(url).then((response) => response.json())
}
