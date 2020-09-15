import React from "react";

const Footer = () => {
  return (
    <footer class="text-gray-700 body-font">
      <div class="bg-gray-200">
        <div class="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
          <a
            href="https://www.google.com/"
            class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
          >
            <i className="fas fa-book-reader"></i>
            <span class="ml-3 text-xl">CrowdSource News</span>
          </a>
          <p class="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
            © 2020 CrowdSource | All Rights Reserved
          </p>
          <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a href="https://www.google.com/" class="text-gray-500">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.google.com/" class="ml-3 text-gray-500">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="https://www.google.com/" class="ml-3 text-gray-500">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.google.com/" class="ml-3 text-gray-500">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
