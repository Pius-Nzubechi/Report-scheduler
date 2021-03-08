import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {" "}
          Report Builder
        </Link>
        <div className="navbar-brand">
          <Link
            style={{
              color: "black",
              fontSize: "light",
            }}
            to="/report"
          >
            Current Scheduled Reports
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
