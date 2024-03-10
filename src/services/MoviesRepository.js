export const searchMovie = async (url) => {
  const response = await fetch(url).then((response) => response.json())
  return response
}

export const searchMovies = async (url) => {
  const response = await fetch(url).then((response) => response.json())
  return response
}

export const searchPopularMovies = async (url) => {
  const response = await fetch(url).then((response) => response.json())
  return response
}

export const searchCredits = async (url) => {
  const response = await fetch(url).then((response) => response.json())
  return response
}
