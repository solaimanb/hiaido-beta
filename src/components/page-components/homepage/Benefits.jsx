import { useEffect, useRef } from "react";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Heading from "../../Heading";

import aws from "../../../assets/logo/amazon-aws-hiaido.png";
import gcp from "../../../assets/logo/google-cloud-hiaido.png";
import azure from "../../../assets/logo/microsoft-azure-hiaido.png";
import "../../../index.css";

const images = [
  { src: azure, alt: "azure", width: "100%", height: "100%" },
  { src: aws, alt: "aws", width: "40%", height: "100%" },
  { src: gcp, alt: "gcp", width: "90%", height: "100%" },
];

const Benefits = () => {
  const animateRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          } else {
            entry.target.classList.remove("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (animateRef.current) {
      observer.observe(animateRef.current);
    }

    return () => {
      if (animateRef.current) {
        observer.unobserve(animateRef.current);
      }
    };
  }, []);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: -50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
      },
    },
  };

  return (
    <motion.div
      // variants={variants}
      // initial="hidden"
      // animate={inView ? "show" : "hidden"}
      className="md:pt-20 bg-dark container relative min-h-screen mt-10 text-center"
    >
      <motion.p
        className="secondaryText md:text-xl xl:text-2xl mb-10 text-base"
        // initial="hidden"
        // animate={inView ? "show" : "hidden"}
      >
        With HIAIDO, you can perform a variety of tasks across multiple cloud
        providers and <br className="md:block hidden" /> technologies, including
        creating, describing, updating, listing, and deleting resources.
        <br className="md:block hidden" />
        Whether you need to provision new infrastructure, modify existing
        configurations, or
        <br className="md:block hidden" />
        simply get insights into your cloud environment, HIAIDO streamlines the
        process,
        <br className="md:block hidden" />
        making cloud management intuitive and efficient.
      </motion.p>

      <div className="flex flex-col flex-wrap items-center justify-center gap-4 mb-8 font-bold">
        <p className="lg:text-5xl md:px-0 md:text-5xl space-y-4 text-2xl font-bold text-center text-orange-500">
          Build Faster, Build Better, Build With AI
        </p>

        <motion.p
          ref={ref}
          className={`lg:text-xl text-center ${inView ? "type2" : ""}`}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          automate anything, almost, literally..
        </motion.p>
      </div>

      <Heading
        className="md:max-w-md lg:max-w-2xl p-8 text-center"
        title="Our Cloud Partners"
      />

      <div className="md:flex-row flex flex-col items-center justify-center gap-10 mb-10">
        {images.map((image, index) => (
          <div
            key={index}
            className="group rounded-xl border-orange-500/30 hover:scale-105 backdrop-blur-sm shadow-2x relative flex justify-center w-full h-full p-8 overflow-hidden transition-transform duration-200 border"
          >
            <img
              src={image?.src}
              alt={image?.alt}
              style={{ width: image.width, height: image.height }}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Benefits;
