import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../redux/reducers/auth/auth.actions";

import "./header.styles.scss";

function Header({ auth: { isAuthenticated, loading, user }, logout }) {
  const authLinks = (
    <nav className="md:ml-auto flex flex-wrap items-center justify-center">
      <Link to="/" className="mr-5 hover:text-gray-900">
        Feed
      </Link>
      <Link to="/publish" className="mr-5 hover:text-gray-900">
        Publish
      </Link>
      <Link to="/pending" className="mr-5 hover:text-gray-900">
        Pending
      </Link>
      <Link
        onClick={logout}
        to="/login"
        className="mr-5 hover:text-gray-900 flex items-center justify-center"
      >
        <i className="fas fa-sign-out-alt px-1"></i>
        <span>Log Out</span>
      </Link>
      {user ? <p>Hi, {user.username}</p> : <></>}
    </nav>
  );

  const guestLinks = (
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <Link to="/" className="mr-5 hover:text-gray-900">
        Feed
      </Link>
      <Link to="/login" className="mr-5 hover:text-gray-900">
        Log In
      </Link>
      <Link to="/signup" className="mr-5 hover:text-gray-900">
        Sign Up
      </Link>
    </nav>
  );
  return (
    <header className="bg-gradient-to-r from-red-500 to-orange-500 text-white header">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <span className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <i className="fas fa-book-reader"></i>
          <span className="ml-3 text-xl">
            {" "}
            <Link to="/" className="mr-5 hover:text-gray-900">
              CrowdSource News
            </Link>
          </span>
        </span>
        {!loading && isAuthenticated ? authLinks : guestLinks}
      </div>
    </header>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
