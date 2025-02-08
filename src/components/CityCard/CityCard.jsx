import "bootstrap/dist/css/bootstrap.min.css";
import style from "./CityCard.module.css";

export default function CityCard({ cityName, details, latitude, longitude }) {
  /**
   * Card with city
   *
   * @param {String} cityName - city name
   * @param {String} details - details for card
   * @param {Number} latitude - latitude coordinates
   * @param {Number} longitude - longitude coordinates
   */

  //Extract country from details
  const data = details.split(",");
  const country = data[data.length - 1];

  return (
    <a
      className="text-decoration-none"
      href={`/city/${cityName}/${latitude}/${longitude}/`}
    >
      <div className={`card ${style.cardCustom}`}>
        <div className={`card-header ${style.cardHeader}`}>{cityName}</div>
        <div className={`card-body`}>
          <div className="d-flex justify-content-between">
            {/* Country */}
            <div className={`${style.badge} ${style.cardCountry}`}>
              {country}
            </div>

            {/* Details */}
            <div className={``}>{data.slice(1, -1).join(", ")}</div>
          </div>
        </div>
      </div>
    </a>
  );
}
