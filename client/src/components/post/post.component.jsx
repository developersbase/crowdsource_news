import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { getPost } from "../../redux/reducers/posts/posts.actions";

import "./post.styles.scss";

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, []);

  return loading || post === null ? (
    <>Loading</>
  ) : (
    <div className="container w-full md:max-w-3xl mx-auto pt-20 post">
      <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
        <div>
          <p>
            <Link
              to="/"
              className="md:text-sm text-teal-500 font-bold no-underline hover:underline"
            >
              BACK TO FEED
            </Link>
          </p>
          <h1 className="break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
            {post.title}
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Published on {post._id.created.date}/{post._id.created.month}/
            {post._id.created.year}
          </p>
        </div>
        <div className="py-6">{post.body}</div>
        {console.log(post)}
      </div>

      <div className="text-base md:text-sm text-gray-500 px-4 py-6">Tags:</div>

      <hr className="border-b-2 border-gray-400 mb-8 mx-4" />

      <div className="flex w-full items-center  px-4 py-5">
        <img
          className="w-10 h-10 rounded-full mr-4"
          src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          alt="Avatar of Author"
        />
        <div className="flex-1 px-2">
          <p className="text-base md:text-xl leading-none mb-2">
            {post.author}
          </p>
        </div>
        <div className="justify-end">
          <button className="bg-transparent border border-gray-500 hover:border-teal-500 text-xs text-gray-500 hover:text-teal-500 font-bold py-2 px-4 rounded-full">
            View Profile
          </button>
        </div>
      </div>

      <hr className="border-b-2 border-gray-400 mb-8 mx-4" />

      <div className=" flex justify-between content-center px-4 pb-12">
        <div className="text-left">
          <p>
            <a
              href="#"
              className="break-normal text-base md:text-sm text-teal-500 font-bold no-underline hover:underline"
            >
              Random News
            </a>
          </p>
        </div>
        <div className="text-right">
          <p>
            <a
              href="#"
              className="break-normal text-base md:text-sm text-teal-500 font-bold no-underline hover:underline"
            >
              Random News
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
