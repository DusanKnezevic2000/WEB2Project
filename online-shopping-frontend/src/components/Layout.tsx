import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const [isCustomer, setIsCustomer] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSalesman, setIsSalesman] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    setUserLoggedIn();
    setCustomer();
    setAdmin();
    setSalesman();
    setApproved();
  }, []);

  const setUserLoggedIn = () => {
    if (
      localStorage.getItem("id") !== null &&
      localStorage.getItem("username") !== null &&
      localStorage.getItem("role") !== null &&
      localStorage.getItem("token") !== null &&
      localStorage.getItem("status") !== null
    ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const setCustomer = () => {
    if (localStorage.getItem("role") == "Customer") {
      setIsCustomer(true);
    } else {
      setIsCustomer(false);
    }
  };

  const setAdmin = () => {
    if (localStorage.getItem("role") == "Admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const setSalesman = () => {
    if (localStorage.getItem("role") == "Salesman") {
      setIsSalesman(true);
    } else {
      setIsSalesman(false);
    }
  };

  const setApproved = () => {
    if (localStorage.getItem("status") == "Approved") {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  };

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("status");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-primary">
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <b className="text-light">Register</b>
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <b className="text-light">Log In</b>
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <b className="text-light">Profile</b>
                </Link>
              </li>
            )}
            {isLoggedIn && isSalesman && isApproved && (
              <li className="nav-item">
                <Link className="nav-link" to="/addArticle">
                  <b className="text-light">Add Article</b>
                </Link>
              </li>
            )}
            {isLoggedIn && isCustomer && (
              <li className="nav-item">
                <Link className="nav-link" to="/newOrder">
                  <b className="text-light">New Order</b>
                </Link>
              </li>
            )}
            {isLoggedIn && (isCustomer || isSalesman) && isApproved && (
              <li className="nav-item">
                <Link className="nav-link" to="/previousOrders">
                  <b className="text-light">Previous Orders</b>
                </Link>
              </li>
            )}
            {isLoggedIn && isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/verification">
                  <b className="text-light">Verification</b>
                </Link>
              </li>
            )}
            {isLoggedIn && (isCustomer || isSalesman) && isApproved && (
              <li className="nav-item">
                <Link className="nav-link" to="/newOrders">
                  <b className="text-light">New Orders</b>
                </Link>
              </li>
            )}
            {isLoggedIn && isAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/allOrders">
                  <b className="text-light">All Orders</b>
                </Link>
              </li>
            )}
          </ul>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav justify-content-end">
              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={logOut}>
                    <b className="text-light">Log Out</b>
                  </Link>
                </li>
              )}
              <Link className="nav-link" to="/*"></Link>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
