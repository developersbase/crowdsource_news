import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-700 body-font">
      <div className="bg-gray-200">
        <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
          <a
            href="https://www.google.com/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
          >
            <i className="fas fa-book-reader"></i>
            <span className="ml-3 text-xl">CrowdSource News</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
            © 2020 CrowdSource | All Rights Reserved
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a href="https://www.google.com/" className="text-gray-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.google.com/" className="ml-3 text-gray-500">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.google.com/" className="ml-3 text-gray-500">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.google.com/" className="ml-3 text-gray-500">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
