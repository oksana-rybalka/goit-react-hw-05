import { useEffect, useState } from "react";
import s from "./MovieCast.module.css";
import { fetchMovieCast } from "../../services/api";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;
    const getMovieCast = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching cast for movieId:", movieId);

        const data = await fetchMovieCast(movieId);

        setCast(data);
        console.log(data);
      } catch (error) {
        setError("Failed to fetch movie cast. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    getMovieCast();
  }, [movieId]);

  if (isLoading) return <Spinner />;
  if (error) return <p className={s.error}>{error}</p>;

  return (
    <div className={s.castContainer}>
      <h3 className={s.title}>Cast</h3>
      <ul className={s.castList}>
        {cast.length > 0 ? (
          cast.map((actor) => (
            <li key={actor.id} className={s.castItem}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg"
                }
                alt={actor.name}
                className={s.castImage}
              />
              <p className={s.castName}>{actor.name}</p>
              <p className={s.castCharacter}>{actor.character}</p>
            </li>
          ))
        ) : (
          <p>No cast information available.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieCast;
