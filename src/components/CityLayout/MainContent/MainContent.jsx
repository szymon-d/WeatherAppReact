import "bootstrap/dist/css/bootstrap.min.css";
import style from "./MainContent.module.css";

export default function MainContent({ index, activeDay, data }) {
  /**
   * Middle content of page
   *
   * @param {} index -
   * @param {Number} activeDay - index of active day. From 0 to 6
   * @param {Object} data - data with hours and temperatures
   */

  //Construct array with elements for layout
  const temperaturesData = data["dayData"].map((dict, idx) => {
    return (
      <div className={`input-group ${style.w400px}`} key={`hour${idx}`}>
        <span className={`input-group-text ${style.w80px}`}>
          {data.timeZone}
        </span>
        <span className={`input-group-text ${style.w100px}`}>{dict.time}</span>
        <div className={`form-control d-flex justify-content-end`}>
          {dict.temp}
        </div>
        <span className={`input-group-text`}>{data.unit}</span>
      </div>
    );
    // return <div {`${dict.time} ${dict.temp}`}</div>;
  });
  return (
    <div
      className={`col-lg-10 col-md-8 col-sm-6 m-2 p-2 ${
        index == activeDay ? "" : "d-none"
      }`}
    >
      <div className="p-2">{temperaturesData}</div>
    </div>
  );
}
