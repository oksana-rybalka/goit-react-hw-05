import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../services/api";
import s from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const MovieReviews = () => {
  const { movieId } = useParams();
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

    if (movieId) {
      getMovieReviews();
    }
  }, [movieId]);

  if (isLoading) return <Spinner />;
  if (error) return <p className={s.error}>{error}</p>;

  return (
    <div className={s.reviewsContainer}>
      <h3 className={s.title}>Reviews</h3>
      <ul className={s.reviewsList}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review.id} className={s.reviewItem}>
              <h4 className={s.reviewAuthor}>Author: {review.author}</h4>
              <p className={s.reviewContent}>{review.content}</p>
            </li>
          ))
        ) : (
          <p>No reviews available for this movie.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
