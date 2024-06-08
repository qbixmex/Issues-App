import { FaSpinner } from "react-icons/fa";
import styles from "./loading.module.css";

const LoadingIcon = () => {
  return (
    <FaSpinner className={styles.loader} size={50} />
  );
};

export default LoadingIcon;
