"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useAnimationFrame, useMotionValue } from "framer-motion";

import "./featureSlider.css";

// import required modules
import { Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";

import Sliders from "./sliderInfo.json";

import { motion } from "framer-motion";

// Dynamic import for image assets
import {
  cloudEngineer,
  webPortal,
  naturalLanguage,
  universalSearch,
  einsteinCloud,
  multiCloud,
  jiraIntegration,
  alerts,
  sandhAi,
  devOpsSuite,
} from "../../../../assets/index";

const imageAssets = {
  cloudEngineer,
  webPortal,
  naturalLanguage,
  universalSearch,
  einsteinCloud,
  multiCloud,
  jiraIntegration,
  alerts,
  sandhAi,
  devOpsSuite,
};

const FeatureSlider = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMdScreen, setIsMdScreen] = useState(window.innerWidth >= 768);
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const swiperRef = useRef(null);

  const handleResize = () => {
    setIsMdScreen(window.innerWidth >= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (hoveredIndex !== null) {
      setCurrentTitle(Sliders[hoveredIndex]?.title);
      setCurrentDescription(Sliders[hoveredIndex]?.description);
    } else if (activeIndex !== null) {
      setCurrentTitle(Sliders[activeIndex]?.title);
      setCurrentDescription(Sliders[activeIndex]?.description);
    } else {
      setCurrentTitle("");
      setCurrentDescription("");
    }
  }, [hoveredIndex, activeIndex]);

  const baseX = useMotionValue(0);
  const directionFactor = useRef(1);
  const baseVelocity = 3;

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    baseX.set(baseX.get() - moveBy);
  });

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  const handleSlideClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const breakpoints = {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen mt-10">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        variants={variants}
        className="w-full md:h-40"
      >
        {(hoveredIndex !== null || activeIndex !== null) && (
          <div className="w-full text-3xl font-bold text-center text-glow bold-text md:text-6xl xl:text-7xl">
            {currentTitle.split("\n").map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        )}
      </motion.div>

      <div className="w-full">
        <Swiper
          ref={swiperRef}
          direction="horizontal"
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          modules={[Navigation]}
          className="feature-slider"
          spaceBetween={10}
          breakpoints={breakpoints}
        >
          {Sliders.map((slider, index) =>
            (index !== 0 || (index === 0 && isMdScreen)) &&
            (index !== 1 || (index === 1 && isMdScreen)) ? (
              <SwiperSlide
                key={index}
                className={index !== 0 && index !== 1 ? "w-full" : ""}
                onClick={() => handleSlideClick(index)}
              >
                <div
                  className={
                    index !== 0 && index !== 1
                      ? "relative py-4 flex flex-col  text-[#F9F7ED]"
                      : ""
                  }
                >
                  <div
                    className={`${index !== 0 && index !== 1 ? "p-6 " : ""} ${
                      hoveredIndex === index || activeIndex === index ? "" : ""
                    } `}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div
                      className={
                        index !== 0 && index !== 1
                          ? "p-4 md:p-14 rounded-xl"
                          : ""
                      }
                    >
                      <div
                        className={
                          index !== 0 && index !== 1
                            ? "min-w neon-bg transition-all duration-200"
                            : ""
                        }
                      >
                        <img
                          src={imageAssets[slider?.image]}
                          alt={imageAssets[slider?.image]}
                          className={
                            index !== 0 && index !== 1
                              ? "object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                              : "object-cover w-full h-full transition-all duration-300"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        variants={variants}
        className="h-40 max-w-2xl"
      >
        {(hoveredIndex !== null || activeIndex !== null) && (
          <div className="w-full text-lg font-bold text-center">
            {currentDescription}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default FeatureSlider;

{
  /* <Marquee className="min-h-screen">
        {Sliders?.map((slider, index) =>
          (index !== 0 || (index === 0 && isMdScreen)) &&
          (index !== 1 || (index === 1 && isMdScreen)) ? (
            <div
              key={index}
              className={index !== 0 && index !== 1 ? "py-10" : ""}
            >
              {(hoveredIndex === index || activeIndex === index) && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5 }}
                  variants={variants}
                  className={
                    index !== 0 && index !== 1
                      ? "bold-title absolute -top-10 text-xl font-bold text-center w-full md:text-6xl"
                      : ""
                  }
                >
                  {slider?.title}
                </motion.div>
              )}

              <div
                className={
                  index !== 0 && index !== 1
                    ? "relative flex flex-col text-[#F9F7ED]"
                    : ""
                }
              >
                {(hoveredIndex === index || activeIndex === index) && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                    variants={variants}
                    className={
                      index !== 0 && index !== 1
                        ? "bold-title absolute -top-10 text-xl font-bold text-center w-full md:text-5xl"
                        : ""
                    }
                  >
                    {slider?.title}
                  </motion.div>
                )}

                <div
                  className={`${index !== 0 && index !== 1 ? "p-6" : ""} ${
                    hoveredIndex === index || activeIndex === index
                      ? "relative"
                      : ""
                  } `}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() =>
                    setActiveIndex((prevIndex) =>
                      prevIndex === index ? null : index
                    )
                  }
                >
                  <div className={index !== 0 && index !== 1 ? "w-80" : ""}>
                    <img
                      src={imageAssets[slider?.image]}
                      alt={imageAssets[slider?.image]}
                      className={
                        index !== 0 && index !== 1
                          ? "object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                          : "object-cover w-full h-full transition-all duration-300"
                      }
                    />
                  </div>
                </div>

                {(hoveredIndex === index || activeIndex === index) && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                    variants={variants}
                    className={
                      index !== 0 && index !== 1
                        ? "absolute -bottom-10 text-sm font-bold text-center w-full"
                        : ""
                    }
                  >
                    {slider?.description}
                  </motion.div>
                )}
              </div>
            </div>
          ) : null
        )}
      </Marquee> */
}
