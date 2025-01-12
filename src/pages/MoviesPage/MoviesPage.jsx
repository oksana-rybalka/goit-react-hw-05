import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
import { Formik, Form, Field } from "formik";
import { fetchMovies } from "../../services/api";
import Spinner from "../../components/Spinner/Spinner";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (values, { resetForm }) => {
    const { query } = values;
    if (!query.trim()) {
      setError("Please enter a movie name.");
      return;
    }
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
      resetForm();
    }
  };
  return (
    <main>
      <Formik initialValues={{ query: "" }} onSubmit={handleSearch}>
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <Field
              type="text"
              name="query"
              placeholder="Enter movie name..."
              className={s.input}
            />

            <button type="submit" className={s.button} disabled={isSubmitting}>
              Search
            </button>
          </Form>
        )}
      </Formik>
      {error && <p className={s.error}> {error} </p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default MoviesPage;
