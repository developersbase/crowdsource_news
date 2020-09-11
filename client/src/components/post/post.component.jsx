import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getPost } from "../../redux/reducers/posts/posts.actions";
import { useEffect } from "react";

const Post = ({ getPost, post: { post }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return (
    <div className="container w-full md:max-w-3xl mx-auto pt-20">
      <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
        <div className="font-sans">
          <span className="text-base md:text-sm text-teal-500 font-bold">
            &lt;
          </span>
          <p>
            {" "}
            <a
              href="#"
              className="text-base md:text-sm text-teal-500 font-bold no-underline hover:underline"
            >
              BACK TO FEED
            </a>
          </p>
          <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
            {post.title}
          </h1>
          <p className="text-sm md:text-base font-normal text-gray-600">
            Published 19 February 2019
          </p>
        </div>
      </div>

      <div className="text-base md:text-sm text-gray-500 px-4 py-6">
        Tags:{" "}
        <a
          href="#"
          className="text-base md:text-sm text-teal-500 no-underline hover:underline"
        >
          Link
        </a>{" "}
        .{" "}
        <a
          href="#"
          className="text-base md:text-sm text-teal-500 no-underline hover:underline"
        >
          Link
        </a>
      </div>

      <hr className="border-b-2 border-gray-400 mb-8 mx-4" />

      <div className="container px-4">
        <div className="font-sans bg-white rounded-lg shadow-md p-4 text-center">
          <h2 className="font-bold break-normal text-xl md:text-3xl">
            Subscribe to my Newsletter
          </h2>
          <h3 className="font-bold break-normal font-normal text-gray-600 text-sm md:text-base">
            Get the latest posts delivered right to your inbox
          </h3>
          <div className="w-full text-center pt-4">
            <form action="#">
              <div className="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                <input
                  type="email"
                  placeholder="youremail@example.com"
                  className="flex-1 mt-4 appearance-none border border-gray-400 rounded shadow-md p-3 text-gray-600 mr-2 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex-1 mt-4 block md:inline-block appearance-none bg-teal-500 text-white text-base font-semibold tracking-wider uppercase py-4 rounded shadow hover:bg-teal-400"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center font-sans px-4 py-12">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src="http://i.pravatar.cc/300"
          alt="Avatar of Author"
        />
        <div className="flex-1 px-2">
          <p className="text-base font-bold text-base md:text-xl leading-none mb-2">
            Jo Bloggerson
          </p>
          <p className="text-gray-600 text-xs md:text-base">
            Minimal Blog Tailwind CSS template by{" "}
            <a
              className="text-teal-500 no-underline hover:underline"
              href="https://www.tailwindtoolbox.com"
            >
              TailwindToolbox.com
            </a>
          </p>
        </div>
        <div className="justify-end">
          <button className="bg-transparent border border-gray-500 hover:border-teal-500 text-xs text-gray-500 hover:text-teal-500 font-bold py-2 px-4 rounded-full">
            Read More
          </button>
        </div>
      </div>

      <hr className="border-b-2 border-gray-400 mb-8 mx-4" />

      <div className="font-sans flex justify-between content-center px-4 pb-12">
        <div className="text-left">
          <span className="text-xs md:text-sm font-normal text-gray-600">
            &lt; Previous Post
          </span>
          <br />
          <p>
            <a
              href="#"
              className="break-normal text-base md:text-sm text-teal-500 font-bold no-underline hover:underline"
            >
              Blog title
            </a>
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs md:text-sm font-normal text-gray-600">
            Next Post &gt;
          </span>
          <br />
          <p>
            <a
              href="#"
              className="break-normal text-base md:text-sm text-teal-500 font-bold no-underline hover:underline"
            >
              Blog title
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
