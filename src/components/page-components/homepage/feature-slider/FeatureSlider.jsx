import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import Sliders from "./sliderInfo.json";

import "./featureSlider.css";
import {
  alerts,
  anomalyDetectionEngine,
  autonomousOptimizationMatrix,
  blockchainBasedGovernance,
  blockchainBasedSecurityLedger,
  chaosEngineering,
  cloudSearchEverywhere,
  codeReviewerAi,
  complianceManagementPack,
  costOptimisation,
  dataMigration,
  devOpsSuite,
  digitalWorkforce,
  einsteinFramework,
  intelligentChatbot,
  multiCloudConnectivity,
  predictiveMaintenanceSuite,
  recommendationsEngine,
  sandhAi,
  securityAutomated,
  smarkTaskMangement,
  smartUserInterface,
  unifiedDashboard,
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
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const swiperRef = useRef(null);

  useEffect(() => {
    const updateCurrentInfo = () => {
      const index = hoveredIndex !== null ? hoveredIndex : activeIndex;
      if (index !== null) {
        setCurrentTitle(Sliders[index]?.title || "");
        setCurrentDescription(Sliders[index]?.description || "");
      }
    };
    updateCurrentInfo();
  }, [hoveredIndex, activeIndex]);

  const baseX = useMotionValue(0);
  const directionFactor = useRef(1);
  const baseVelocity = 3;

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    baseX.set(baseX.get() - moveBy);
  });

  const handleSlideClick = useCallback((index) => {
    setActiveIndex(index);
    setHoveredIndex(null);
    swiperRef.current?.swiper?.slideToLoop(index, 1000);
  }, []);

  const handleMouseEnter = useCallback((index) => {
    setHoveredIndex(index);
    swiperRef.current?.swiper?.autoplay.stop();
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    swiperRef.current?.swiper?.autoplay.start();
  }, []);

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <div className="flex flex-col items-center h-screen mt-20 sm:mt-10">
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
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 50,
          modifier: 2.5,
        }}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        speed={1200}
        spaceBetween={10}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="feature-slider swiper-container w-full"
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
        {Sliders.map(
          (slider, index) => (
         
            <SwiperSlide
              key={index}
              onClick={() => handleSlideClick(index)}
            >
              <div
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className={` ${
                    hoveredIndex === index || activeIndex === index ? "" : ""
                  } `}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setActiveIndex(index)}
                >
                  <div
                    className={`rounded-3xl transition-all duration-200 mx-10 md:mx-0 mt-10 mb-20 ${
                      activeIndex === index ? "neon-bg" : "hover:neon-bg"
                    }`}
                  >
                    <img
                      src={imageAssets[slider?.image]}
                      alt={imageAssets[slider?.image]}
                      className={`object-cover transition-all duration-300 ${
                        activeIndex === index || hoveredIndex === index
                          ? "grayscale-0"
                          : "grayscale"
                      }`}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          )
        )}
        {/* Swiper Pagination */}
        <div className="slider-controller">
          <div className="swiper-button-prev slider-arrow"></div>
          <div className="swiper-button-next slider-arrow"></div>
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
          <div className="text-lg font-semibold text-center w-fit mx-auto">
            {currentDescription}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FeatureSlider;