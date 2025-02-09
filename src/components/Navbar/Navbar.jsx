import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Navbar.module.css";
import React, { useState, useRef, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ setSearchQuery }) {
  /**
   * Top navbar components
   *
   * @param {CallableFunction} setSearchQuery - function to update search query from top bar
   */

  //Hooks
  const [activeTab, setActiveTab] = useState(0);
  const searchBar = useRef(null);
  const navigator = useNavigate();

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
      setActiveTab(0);
      navigator("/");
      setSearchQuery(searchBar.current.value);
    }
  };

  //NavBar navigation elements
  const elements = { Home: "/" };

  const navbarElements = [];
  Object.entries(elements).forEach(([name, url], index) => {
    navbarElements.push(
      <li className="nav-item" key={`navbarElement${index}`}>
        <a
          className={`nav-link ${index == activeTab ? "active" : ""}`}
          onClick={() => {
            handleSetActiveTab(index);
          }}
          href={url}
        >
          {name}
        </a>
      </li>
    );
  });

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-dark w-100 p-3 d-flex justify-content-between ${styles.navbarPrimary1}`}
    >
      {/* Brand */}
      <div className="navbar-brand"></div>

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
        <a className="nav-link">Login1</a>
      </div>
    </nav>
  );
}
