import axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZTFhMTA3YzY5MGJmYTFhNGU0OWRiNjY5MzhkZDE3NiIsIm5iZiI6MTczNjQyMzM3MS40ODE5OTk5LCJzdWIiOiI2NzdmYjdjYmE2Nzc4YWE1YjM3YjJmODkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TMWtxRGT6UifShyV7Zv-4gwi5PooiVhKKCtciycKoFA";
const API_BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/trending/movie/week`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      params: {
        language: "en-US",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error.message);
    throw new Error("Failed to fetch popular movies.");
  }
};

export const fetchMovies = async (searchQuery) => {
  const url = `${API_BASE_URL}/search/movie?query=${searchQuery}&language=en-US&page=1`;
  const options = {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };
  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies by search query:", error.message);
    throw new Error("Failed to fetch movies.");
  }
};

export const fetchMovieDetails = async (movieId) => {
  const url = `${API_BASE_URL}/movie/${movieId}`;
  const options = {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error.message);
    throw new Error("Failed to fetch movie details.");
  }
};
