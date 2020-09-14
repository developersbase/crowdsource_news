import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../redux/reducers/auth/auth.actions";

import "./header.styles.scss";

function Header({ auth: { isAuthenticated, laoding, user }, logout }) {
  const authLinks = (
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
      <Link to="/" className="mr-5 hover:text-gray-900">
        Feed
      </Link>
      <Link to="/publish" className="mr-5 hover:text-gray-900">
        Publish
      </Link>
      <Link onClick={logout} to="/" className="mr-5 hover:text-gray-900">
        Log Out
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
    <header className="text-black body-font header">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <span className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <i className="fas fa-book-reader"></i>
          <span className="ml-3 text-xl">
            {" "}
            <Link to="/" className="mr-5 hover:text-gray-900">
              CrowdSource News
            </Link>
          </span>
        </span>
        {!laoding && <>{isAuthenticated ? authLinks : guestLinks}</>}
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
