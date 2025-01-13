import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";
import PropTypes from "prop-types";

const defaultImg = "https://via.placeholder.com/150x225?text=No+Image";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={s.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.movieItem}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : defaultImg
              }
              alt={movie.title || "Movie"}
              className={s.movieImg}
            />
            <h3 className={s.movieTitle}>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MovieList;
