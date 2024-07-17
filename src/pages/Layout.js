import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
// import "../css/appp.css";
import "../App.css"
// import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => {
  const [logout, setLogout] = React.useState(false);
  const { theme, setTheme } = useContext(ThemeContext);


  useEffect(() => {
    if (
      !localStorage.getItem("client") &&
      !localStorage.getItem("auth") &&
      !localStorage.getItem("user")
    ) {
      Navigate("/login");
    }
  }, [logout]);

  useEffect(() => {
    document.body.classList.add("main-body");
    return () => {
      document.body.classList.remove("my-body-class");
      document.body.classList.remove("myntra-forward");
      document.body.classList.remove("Flipkart");
      document.body.classList.remove("Myntra-asp");
      document.body.classList.remove("Amazon-asp");
    };
  }, []);
  // document.body.classList.add("main-body");


  
  const Navigate = useNavigate();

  // useEffect(() => {
  //   if (
  //     !localStorage.getItem("client") &&
  //     !localStorage.getItem("auth") &&
  //     !localStorage.getItem("user")
  //   ) {
  //     Navigate("/login");
  //   }
  // }, [logout]);

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth");
    localStorage.removeItem("client");
    localStorage.removeItem("user");
    setLogout(true);
  };

  const dropdownEvent = (name) => {
    setTheme(name);
  };

  const a = (
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <Link
          class="nav-link dropdown-toggle"
          to="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Asp calculator
        </Link>
        <ul class="dropdown-menu">
          <li>
            <Link class="dropdown-item" value="hi" to="/aspcalculator">
              Myntra
            </Link>
          </li>
          <li>
            <Link class="dropdown-item" to="#">
              Flipkart
            </Link>
          </li>
          <li>
            <Link class="dropdown-item" to="#">
              Amazon
            </Link>
          </li>
        </ul>
      </li>
      <li class="nav-item dropdown">
        <Link
          class="nav-link dropdown-toggle"
          to="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Asp Finder
        </Link>
        <ul class="dropdown-menu">
          <li>
            <Link class="dropdown-item" to="/aspfinderflipkart">
              Flipkart
            </Link>
          </li>
          <li>
            <Link class="dropdown-item" to="aspfindermyntra">
              Myntra
            </Link>
          </li>
          <li>
            <Link
              class="dropdown-item"
              to="aspfindereasyship"
              onClick={() => dropdownEvent("volvo")}
            >
              Amazon - Easy Ship
            </Link>
          </li>
          <li>
            <Link
              class="dropdown-item"
              to="aspfinderprimeonly"
              onClick={() => dropdownEvent("saab")}
            >
              Amazon - Prime Only
            </Link>
          </li>
          <li>
            <Link
              class="dropdown-item"
              to="aspfinderfba"
              onClick={() => dropdownEvent("mercedes")}
            >
              Amazon - FBA
            </Link>
          </li>
        </ul>
      </li>
      <li class="nav-item">
        <Link
          class="nav-link-00"
          id="4545"
          to="#"
          style={{ "margin-left": "966px" }}
          onClick={logoutHandler}
        >
          Sign out
        </Link>
      </li>
    </ul>
  );
  const b = (
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <Link
          class="nav-link dropdown-toggle"
          to="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Asp calculator
        </Link>
        <ul class="dropdown-menu">
          <li>
            <Link class="dropdown-item" value="hi" to="/aspcalculator">
              Myntra
            </Link>
          </li>
          <li>
            <Link class="dropdown-item" to="#">
              Flipkart
            </Link>
          </li>
          <li>
            <Link class="dropdown-item" to="#">
              Amazon
            </Link>
          </li>
        </ul>
      </li>

      <li class="nav-item">
        <Link
          class="nav-link-00"
          id="4545"
          to="#"
          style={{ "margin-left": "966px" }}
          onClick={logoutHandler}
        >
          Sign out
        </Link>
      </li>
    </ul>
  );

  return (
    <div id="start">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link class="navbar-brand" to="#">
            Brand Fortunes
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            {localStorage.getItem("client") ? b : a}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
