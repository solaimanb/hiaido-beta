import aws from "../../../assets/images/aws.png";
import Heading from "../../Heading";
import Section from "../../Section";
import azure from "../../../assets/images/azure.png";
import gcp from "../../../assets/images/gcp.png";
import "../../../index.css";
import { useEffect, useRef } from "react";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
  });

  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <Section id="features">
      <div
        ref={animateRef}
        className="md:pt-20 container relative min-h-screen mt-10 text-center"
      >
        <motion.p
          ref={ref}
          className="secondaryText mb-10 text-2xl"
          variants={variants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          With HIAIDO, you can perform a variety of tasks across multiple cloud
          providers and <br className="md:block hidden" /> technologies,
          including creating, describing, updating, listing, and deleting
          resources.
          <br className="md:block hidden" />
          Whether you need to provision new infrastructure, modify existing
          configurations, or
          <br className="md:block hidden" />
          simply get insights into your cloud environment, HIAIDO streamlines
          the process,
          <br className="md:block hidden" />
          making cloud management intuitive and efficient.
        </motion.p>
        <div className="flex flex-col flex-wrap items-center justify-center gap-4 mb-8 font-bold">
          <p className="lg:text-4xl w-auto text-2xl text-center text-orange-400">
            Build Faster, Build Better, Build With AI
          </p>
          <motion.p className="type2 lg:text-xl text-center">
            automate anything, almost, literally..
          </motion.p>
        </div>

        <Heading
          className="md:max-w-md lg:max-w-2xl p-8 text-center"
          title="Our Cloud Partners"
        />

        <div className="flex flex-wrap items-center justify-center gap-10 mb-10">
          <div className="group rounded-xl border-orange-400/40 hover:scale-110 backdrop-blur-sm relative p-10 overflow-hidden transition-transform duration-300 border shadow-2xl">
            <img src={aws} alt="aws" />
          </div>
          <div className="group rounded-xl border-orange-400/40 hover:scale-110 backdrop-blur-sm relative p-10 overflow-hidden transition-transform duration-300 border shadow-2xl">
            <img src={azure} alt="azure" />
          </div>
          <div className="group rounded-xl border-orange-400/40 hover:scale-110 backdrop-blur-sm relative p-10 overflow-hidden transition-transform duration-300 border shadow-2xl">
            <img src={gcp} alt="gcp" />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
