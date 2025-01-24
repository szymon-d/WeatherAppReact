import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Navbar/Navbar";
import MainContent from "../MainContent/MainContent";
import React, { createContext, useState, useContext, useRef } from "react";

export default function Layout() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar setSearchQuery={setSearchQuery}></Navbar>
      <MainContent searchQuery={searchQuery}></MainContent>
    </>
  );
}
