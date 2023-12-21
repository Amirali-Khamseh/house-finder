import React from "react";

function VideoHeroSection() {
  return (
    <div className=" w-full h-[150px] md:h-[400px] flex justify-center items-start">
      <div className=" w-full h-full relative">
        <div className="absolute inset-0 bg-black opacity-100 z-10"></div>
        <video
          src="/landingPage-video.mp4"
          className="w-full h-full object-cover absolute z-20"
          autoPlay
          loop
          muted
        ></video>
      </div>
    </div>
  );
}

export default VideoHeroSection;
