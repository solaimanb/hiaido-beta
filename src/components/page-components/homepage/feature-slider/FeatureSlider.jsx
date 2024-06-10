"use client";

import { motion } from "framer-motion";
import { useAnimationFrame, useMotionValue } from "framer-motion";
import Marquee from "react-fast-marquee";

import "./featureSlider.css";

import { useEffect, useRef, useState } from "react";

import Sliders from "./sliderInfo.json";

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
};

const FeatureSlider = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMdScreen, setIsMdScreen] = useState(window.innerWidth >= 768);

  const handleResize = () => {
    setIsMdScreen(window.innerWidth >= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  return (
    <section className="flex items-center justify-center">
      <Marquee className="min-h-screen">
        {Sliders?.map((slider, index) =>
          (index !== 0 || (index === 0 && isMdScreen)) &&
          (index !== 1 || (index === 1 && isMdScreen)) ? (
            <div
              key={index}
              className={index !== 0 && index !== 1 ? "py-10" : ""}
            >
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
                        ? "bold-title absolute -top-10 text-xl font-bold text-center w-full md:text-3xl"
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
      </Marquee>

      {/* <Swiper
        ref={swiperRef}
        direction="horizontal"
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Navigation]}
        className="flex items-center feature-slider"
        spaceBetween={20}
        breakpoints={{
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
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {sliders.map((slider, index) =>
          (index !== 0 || (index === 0 && isMdScreen)) &&
          (index !== 1 || (index === 1 && isMdScreen)) ? (
            <SwiperSlide
              key={index}
              className={index !== 0 && index !== 1 ? "" : ""}
              onClick={() => handleSlideClick(index)}
            >
              <div
                className={
                  index !== 0 && index !== 1
                    ? "relative py-20 flex flex-col gap-10 text-[#F9F7ED]"
                    : ""
                }
              >
                {(hoveredIndex === index || activeIndex === index) && (
                  <div
                    className={
                      index !== 0 && index !== 1
                        ? "absolute top-0 text-xl font-bold text-center w-full md:text-2xl"
                        : ""
                    }
                  >
                    {slider?.title}
                  </div>
                )}

                <div
                  className={`${index !== 0 && index !== 1 ? "p-6" : ""} ${
                    hoveredIndex === index || activeIndex === index
                      ? "relative border-8 rounded p-6 border-[#03FF80]"
                      : "border-8 border-transparent"
                  } `}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setActiveIndex(index)}
                >
                  <div
                    className={
                      index !== 0 && index !== 1
                        ? "p-4 md:p-14 bg-[#F9F7ED] rounded-xl"
                        : ""
                    }
                  >
                    <img
                      src={slider?.image}
                      alt=""
                      className={
                        index !== 0 && index !== 1 ? "object-cover w-40" : ""
                      }
                    />
                  </div>

                  <span
                    className={`${index !== 0 && index !== 1 ? "" : ""} ${
                      (hoveredIndex === index || activeIndex === index) &&
                      "absolute p-3 -top-2 left-[45%] bg-dark"
                    }`}
                  ></span>

                  <span
                    className={`${index !== 0 && index !== 1 ? "" : ""} ${
                      (hoveredIndex === index || activeIndex === index) &&
                      "absolute p-3 -bottom-2 left-[45%] bg-dark"
                    }`}
                  ></span>
                </div>

                {(hoveredIndex === index || activeIndex === index) && (
                  <div
                    className={
                      index !== 0 && index !== 1
                        ? "absolute -bottom-10 text-sm font-bold text-center w-full"
                        : ""
                    }
                  >
                    {slider?.description}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ) : null
        )}
      </Swiper> */}
    </section>
  );
};

export default FeatureSlider;
