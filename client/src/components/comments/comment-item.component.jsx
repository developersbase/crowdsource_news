import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ReplyItem from "../replies/reply-item.component";
import ReplyForm from "../replies/reply-form.component";

const CommentItem = ({ post: { post }, comment: { body, author, _id } }) => {
  function findCommentIndex(post, commentId) {
    return post.comments.findIndex((comment) => comment._id === commentId);
  }

  const [isToggled, setToggled] = useState(false);

  const toggleButton = () => setToggled(!isToggled);

  return (
    <section className="container m-auto px-8 md:px-0">
      <div className="flex py-3">
        <div className="w-1/8">
          <a
            href="https://www.google.com/"
            className="block rounded-full h-12 w-12 mr-2 bg-gray-300"
          >
            .
          </a>
        </div>
        <div className="w-7/8">
          <div className="flex justify-between">
            <div>
              <span>
                <a href="https://www.google.com/" className="text-black">
                  {post.author.username} --- {author}
                </a>
              </span>
              <span className="text-gray-700">·</span>
              <span className="text-gray-700">Sept 15</span>
            </div>
            <div>
              <a
                href="https://www.google.com/"
                className="text-gray-700 hover:text-black"
              >
                <i className="fa fa-chevron-down"></i>
              </a>
            </div>
          </div>
          <div>
            <p className="my-3 text-sm">{body}</p>
            <div className="pb-2">
              <span className="mr-4">
                <button
                  onClick={toggleButton}
                  className="text-gray-500 no-underline hover:text-black"
                >
                  Reply
                </button>
              </span>
              <span className="mr-4">
                <a
                  href="https://www.google.com/"
                  className="text-gray-500 no-underline hover:text-black"
                >
                  <i className="fas fa-caret-up fa-lg"></i>
                </a>
              </span>
              <span>
                <a
                  href="https://www.google.com/"
                  className="text-gray-500 no-underline hover:text-black"
                >
                  <i className="fas fa-caret-down fa-lg"></i>
                </a>
              </span>
            </div>
            <hr className="border-b w-full" />
            {post.comments[findCommentIndex(post, _id)].replies.map((reply) => (
              <ReplyItem key={reply._id} reply={reply} commentId={_id} />
            ))}
            {isToggled ? (
              <ReplyForm postId={post._id.uuid} commentId={_id} />
            ) : null}

            <hr className="border-b w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

CommentItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(CommentItem);
