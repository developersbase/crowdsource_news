import React from "react";
//import PropTypes from "prop-types";

const ReplyItem = ({ reply: { body } }) => {
  return (
    <>
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
          <div>
            <span>
              <a href="https://www.google.com/" className="text-black">
                Asif
              </a>
            </span>
            <span className="text-gray-700">·</span>
            <span className="text-gray-700">Sept 15</span>
          </div>
          <div>
            <p className="my-3 text-sm">{body}</p>
            <div className="pb-2">
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
          </div>
        </div>
      </div>
    </>
  );
};

//ReplyItem.propTypes = {};

export default ReplyItem;
