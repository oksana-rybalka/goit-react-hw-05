import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { fetchMovieReviews } from "../../crs/services/api";
import s from "./MovieReviews.module.css";

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieReviews = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError("Failed to fetch movie reviews. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getMovieReviews();
  }, [movieId]);

  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p className={s.error}>{error}</p>;

  return (
    <div className={s.reviewsContainer}>
      <h3 className={s.title}>Reviews</h3>
      <ul className={s.reviewsList}>
        {reviews.length > 0 ? (
          reviews.map(({ id, author, content }) => (
            <li key={id} className={s.reviewItem}>
              <h4 className={s.reviewAuthor}>Author: {author}</h4>
              <p className={s.reviewContent}>{content}</p>
            </li>
          ))
        ) : (
          <p>No reviews available for this movie.</p>
        )}
      </ul>
    </div>
  );
};

MovieReviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default MovieReviews;
