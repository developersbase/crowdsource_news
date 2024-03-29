import React, { useEffect } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getPosts } from "../../redux/reducers/posts/posts.actions";

import FeedPost from "./feed-post.component";
import Spinner from "../spinner/spinner.component";

import "./feed.styles.scss";

const Feed = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <section className="text-gray-700 overflow-hidden feed">
      <div className="container px-8 lg:px-32 py-24 mx-auto">
        {posts.map((post) => (
          <FeedPost key={post._id.uuid} post={post} />
        ))}
      </div>
    </section>
  );
};

Feed.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Feed);
