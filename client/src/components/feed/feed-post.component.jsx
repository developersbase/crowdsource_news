import React from "react";
import Moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//import { connect } from "react-redux";

const FeedPost = ({
  post: {
    _id: { uuid },
    title,
    body,
  },
}) => {
  return (
    <div class="py-8 flex flex-wrap md:flex-no-wrap">
      <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span class="tracking-widest text-gray-900">Corona</span>
        <span class="mt-1 text-gray-500 text-sm">
          {Moment().format("MMM Do YYYY")}
        </span>
      </div>
      <div class="md:flex-grow">
        <h2 class="text-2xl text-gray-900 mb-2">{title}</h2>
        <p class="leading-relaxed">{body}</p>
        <Link to={`/`} class="text-indigo-500 mt-4">
          Read News <i class="fas fa-arrow-right"></i>
        </Link>{" "}
      </div>
    </div>
  );
};

export default FeedPost;

FeedPost.propTypes = {
  post: PropTypes.object.isRequired,
};

//const mapStateToProps = (state) => ({});

//export default connect(mapStateToProps, mapDispatchToProps)(FeedPost);
