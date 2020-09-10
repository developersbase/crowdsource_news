import React from "react";
import { Link } from "react-router-dom";

function NotFound(props) {
  return (
    <section class="text-gray-700 body-font">
      <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div class="text-center lg:w-2/3 w-full">
          <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            You've landed in no man's land :(
          </h1>
          <div class="flex justify-center">
            <Link
              to="/"
              class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Go to Feed
            </Link>
            <Link
              to="/login"
              class="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg"
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
