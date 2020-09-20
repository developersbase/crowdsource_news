import React from "react";
//import Moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//import { connect } from "react-redux";

import "./feed-post.styles.scss";

const FeedPost = ({ post: { _id, title, body } }) => {
  const { date, month, year } = _id.created;
  return (
    <div className="py-8 flex items-center flex-wrap md:flex-no-wrap feed-post">
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
        <span className="tracking-widest text-gray-900">Corona</span>
        <span className="mt-1 text-gray-500 text-sm">
          {date}/{month}/{year}
        </span>
      </div>
      <div className="md:flex-grow">
        <h2 className="text-2xl text-gray-900 mb-2">{title}</h2>
        <p className="leading-relaxed">
          {body.length > 100 ? body.substring(0, 100) + "..." : body}
        </p>
        <Link to={`/${_id.uuid}`} className="text-indigo-500 mt-4">
          Read News <i className="fas fa-arrow-right"></i>
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
