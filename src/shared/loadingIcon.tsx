import { FC } from "react";
import { FaSpinner } from "react-icons/fa";
import styles from "./loading.module.css";

type Props = {
  className?: string;
};

const LoadingIcon: FC<Props> = ({ className }) => {
  return (
    <FaSpinner className={`${styles.loader}${ className ? ' ' + className : '' }`} size={50} />
  );
};

export default LoadingIcon;
