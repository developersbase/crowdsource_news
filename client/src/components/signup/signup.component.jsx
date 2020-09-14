import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import { signup } from "../../redux/reducers/auth/auth.actions";
import { setAlert } from "../../redux/reducers/alert/alert.actions";

import PropTypes from "prop-types";

function SignUp({ setAlert, signup, errors, isAuthenticated }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Username must be 15 characters or less")
        .required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),

    onSubmit: (values) => {
      const { username, email, password } = values;
      signup({ username, email, password });
    },
  });

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <section className="text-gray-700 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-5">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Sign Up
          </h1>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col items-center justify-center flex-wrap -m-2"
          >
            <div className="p-2 w-1/2">
              <input
                className={`w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 ${
                  formik.touched.username && formik.errors.username
                    ? "border border-red-400"
                    : ""
                }`}
                placeholder="Username"
                type="text"
                name="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-700">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="p-2 w-1/2">
              <input
                className={`w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 ${
                  formik.touched.email && formik.errors.email
                    ? "border border-red-400"
                    : ""
                }`}
                placeholder="Email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-700">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="p-2 w-1/2">
              <input
                className={`w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 ${
                  formik.touched.password && formik.errors.password
                    ? "border border-red-400"
                    : ""
                }`}
                placeholder="Password"
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-700">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="p-2 w-1/2">
              <input
                className={`w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border border-red-400"
                    : ""
                }`}
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-700">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div className="p-2 w-full">
              <button
                type="submit"
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="flex justify-center items-center py-2">
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
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { signup, setAlert })(SignUp);
