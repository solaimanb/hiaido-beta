import { useAnimationFrame, useMotionValue } from "framer-motion";
import Marquee from "react-fast-marquee";

import "./featureSlider.css";

import { useEffect, useRef, useState } from "react";

// Image Assets:
import { einstein, amazon, rocket, web } from "../../../../assets/index";

const sliders = [
  "",
  "",
  {
    image: amazon,
    description:
      "Your digital assistant for seamless cloud management; assign tasks & get them delivered promptly.",
    title: "AI Cloud Engineer (Digital Edition)",
  },
  {
    image: web,
    description:
      "Your intuitive hub for seamless cloud automation, management, and everything.",
    title: "Smart Web Portal",
  },
  {
    image: amazon,
    description:
      "Interact with the cloud platform using natural language commands, making it intuitive and user-friendly.",
    title: "Natural Language Interface",
  },
  {
    image: rocket,
    description:
      "Instantly access comprehensive details of your cloud ecosystem, resources, and predefined fields. This feature would greatly supplement your cloud operations. Enjoy quick and intuitive navigation for enhanced productivity.",
    title: "Universal Search Bar",
  },
  {
    image: einstein,
    description:
      "Meet Einstein, a super-intelligent framework we have built to handle special and complex requirements with unparalleled efficiency and intelligence.",
    title: "Einstein : Your Genius Cloud Champion",
  },
  {
    image: amazon,
    description:
      "Harness the power of multiple cloud providers with ease. HIAIDO seamlessly integrates with AWS, Azure, and GCP, enabling you to manage resources across different clouds effortlessly.",
    title: "Multi Cloud Integration",
  },
  {
    image: rocket,
    description:
      "Harness the power of multiple cloud providers with ease. HIAIDO seamlessly integrates with AWS, Azure, and GCP, enabling you to manage resources across different clouds effortlessly.",
    title: "Multi Cloud Integration",
  },
  {
    image: amazon,
    description:
      "Stay informed with actionable alerts that provide instant notifications when critical events occur in your cloud environment. Our intelligent alerts empower you to proactively address issues before they impact your users",
    title: "Sandh.ai",
  },
  {
    image: web,
    description:
      "Explore the world of serverless development with our interactive playground. This feature provides a sandbox environment where developers can experiment with serverless functions effortlessly.",
    title: "Serverless Functions Playground",
  },
];

const FeatureSlider = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMdScreen, setIsMdScreen] = useState(window.innerWidth >= 768);
  // const swiperRef = useRef(null);

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

  return (
    <section className="flex items-center justify-center min-h-screen">
      <section className="w-full">
        <Marquee pauseOnHover pauseOnClick>
          {sliders.map((slider, index) =>
            (index !== 0 || (index === 0 && isMdScreen)) &&
            (index !== 1 || (index === 1 && isMdScreen)) ? (
              <div
                key={index}
                className={index !== 0 && index !== 1 ? "" : ""}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() =>
                  setActiveIndex((prevIndex) =>
                    prevIndex === index ? null : index
                  )
                }
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
                        ? "relative border-8 rounded p-6 border-[#03FF80]/10"
                        : "border-8 border-transparent"
                    } `}
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
              </div>
            ) : null
          )}
        </Marquee>
      </section>

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
