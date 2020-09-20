import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import { login } from "../../redux/reducers/auth/auth.actions";

function Login({ login, isAuthenticated }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: (values) => {
      const { email, password } = values;
      login({ email, password });
    },
  });
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container mx-auto px-4 h-full mt-8">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-gray-600 text-sm ">Sign in with</h6>
              </div>
              <div className="btn-wrapper text-center">
                <button
                  className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center  text-xs"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                >
                  {/* <img
                    alt="..."
                    className="w-5 mr-1"
                    src={require("assets/img/github.svg")}
                  /> */}
                  Facebook
                </button>
                <button
                  className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center  text-xs"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                >
                  {/* <img
                    alt="..."
                    className="w-5 mr-1"
                    src={require("assets/img/google.svg")}
                  /> */}
                  Google
                </button>
              </div>
              <hr className="mt-6 border-b-1 border-gray-400" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-gray-500 text-center mb-3 ">
                <small>Or sign in with credentials</small>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs  mb-2"
                    htmlFor="grid-password"
                  >
                    Email
                  </label>
                  <input
                    className={`px-3 py-3 placeholder-gray-700 text-gray-700 bg-white rounded text-sm shadow focus:outline-none w-full ${
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
                    style={{ transition: "all .15s ease" }}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-700">{formik.errors.email}</div>
                  ) : null}
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs  mb-2"
                    htmlFor="grid-password"
                  >
                    Password
                  </label>
                  <input
                    className={`px-3 py-3 placeholder-gray-700 text-gray-700 bg-white rounded text-sm shadow focus:outline-none w-full ${
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
                    style={{ transition: "all .15s ease" }}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-700">{formik.errors.password}</div>
                  ) : null}
                </div>
                {/* <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      className="form-checkbox text-gray-800 ml-1 w-5 h-5"
                      style={{ transition: "all .15s ease" }}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Remember me
                    </span>
                  </label>
                </div> */}

                <div className="text-center mt-6">
                  <button
                    className="bg-gray-900 text-white active:bg-gray-700 text-sm  uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    type="submit"
                    style={{ transition: "all .15s ease" }}
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap my-6">
            <div className="w-1/2">
              <a
                href="https://www.google.com"
                onClick={(e) => e.preventDefault()}
                className="text-gray-900"
              >
                <p>Forgot password?</p>
              </a>
            </div>
            <div className="w-1/2 text-right">
              <Link to="/signup" className="text-gray-900">
                Create new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.auth.errors,
});

export default connect(mapStateToProps, { login })(Login);
