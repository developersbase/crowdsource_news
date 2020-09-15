import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addComment } from "../../redux/reducers/posts/posts.actions";

const CommentForm = ({ addComment, postId }) => {
  const [body, setText] = useState("");
  return (
    <div className="flex mx-auto items-center justify-center mx-8 mb-4">
      <form
        className="w-full bg-white rounded-lg px-4 pt-2"
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { body });
          setText("");
        }}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
            Comment on this post
          </h2>
          <div className="w-full md:w-full px-3 mb-2 mt-2">
            <textarea
              className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
              placeholder="What are your thoughts on this?"
              name="text"
              value={body}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="w-full md:w-full flex items-start md:w-full px-3">
            <button
              className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
              type="submit"
            >
              Post Comment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
