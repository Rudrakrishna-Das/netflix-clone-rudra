const API_KEY = "3f6796292096fcbf7dfcb9ab32fe7f6c";

export const requests = {
  //AXIOS

  trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  netflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  topRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  action: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  comedy: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  horror: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  romance: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  documentries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,

  //FETCH

  // fetchTrending: `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`,
  // fetchNetflixOriginals: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`,
  // fetchTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  // fetchActionMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`,
  // fetchComedyMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`,
  // fetchHorrorMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`,
  // fetchRomanceMovies: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  // fetchDocumentaries: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99`,
};
