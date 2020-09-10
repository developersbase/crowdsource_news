import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../../redux/reducers/auth/auth.actions";
import PropTypes from "prop-types";

function SignUp({ signup, isAuthenticated }) {
  const [formData, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { username, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (password != confirmPassword) {
      console.log("Passwords don't match");
    } else {
      signup({ username, email, password });
      console.log("Success");
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <section className="text-gray-700 relative bg-gray-300">
      <div className="container px-5 py-24 mx-auto flex justify-center">
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col justify-center items-center w-full mt-10 md:mt-0 relative z-10">
          <h2 className="text-gray-900 text-lg mb-1 text-center">Sign Up</h2>
          <form
            className="flex justify-center items-center flex-col"
            onSubmit={(e) => onSubmit(e)}
          >
            <input
              className="w-full bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => onChange(e)}
            />
            <input
              className="w-full bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
            <input
              className="w-full bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
            />
            <input
              className="w-full bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => onChange(e)}
            />
            <input
              type="submit"
              className="text-white text-center bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              value="Register"
            />
          </form>

          <p className="py-2">
            Already have an account?{" "}
            <Link to="/login" className="mr-5 hover:text-gray-900">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

SignUp.propTypes = {
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(SignUp);
