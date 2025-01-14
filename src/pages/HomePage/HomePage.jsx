import { useEffect, useState } from "react";
import s from "./HomePage.module.css";
import { fetchPopularMovies } from "../../services/api";
import Spinner from "../../components/Spinner/Spinner";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPopularMovies = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPopularMovies();
        setMovies(data.results);
      } catch (error) {
        setError("Failed to fetch trending movies. Try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    getPopularMovies();
  }, []);

  return (
    <main className={s.homepageMain}>
      <h2 className={s.titleTrending}>Trending Movies</h2>
      {isLoading && <Spinner />}
      {error && <p className={s.errorMessage}>{error}</p>}
      {!isLoading && !error && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </main>
  );
};
export default HomePage;
