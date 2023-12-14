import React from "react";

function Headline({ title }) {
  return (
    <div
      className="my-4 before:border-t flex before:flex-1
     after:border-t  after:flex-1 items-center"
    >
      <h2 className="text-center text-xl font-semibold mx-2 text-white">
        {title}
      </h2>
    </div>
  );
}

export default Headline;
