import React from "react";
import spinner from "./Spinner.gif";

export default () => (
  <>
    <img
      src={spinner}
      style={{ margin: "auto", display: "block" }}
      alt="loading..."
    />
  </>
);
