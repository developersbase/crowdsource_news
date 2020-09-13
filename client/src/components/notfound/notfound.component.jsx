import React from "react";
import { Link } from "react-router-dom";

function NotFound(props) {
  return (
    <section className="text-gray-700 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            You've landed in no man's land :(
          </h1>
          <div className="flex justify-center">
            <Link
              to="/"
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Go to Feed
            </Link>
            <Link
              to="/login"
              className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
