export const searchMovie = (url) => {
  return fetch(url).then((response) => response.json())
}

export const searchCredits = (url) => {
  return fetch(url).then((response) => response.json())
}
