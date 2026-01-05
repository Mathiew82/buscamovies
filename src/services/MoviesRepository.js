const { VITE_API_URL, VITE_API_KEY } = import.meta.env;

const apiClient = async (url) => {
  const response = await fetch(url).then((response) => response.json());

  if (response.status_code) throw new Error(response.status_message);
  return response;
};

export const searchMovie = (movieId) => {
  const movieUrl = new URL(
    `${VITE_API_URL}/movie/${movieId}?api_key=${VITE_API_KEY}`,
  );

  movieUrl.searchParams.append('language', 'es-ES');

  return apiClient(movieUrl);
};

export const searchCredits = (movieId) => {
  const movieUrl = new URL(
    `${VITE_API_URL}/movie/${movieId}/credits?api_key=${VITE_API_KEY}`,
  );

  return apiClient(movieUrl);
};

export const searchMovies = (term, page) => {
  const urlToSearch = new URL(
    `${VITE_API_URL}/search/movie?api_key=${VITE_API_KEY}`,
  );

  urlToSearch.searchParams.append('query', term);
  urlToSearch.searchParams.append('page', page);
  urlToSearch.searchParams.append('language', 'es-ES');
  urlToSearch.searchParams.append('include_adult', false);

  return apiClient(urlToSearch);
};

export const searchPopularMovies = async (page) => {
  const urlToSearch = new URL(
    `${VITE_API_URL}/discover/movie?api_key=${VITE_API_KEY}`,
  );

  urlToSearch.searchParams.append('sort_by', 'popularity.desc');
  urlToSearch.searchParams.append('page', page);
  urlToSearch.searchParams.append('include_adult', false);

  return apiClient(urlToSearch);
};
