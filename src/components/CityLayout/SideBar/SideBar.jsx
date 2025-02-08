import "bootstrap/dist/css/bootstrap.min.css";
import style from "./SideBar.module.css";

export default function SideBar({ data, activeDay, setActiveDay }) {
  /**
   * Left sideBar for CityLayout
   * @param {Object} data - City data
   * @param {Number} activeDay - index of active day. From 0 to 6
   * @param {CallableFunction} setActiveDay - function to set activeDay
   */

  const handleActiveDay = (index) => {
    /**
     * Update activeDay
     */
    setActiveDay(index);
  };

  //Create Array with elements for side bar
  const sideBarElements = Object.entries(data).map(([day, dayData], index) => {
    return (
      <div
        className={`list-group list-group-flush border-bottom scrollarea`}
        key={`SideBar${index}`}
      >
        <a
          href="#"
          className={`list-group-item list-group-item-action py-3 ${
            activeDay === index ? style.active : ""
          }`}
          onClick={() => {
            handleActiveDay(index);
          }}
        >
          <div
            className={`d-flex w-100 align-items-center justify-content-between`}
          >
            <strong className="mb-1">{day}</strong>
            <small>{dayData["dayName"]}</small>
          </div>
        </a>
      </div>
    );
  });

  return (
    <div className="col-lg-2 col-md-4 col-sm-12">
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 mt-4">
        {sideBarElements}
      </div>
    </div>
  );
}
