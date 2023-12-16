import React from "react";

function Spinner() {
  return (
    <div className="flex items-center justify-center fixed left-0 top-0 right-0 bottom-0 z-50 bg-black opacity-50">
      <img src="/spinner.svg" alt="loader" className="h-24" />
    </div>
  );
}

export default Spinner;
