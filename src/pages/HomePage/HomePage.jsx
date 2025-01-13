import { useEffect, useState } from "react";
import s from "./HomePage.module.css";
import { Link } from "react-router-dom";
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
        console.log(data);
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
    <div className={s.homepage}>
      <header className={s.homepageHeader}>
        <h1 className={s.logo}>Kinoshka</h1>
        <p className={s.headerText}>
          Looking for a movie?{" "}
          <Link to="/movies" className="headerLink">
            Click here
          </Link>
        </p>
      </header>
      <main className={s.homepageMain}>
        <h2 className={s.titleTrending}>Trending Movies</h2>
        {isLoading && <Spinner />}
        {error && <p className={s.errorMessage}>{error}</p>}
        {!isLoading && !error && movies.length > 0 && (
          <MovieList movies={movies} />
        )}
      </main>
    </div>
  );
};
export default HomePage;
