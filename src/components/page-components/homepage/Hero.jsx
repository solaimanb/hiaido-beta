import { curve } from "../../../assets";
import Section from "../../Section";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import AnimatedText from "../../shared/AnimatedText";
import axios from "axios";

import textAnimation from "../../../assets/gif/Text-animation-v5.gif";
import AnimatedBtn from "../../Buttons/AnimatedBtn";
import { PlayIcon } from "@radix-ui/react-icons";

function Stars(props) {
  const ref = useRef();

  const [sphere] = useState(() => {
    const positions = random.inSphere(new Float32Array(15000), { radius: 2 });
    const validPositions = [];

    // Filter out NaN values and populate validPositions array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      // Check if any of the coordinates are NaN
      if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
        validPositions.push(x, y, z);
      }
    }

    return new Float32Array(validPositions);
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <Points
      ref={ref}
      positions={sphere}
      stride={3}
      frustumCulled={false}
      {...props}
    >
      <PointMaterial
        transparent
        color="#E17225"
        size={0.002}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

const GeneralTexts = [
  "What is the current status of my EC2 instances?",
  "How much storage space is available in my S3 bucket?",
  "List all active security groups in my VPC.",
  "What are the latest cost estimates for my AWS services?",
  "Provide a summary of my Azure virtual machine deployments.",
  "Retrieve the current network traffic metrics for my GCP project.",
  "Show the recent log events for my Lambda functions.",
  "Provide recommendations for optimizing my cloud infrastructure.",
  "What are the compliance standards for storing sensitive data in the cloud?",
  "Help troubleshoot connectivity issues between my cloud resources.",
];

const Hero = () => {
  const [data, setData] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const [showSecondAnimation, setShowSecondAnimation] = useState(false);

  const handleAnimationEnd = () => {
    setShowSecondAnimation(true);
  };

  if (isLoader) {
    console.log("submitting request..", isLoader);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (checkEmail()) {
      setIsLoader(true);
      const bodyFormData = new FormData();
      bodyFormData.append("email", data);

      axios({
        method: "POST",
        url: "https://api.hiaido.com/public/api/demo",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          if (response?.data.status === true) {
            setIsLoader(false);
            console.log(response.data);
            toast.success(response?.data.message);
            setData("");
          } else {
            setIsLoader(false);
            toast.error("Something went wrong!");
          }
        })
        .catch((err) => {
          setIsLoader(false);
          console.error("Error while saving data" + err);
          toast.error("Internal Server Error!");
        });
    }
  };

  const checkEmail = () => {
    var isValid = true;

    if (typeof data !== "undefined") {
      let lastAtPos = data.lastIndexOf("@");
      let lastDotPos = data.lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          data.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          data?.length - lastDotPos > 2
        )
      ) {
        isValid = false;
        toast.error("Email is not valid");
      }
    }

    return isValid;
  };

  return (
    <Section
      className=""
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="flex justify-center h-[80vh] relative md:min-h-screen mt-28 md:mt-18">
        <motion.div
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 10,
            duration: 1,
            ease: "easeInOut",
          }}
          className="z-1 absolute flex flex-col items-center justify-center h-[80vh]  text-center max-w-5xl lg:max-w-7xl mx-auto w-full md:mt-12"
        >
          <div className="space-y-4">
            <div className="lg:text-6xl xl:text-7xl md:px-0 md:text-5xl lg:pt-10 flex flex-col px-2 space-y-8 text-3xl font-bold">
              <div className="text-white/90 inline-block">
                The Next Generation
                <br />
                <span className="relative inline-block">
                  <AnimatedText text="AI Powered" />
                  <img
                    src={curve}
                    className="top-full absolute left-0 w-full"
                    width={624}
                    height={28}
                    alt=""
                  />
                </span>
              </div>

              <span className="relative inline-block text-orange-500">
                Cloud Automation Platform
              </span>
            </div>

            <div className="text-white/80 md:text-xl xl:text-2xl w-full mx-auto space-y-2 text-base">
              <p className="secondaryText">
                HIAIDO is your intelligent cloud assistant, enabling you to
                effortlessly manage your
                <br />
                cloud operations through natural language commands.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="text-start flex flex-col items-center mt-10 space-y-4"
          >
            <p
              className="type1 lg:text-2xl md:text-sm text-xs font-bold"
              onAnimationEnd={handleAnimationEnd}
            >
              &quot;Welcome to the future of automation with HIAIDO&quot;
            </p>

            <div
              value={data.request_email}
              name="request_email"
              className="md:flex-row flex flex-col items-center justify-center gap-4"
            >
              <input
                onChange={(e) => setData(e.target.value.replace(/\s/g, " "))}
                className="input-placeholder decoration-none focus:outline-none placeholder:text-black bg-white/80 text-black/80 py-2 pl-6 font-semibold rounded-full"
                type="text"
                placeholder="Enter your email"
              />

              <AnimatedBtn type="submit" className="font-semibold rounded-full">
                {/* <AnimatedText text="Request Demo" /> */}
                Request Demo
              </AnimatedBtn>
            </div>
          </form>

          {/* Text Animation */}
          <div className="flex items-center justify-center w-full h-full">
            {showSecondAnimation && (
              <div className="flex flex-col items-start justify-center md:w-[80%]">
                {/* HiAiDo Process Animation */}
                <img
                  src={textAnimation}
                  alt="hiaido-process"
                  className="w-full mt-2"
                  onContextMenu={(e) => e.preventDefault()}
                />

                {/* Functional Animation */}
                <div className="border-[#2A0BF6] w-full p-3 border-[2px] gap-4 flex flex-col rounded-2xl">
                  <div className="flex gap-2">
                    {/* Create, Describe, Update, List, Delete */}
                    {["Create", "Describe", "Update", "List", "Delete"].map(
                      (button) => (
                        <button
                          key={button}
                          className="bg-[#0353FB] py-1 text-center rounded-md font-semibold w-24"
                        >
                          {button}
                        </button>
                      )
                    )}
                  </div>

                  <div className="flex w-full gap-2 p-1">
                    {/* Self-Scroll Animation */}
                    <div className="p-1 w-[80%] overflow-hidden text-start h-12">
                      {GeneralTexts.map((text, index) => (
                        <p
                          key={index}
                          className="inner-lines relative h-12 text-xl font-semibold text-[#BBBBBB]"
                          style={{
                            animation: `scroll 10s ease-in-out infinite`,
                          }}
                        >
                          {text}
                        </p>
                      ))}
                    </div>

                    <div className="w-[20%] p-1 flex justify-end">
                      <button className="bg-[#5BC313] px-4 py-1 rounded text-lg font-semibold">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>

                {/* See Examples Trigger */}
                <button className="bg-orange-500/10 hover:bg-orange-500/30 flex items-center gap-1 px-2 py-1 mt-4 ml-2 text-xs font-semibold transition-all duration-200 rounded-md">
                  <PlayIcon />
                  See Examples
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Star Canvas */}
      <div className="absolute inset-0 w-full h-auto">
        <Canvas
          events={false}
          camera={{ position: [0, 0, 1] }}
          className="canvas-container min-h-screen opacity-75"
        >
          <mesh>
            <Stars />
          </mesh>
        </Canvas>
      </div>
    </Section>
  );
};

export default Hero;
