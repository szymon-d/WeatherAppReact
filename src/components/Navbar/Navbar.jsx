import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Navbar.module.css";
import React, { useState, useRef, createContext, useContext } from "react";

export default function Navbar({ setSearchQuery }) {
  /**
   * Top navbar components
   */

  //Hooks
  const [activeTab, setActiveTab] = useState(0);
  const searchBar = useRef(null);

  const handleSetActiveTab = (index) => {
    /**
     * Set active tab index
     *
     * @param {Number} index - tab index
     */
    setActiveTab((previousState) => {
      return index;
    });
  };

  const handleSearchBar = (event) => {
    /**
     * Triggered after "keyDown" in searchbar
     *
     * Update hook if user press "Enter"
     */

    if (event.key == "Enter") {
      setSearchQuery(searchBar.current.value);
    }
  };

  //NavBar navigation elements
  var navbarElements = ["Home", "Placeholder1", "Placeholder2"];
  navbarElements = navbarElements.map((element, index) => {
    return (
      <li className="nav-item" key={index}>
        <a
          className={`nav-link ${index == activeTab ? "active" : ""}`}
          onClick={() => {
            handleSetActiveTab(index);
          }}
        >
          {element}
        </a>
      </li>
    );
  });

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-dark w-100 p-3 d-flex justify-content-between ${styles.navbarPrimary1}`}
    >
      {/* Brand */}
      <div className="navbar-brand">WeatherApp</div>

      {/* Navbars elemments */}
      <div className="ms-5 me-5 collapse navbar-collapse">
        <ul className="navbar-nav">{navbarElements}</ul>
      </div>

      {/* SearchBar */}
      <div className="input-group">
        <input
          ref={searchBar}
          className={"form-control"}
          placeholder="Search place"
          onKeyDown={handleSearchBar}
          defaultValue=""
        ></input>
      </div>

      <div className="ms-5 me-5 nav-item active">
        <a className="nav-link">Login</a>
      </div>
    </nav>
  );
}
