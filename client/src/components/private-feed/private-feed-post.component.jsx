import React from "react";
//import Moment from "moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//import { connect } from "react-redux";

import "./private-feed-post.styles.scss";

const PrivateFeedPost = ({ post: { _id, title, body } }) => {
  const { date, month, year } = _id.created;
  return (
    <div className="p-8 m-5 flex flex-wrap items-center justify-center md:flex-no-wrap feed-post border-2 rounded-md border-blue-500">
      <div className="md:w-64 md:mb-0 mb-6 flex-shrink-1 flex">
        <div className="flex flex-col w-1/4 mx-1">
          <span className="tracking-widest text-center text-gray-900">
            Corona
          </span>
          <span className="mt-1 text-gray-500 text-sm">
            {date}/{month}/{year}
          </span>
        </div>
        <div className="flex flex-col w-1/4 mx-1">
          <span className="tracking-widest text-center text-gray-900">
            Votes
          </span>
          <span className="mt-1 text-gray-800 text-sm text-center">5</span>
        </div>
        <div className="flex flex-col w-1/4">
          <span className="tracking-widest text-center text-gray-900">
            Comments
          </span>
          <span className="mt-1 text-gray-800 text-sm text-center">50k</span>
        </div>
      </div>

      <div className="md:flex-grow">
        <h2 className="text-2xl text-gray-900">{title}</h2>
        <p className="leading-relaxed">
          {body.length > 100 ? body.substring(0, 100) + "..." : body}
        </p>
        <Link to={`/${_id.uuid}`} className="text-indigo-500 mt-4">
          Read News <i className="fas fa-arrow-right"></i>
        </Link>{" "}
      </div>
    </div>
    // <section class="bg-white py-4 font-sans">
    //   <div class="container m-auto flex flex-wrap md:flex-no-wrap items-center justify-center">
    //     <h1 class="w-full md:w-1/4 font-medium tracking-normal mb-4 md:mb-0">
    //       Important
    //       <br />
    //       Stats
    //     </h1>
    //     <div class="w-1/3 md:w-1/4">
    //       <span class="text-xs inline-block mr-2 uppercase text-gray-900 tracking-wide">
    //       {date}/{month}/{year}
    //       </span>
    //       <h2 class="inline-block">34%</h2>
    //     </div>
    //     <div class="w-1/3 md:w-1/4">
    //       <span class="text-xs inline-block mr-2 uppercase text-gray-900 tracking-wide">
    //         pageviews
    //       </span>
    //       <h2 class="inline-block">465</h2>
    //     </div>
    //     <div class="w-1/3 md:w-1/4">
    //       <span class="text-xs inline-block mr-2 uppercase text-gray-900 tracking-wide">
    //         influence
    //       </span>
    //       <h2 class="inline-block">65%</h2>
    //     </div>
    //   </div>
    // </section>
  );
};

export default PrivateFeedPost;

PrivateFeedPost.propTypes = {
  post: PropTypes.object.isRequired,
};

//const mapStateToProps = (state) => ({});

//export default connect(mapStateToProps, mapDispatchToProps)(FeedPost);
