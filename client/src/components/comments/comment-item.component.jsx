import React from "react";
//import { connect } from "react-redux";

//import Replies from "../replies/replies.component";

const CommentItem = ({ comment: { body, author } }) => {
  return (
    <section className="container m-auto px-8 md:px-0 py-8">
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
                  {author}
                </a>
              </span>
              <span className="text-gray-700">@snick</span>
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
                <a
                  href="https://www.google.com/"
                  className="text-gray-500 no-underline hover:text-black"
                >
                  <i className="fa fa-comment fa-md mr-1"></i>2
                </a>
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
            {/* <hr className="border-b" /> */}
            {/* <Replies /> */}
            {/* <hr className="border-b" /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

//const mapStateToProps = (state) => ({});

export default CommentItem;
//export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
