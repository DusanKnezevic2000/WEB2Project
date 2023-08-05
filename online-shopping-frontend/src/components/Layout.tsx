import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-primary">
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                <b className="text-light">Home</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <b className="text-light">Log In</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                <b className="text-light">Profile</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addArticle">
                <b className="text-light">Add Article</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/newOrder">
                <b className="text-light">New Order</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/previousOrders">
                <b className="text-light">Previous Orders</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/verification">
                <b className="text-light">Verification</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/newOrders">
                <b className="text-light">New Orders</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/allOrders">
                <b className="text-light">All Orders</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/*">
                <b className="text-light">Message</b>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
