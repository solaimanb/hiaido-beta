import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useEffect, useRef, useState } from "react";
import Sliders from "./sliderInfo.json";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { useAnimationFrame, useMotionValue } from "framer-motion";
import { motion } from "framer-motion";

import "./featureSlider.css";

// Dynamic import for image assets
import {
  digitalWorkforce,
  smartUserInterface,
  intelligentChatbot,
  cloudSearchEverywhere,
  einsteinFramework,
  multiCloudConnectivity,
  smarkTaskMangement,
  alerts,
  sandhAi,
  dataMigration,
  securityAutomated,
  devOpsSuite,
  blockchainBasedSecurityLedger,
  chaosEngineering,
  recommendationsEngine,
  costOptimisation,
  complianceManagementPack,
  unifiedDashboard,
  codeReviewerAi,
  predictiveMaintenanceSuite,
  autonomousOptimizationMatrix,
  anomalyDetectionEngine,
  blockchainBasedGovernance,
} from "../../../../assets/index";

const imageAssets = {
  digitalWorkforce,
  smartUserInterface,
  intelligentChatbot,
  cloudSearchEverywhere,
  einsteinFramework,
  multiCloudConnectivity,
  smarkTaskMangement,
  alerts,
  sandhAi,
  dataMigration,
  securityAutomated,
  devOpsSuite,
  blockchainBasedSecurityLedger,
  chaosEngineering,
  recommendationsEngine,
  costOptimisation,
  complianceManagementPack,
  unifiedDashboard,
  codeReviewerAi,
  predictiveMaintenanceSuite,
  autonomousOptimizationMatrix,
  anomalyDetectionEngine,
  blockchainBasedGovernance,
};

const breakpoints = {
  320: { slidesPerView: 1 },
  480: { slidesPerView: 2 },
  640: { slidesPerView: 3 },
  768: { slidesPerView: 3 },
  1024: { slidesPerView: 3 },
  1280: { slidesPerView: 3 },
  1440: { slidesPerView: 3 },
  1600: { slidesPerView: 4 },
  1920: { slidesPerView: 5 },
};

const FeatureSlider = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Function to handle slide click
  const handleSlideClick = (index) => {
    if (isMdScreen) {
      setActiveIndex(index === activeIndex ? null : index);

      setHoveredIndex(null);

      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.slideTo(index, 1000);
      }
    }
  };

  const handleMouseEnter = (index) => {
    if (activeIndex !== null) {
      setActiveIndex(null);
    }

    setHoveredIndex(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };


  return (
    <div className="flex flex-col items-center h-screen mt-10">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        variants={variants}
        className="max-w-5xl md:h-32 lg:h-34"
      >
        {(hoveredIndex !== null || activeIndex !== null) && (
          <div className="text-3xl font-bold text-center text-glow md:text-6xl 2xl:text-6xl w-fit mx-auto">
            {currentTitle.split("\n").map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        )}
      </motion.div>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 50,
          modifier: 2.5,
        }}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        speed={1200}
        spaceBetween={10}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="feature-slide swiper-contanier w-full"
        breakpoints={breakpoints}
        onMouseEnter={() => {
          if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.stop();
          }
        }}
        onMouseLeave={() => {
          if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.autoplay.start();
          }
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        ref={swiperRef}
      >
        {Sliders.map((slider, index) =>
          // (index !== 0 || (index === 0 && isMdScreen)) &&
          //   (index !== 1 || (index === 1 && isMdScreen)) ? (
            <SwiperSlide
              key={index}
              onClick={() => handleSlideClick(index)}
              // className={index !== 0 && index !== 1 ? "w-full" : ""}
            >
              <div
                // className={
                //   index !== 0 && index !== 1
                //     ? "relative flex flex-col text-[#F9F7ED] py-10 w-full"
                //     : ""
                // }

                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className={` ${hoveredIndex === index || activeIndex === index ? "" : ""
                    } `}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setActiveIndex(index)}
                >
                  <div
                    // className={
                    //   index !== 0 && index !== 1
                    //     ? "rounded-3xl neon-bg transition-all duration-200 w-full border-2 border-orange-500/5"
                    //     : ""
                    // }

                    // className={
                    //   `rounded-3xl hover:neon-bg transition-all duration-200 w-full border border-orange-500/10 my-10 ${activeIndex === index ? "neon-bg": ""}`
                    // }
                    className={`rounded-3xl transition-all duration-200 w-full border border-orange-500/10 my-10 ${activeIndex === index ? "neon-bg" : "hover:neon-bg"}`}

                    // className={activeIndex === index ? "highlight-slide" : ""}
                  >
                    <img
                      src={imageAssets[slider?.image]}
                      alt={imageAssets[slider?.image]}
                      // className={
                      //   index !== 0 && index !== 1
                      //     ? "object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                      //     : "object-cover w-full h-full transition-all duration-300"
                      // }
                      className={
                        "object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                      }
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          // ) : null
        )}

        {/* Swiper Pagination */}
        <div className="slider-controller">
          <div className="swiper-button-prev slider-arrow">
          </div>
          <div className="swiper-button-next slider-arrow">
          </div>
          <div className="swiper-pagination mx-auto"></div>
        </div>
      </Swiper>

      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        variants={variants}
        className="h-40 max-w-3xl mt-4"
      >
        {(hoveredIndex !== null || activeIndex !== null) && (
          <div className="md:text-lg font-bold text-center w-fit mx-auto">
            {currentDescription}
          </div>
        )}
      </motion.div>
    </div>
  )
}

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

{/* <div className="w-full">
<Swiper
  ref={swiperRef}
  direction="horizontal"
  autoplay={{
    delay: 1000,
    disableOnInteraction: false,
  }}
  speed={1000}
  modules={[Autoplay, Navigation]}
  className="feature-slider"
  spaceBetween={10}
  breakpoints={breakpoints}
  onMouseEnter={() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  }}
  onMouseLeave={() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  }}
>
  {Sliders.map((slider, index) =>
    (index !== 0 || (index === 0 && isMdScreen)) &&
    (index !== 1 || (index === 1 && isMdScreen)) ? (
      <SwiperSlide
        key={index}
        className={index !== 0 && index !== 1 ? "w-full h-full" : ""}
        onClick={() => handleSlideClick(index)}
      >
        <div
          className={
            index !== 0 && index !== 1
              ? "relative py-4 flex flex-col  text-[#F9F7ED] w-full h-full"
              : ""
          }
        >
          <div
            className={`${index !== 0 && index !== 1 ? "p-6 w-full h-full" : ""} ${
              hoveredIndex === index || activeIndex === index ? "" : ""
            } `}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setActiveIndex(index)}
          >
            <div
              className={
                index !== 0 && index !== 1
                  ? "p-4 md:p-14 rounded-xl w-full h-full"
                  : ""
              }
            >
              <div
                className={
                  index !== 0 && index !== 1
                    ? "min-w neon-bg transition-all duration-200 w-full h-full min-w-60"
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
</div> */}