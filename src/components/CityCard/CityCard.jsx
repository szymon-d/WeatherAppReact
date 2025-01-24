import { guid } from "../../utils.js";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./CityCard.module.css";

export default function CityCard({ cityName, details }) {
  const data = details.split(",");
  const country = data[data.length - 1];

  return (
    <a className="text-decoration-none" href={`/city/${cityName}`}>
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
