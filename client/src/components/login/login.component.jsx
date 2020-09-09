import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Login(props) {
  return (
    <section class="text-gray-700 relative bg-gray-300">
      <div class="container px-5 py-24 mx-auto flex justify-center">
        <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10">
          <h2 class="text-gray-900 text-lg mb-1 text-center">Login Up</h2>
          <input
            class="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
            placeholder="Email"
            type="email"
          />
          <input
            class="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
            placeholder="Password"
            type="password"
          />

          <button class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Login
          </button>
          <p class="py-2">
            Don't have an account?{" "}
            <Link to="/signup" class="mr-5 hover:text-gray-900">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

Login.propTypes = {};

export default Login;
