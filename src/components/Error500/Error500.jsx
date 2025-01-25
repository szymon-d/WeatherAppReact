import styles from "./Error500.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Error500({ message }) {
  return (
    <div className={`container-fluid m-3`}>
      <div className="vh-100 d-flex justify-content-center align-items-xxl-center align-items-xl-center align-items-lg-center align-items-md-top">
        <div className={`alert alert-danger ${styles.message}`}>{message}</div>
      </div>
    </div>
  );
}
