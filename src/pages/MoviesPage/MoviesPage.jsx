import { useState, useEffect, useRef } from "react";
import MovieList from "../../components/MovieList/MovieList";
import MovieSearchForm from "../../components/MovieSearchForm/MovieSearchForm";
import s from "./MoviesPage.module.css";
import { fetchMovies } from "../../services/api";
import Spinner from "../../components/Spinner/Spinner";
import { useLocation, useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const location = useLocation();
  const backLink = useRef(location.state?.from ?? "/");

  useEffect(() => {
    if (!query) return;

    const fetchMoviesData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchMovies(query);
        setMovies(data.results);

        if (data.results.length === 0) {
          setError("No movies found. Please try again.");
        }
      } catch (error) {
        setError("Failed to fetch movies. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMoviesData();
  }, [query]);

  const handleSearch = (value) => {
    setSearchParams({
      query: value,
    });
  };

  return (
    <main className={s.moviesPage}>
      <MovieSearchForm onSearch={handleSearch} />
      {isLoading && <Spinner />}
      {error && <p className={s.error}> {error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default MoviesPage;
