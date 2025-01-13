import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import s from "./MovieSearchForm.module.css";

const MovieSearchForm = ({ onSearch }) => {
  const handleSubmit = (values, { resetForm }) => {
    const { query } = values;
    if (!query.trim()) {
      return;
    }
    onSearch(query.trim());
    resetForm();
  };

  return (
    <Formik initialValues={{ query: "" }} onSubmit={handleSubmit}>
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
  );
};

MovieSearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default MovieSearchForm;
