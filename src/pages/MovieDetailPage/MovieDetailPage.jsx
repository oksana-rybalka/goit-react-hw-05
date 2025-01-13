import { useState, useEffect, useRef } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  Outlet,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import s from "./MovieDetailPage.module.css";
import Spinner from "../../components/Spinner/Spinner";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const location = useLocation(); 
  const navigate = useNavigate();
  
  const movieRef = useRef(null); 
  
  const [movie, setMovie] = useState(null);
  
  const [error, setError] = useState(null); 
  
  const [isLoading, setIsLoading] = useState(false); 

  
  
  const previousLocation = location.state?.from || "/movies";

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieDetails(movieId);
        movieRef.current = data; 
        setMovie(data); 
      } catch (error) {
        setError("Failed to fetch movie details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]); 

  const handleGoBack = () => {
    navigate(previousLocation); 
  };

  if (isLoading) {
    return <Spinner />; 
  }

  if (error) {
    return <p className={s.errorMessage}>{error}</p>; 
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
            <h2 className={s.nameMovie}>{movie.title}</h2>
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
      <Outlet />
    </div>
  );
};

export default MovieDetailPage;
