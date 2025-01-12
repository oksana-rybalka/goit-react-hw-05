import { FaSpinner } from "react-icons/fa";
import style from "./Spinner.module.css";

const Spinner = () => (
  <div className={style.spinnerContainer}>
    <FaSpinner className={style.spinnerIcon} />
  </div>
);

export default Spinner;
