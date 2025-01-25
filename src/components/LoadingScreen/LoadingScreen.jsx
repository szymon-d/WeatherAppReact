import styles from "./LoadingScreen.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LoadingScreen() {
  /**
   * Return loading screen
   */

  return (
    <div className="container-fluid m-3">
      <div className="vh-100 d-flex justify-content-center align-items-xxl-center align-items-xl-center align-items-lg-center align-items-md-top">
        {/* Spinner */}
        <div
          className={`spinner-border ${styles.spinner} ${styles.spinnerBig}`}
          role="status"
        ></div>

        {/* Loading */}
        <div className={`ms-3 ${styles.loading}`}>Loading</div>
      </div>
    </div>
  );
}
