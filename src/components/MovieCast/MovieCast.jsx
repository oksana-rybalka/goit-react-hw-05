import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchMovieCast } from "../../crs/services/api";
import s from "./MovieCast.module.css";

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieCast = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError("Failed to fetch movie cast. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getMovieCast();
  }, [movieId]);

  if (isLoading) return <p>Loading cast...</p>;
  if (error) return <p className={s.error}>{error}</p>;

  return (
    <div className={s.castContainer}>
      <h3 className={s.title}>Cast</h3>
      <ul className={s.castList}>
        {cast.length > 0 ? (
          cast.map(({ id, name, profile_path, character }) => (
            <li key={id} className={s.castItem}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w200${profile_path}`
                    : "https://via.placeholder.com/100x150?text=No+Image"
                }
                alt={name}
                className={s.castImage}
              />
              <p className={s.castName}>{name}</p>
              <p className={s.castCharacter}>{character}</p>
            </li>
          ))
        ) : (
          <p>No cast information available.</p>
        )}
      </ul>
    </div>
  );
};

MovieCast.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default MovieCast;
