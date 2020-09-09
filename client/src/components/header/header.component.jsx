import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./header.styles.scss";

function Header(props) {
  return (
    <header class="text-black body-font header">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <i class="fas fa-book-reader"></i>
          <span class="ml-3 text-xl">
            {" "}
            <Link to="/" class="mr-5 hover:text-gray-900">
              CrowdSource News
            </Link>
          </span>
        </a>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/" class="mr-5 hover:text-gray-900">
            Feed
          </Link>
          <Link to="/publish" class="mr-5 hover:text-gray-900">
            Publish
          </Link>
          <Link to="/login" class="mr-5 hover:text-gray-900">
            Log In
          </Link>
          <Link to="/signup" class="mr-5 hover:text-gray-900">
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {};

export default Header;
