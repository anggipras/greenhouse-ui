import React from "react";
import Button from "./common/button";
import { scrollToDynamicView } from "@/lib/utils/scrollViewFunc";

const Hero = () => {
  return (
    <div className="relative w-full h-[720px] max-h-screen overflow-hidden">
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "720px" }}
      >
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/KT8-ARswSoU?autoplay=1&loop=1&controls=0&mute=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-green-950 to-transparent" />

      <div className="absolute inset-0 max-w-desktop mx-auto h-full">
        <div className="flex relative flex-col justify-center text-center medium:text-start items-center medium:items-start h-full max-w-3xl px-6 text-white mx-auto">
          <div className="w-fit px-3.5 py-2 bg-white bg-opacity-25 rounded-md mb-4 animate-fade-down [animation-delay:_500ms]">
            Find The Best Role
          </div>
          <div className="mb-4 medium:mb-6 animate-fade-up typo-h1">
            Search. Apply. Get hired. Do it all on the Greenhouse !
          </div>
          <div className="leading-6.5 mb-4 medium:mb-6 animate-fade-down [animation-delay:_500ms]">
            Unlock the full potential of your job search with personalized
            recommendations, application reminders, and seamless application
            tracking—all at your fingertips.
          </div>
          <Button
            onClick={() => {
              scrollToDynamicView("jobs");
            }}
            size="medium"
            width="w-fit"
          >
            <span>See Jobs</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
