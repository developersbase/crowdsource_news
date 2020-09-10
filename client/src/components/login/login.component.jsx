import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../redux/reducers/auth/auth.actions";

function Login({ login, isAuthenticated }) {
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    login({ email, password });
    console.log("Success");
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <section class="text-gray-700 relative bg-gray-300">
      <div class="container px-5 py-24 mx-auto flex justify-center">
        <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col justify-center items-center w-full mt-10 md:mt-0 relative z-10">
          <h2 class="text-gray-900 text-lg mb-1 text-center">Log In</h2>
          <form
            className="flex justify-center items-center flex-col"
            onSubmit={(e) => onSubmit(e)}
          >
            <input
              class="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
            <input
              class="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            />

            <input
              type="submit"
              className="text-white text-center bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              value="Login"
            />
          </form>
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
