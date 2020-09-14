import React from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";

function Publish(props) {
  return (
    <section className="text-gray-700 relative bg-gray-300">
      <div className="container px-5 py-24 mx-auto flex justify-center">
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10">
          <h2 className="text-gray-900 text-lg mb-1 text-center">
            Publish an Article
          </h2>
          <input
            className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
            placeholder="Author"
            type="text"
          />
          <textarea
            className="bg-white rounded border border-gray-400 focus:outline-none h-32 focus:border-indigo-500 text-base px-4 py-2 mb-4 resize-none"
            placeholder="Write..."
          ></textarea>

          <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Publish
          </button>
        </div>
      </div>
    </section>
  );
}

Publish.propTypes = {};

export default Publish;
