import { useState, useEffect, useRef } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  Outlet,
} from "react-router-dom";
import { fetchMovieDetails } from "../api/api";
import s from "./MovieDetailPage.module.css";

const MovieDetailPage = () => {
  const { movieId } = useParams(); // Отримуємо ID фільму з URL
  const location = useLocation(); // Зберігаємо місце, звідки прийшов користувач
  const navigate = useNavigate(); // Використовуємо для навігації назад
  const movieRef = useRef(null); // Зберігаємо дані про фільм
  const [movie, setMovie] = useState(null); // Стан для збереження даних про фільм
  const [error, setError] = useState(null); // Стан для помилок
  const [isLoading, setIsLoading] = useState(false); // Стан для завантаження

  // Збереження попереднього шляху
  const previousLocation = location.state?.from || "/movies";

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieDetails(movieId); // Отримуємо дані про фільм
        movieRef.current = data; // Зберігаємо дані у `useRef`
        setMovie(data); // Оновлюємо стан
      } catch (error) {
        setError("Failed to fetch movie details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]); // Залежність — `movieId`

  const handleGoBack = () => {
    navigate(previousLocation); // Повертаємось на попередню сторінку або на "/movies"
  };

  if (isLoading) {
    return <p>Loading...</p>; // Повідомлення про завантаження
  }

  if (error) {
    return <p className={s.errorMessage}>{error}</p>; // Повідомлення про помилку
  }

  return (
    <div className={s.movieDetailPage}>
      <button onClick={handleGoBack} className={s.goBackButton}>
        Go Back
      </button>

      {movie && (
        <div className={s.movieDetails}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.title || "Movie"}
            className={s.moviePoster}
          />
          <div className={s.movieInfo}>
            <h2>{movie.title}</h2>
            <p>
              <strong>Release Date:</strong> {movie.release_date || "N/A"}
            </p>
            <p>
              <strong>Overview:</strong>{" "}
              {movie.overview || "No overview available."}
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres?.map((genre) => genre.name).join(", ") || "N/A"}
            </p>
          </div>
        </div>
      )}

      <nav className={s.additionalInfo}>
        <h3>Additional Information</h3>
        <ul>
          <li>
            <Link
              to="cast"
              state={{ from: previousLocation }}
              className={s.link}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              to="reviews"
              state={{ from: previousLocation }}
              className={s.link}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </nav>

      {/* Відображення дочірніх маршрутів */}
      <Outlet />
    </div>
  );
};

export default MovieDetailPage;
