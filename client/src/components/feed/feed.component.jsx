import React from "react";
import Moment from "moment";
import PropTypes from "prop-types";

import "./feed.styles.scss";

function Feed(props) {
  return (
    <section class="text-gray-700 body-font overflow-hidden feed">
      <div class="container px-8 lg:px-32 py-24 mx-auto">
        <div class="-my-8">
          <div class="py-8 flex flex-wrap md:flex-no-wrap">
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span class="tracking-widest font-medium title-font text-gray-900">
                CATEGORY
              </span>
              <span class="mt-1 text-gray-500 text-sm">
                {Moment().format("MMM Do YYYY")}
              </span>
            </div>
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                এখনো স্কুল খোলার সিদ্ধান্ত হয়নি
              </h2>
              <p class="leading-relaxed">
                প্রাথমিক ও গণশিক্ষা মন্ত্রণালয়ের জ্যেষ্ঠ সচিব আকরাম-আল-হোসেন
                বলেছেন, এখন পর্যন্ত স্কুল খোলার পরিবেশ তৈরি হয়নি। স্কুল খোলার
                সিদ্ধান্তও এখনো হয়নি। তবে স্কুল খোলার আগে প্রতিটি স্কুলের প্রধান
                শিক্ষক কোন কোন নির্দেশনা অনুসরণ করবেন, সেটি জানিয়ে দেওয়া হয়েছে।
              </p>
              <a class="text-indigo-500 inline-flex items-center mt-4">
                Read News
              </a>{" "}
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
          <div class="py-8 flex border-t-2 border-gray-200 flex-wrap md:flex-no-wrap">
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span class="tracking-widest font-medium title-font text-gray-900">
                CATEGORY
              </span>
              <span class="mt-1 text-gray-500 text-sm">
                {Moment().format("MMM Do YYYY")}
              </span>
            </div>
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                সোনার দাম আবার বাড়ছে, ভরি ৭৪ হাজার টাকা
              </h2>
              <p class="leading-relaxed">
                দেশের বুলিয়ন মার্কেটে দাম বৃদ্ধির কারণ দেখিয়ে সোনার দাম ভরিতে ১
                হাজার ৭৫০ টাকা বৃদ্ধি করার সিদ্ধান্ত নিয়েছে বাংলাদেশ জুয়েলার্স
                সমিতি। তাতে ভালো মানের অর্থাৎ ২২ ক্যারেটের এক ভরি সোনার অলংকার
                কিনতে লাগবে ৭৪ হাজার ৮ টাকা। নতুন দর বৃহস্পতিবার থেকে সারা দেশে
                কার্যকর হচ্ছে।
              </p>
              <a class="text-indigo-500 inline-flex items-center mt-4">
                Read News
              </a>{" "}
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
          <div class="py-8 flex border-t-2 border-gray-200 flex-wrap md:flex-no-wrap">
            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span class="tracking-widest font-medium title-font text-gray-900">
                CATEGORY
              </span>
              <span class="mt-1 text-gray-500 text-sm">
                {Moment().format("MMM Do YYYY")}
              </span>
            </div>
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                সারাও কি সুশান্তের সঙ্গে গাঁজা খেতেন?
              </h2>
              <p class="leading-relaxed">
                সুশান্ত সিং রাজপুতের মৃত্যুর সঙ্গে মাদকের গভীর যোগসাজশ আছে বলে
                সিবিআইয়ের তদন্তে উঠে এসেছে। কেননা, যাঁর বাইপোরার ডিজঅর্ডার আছে,
                যিনি নিয়মিত ওষুধ খান, তিনি যদি মাদক নেন, সেটা তাঁর ভেতর
                আত্মহত্যার প্রবণতা সৃষ্টি করে।
              </p>
              <a class="text-indigo-500 inline-flex items-center mt-4">
                Read News
              </a>{" "}
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Feed.propTypes = {};

export default Feed;
