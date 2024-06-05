import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { PlayIcon } from "@radix-ui/react-icons";
import "./spinner.css";
import { interactiveAnimationV5, aws, azure, gcp } from "../../../../assets";

// Animation Text Array & Asset Imports:
import DefaultTextArrays from "./DefaultTextArrays";
import { AwsTexts, AzureTexts, GcpTexts } from "./index";

const buttons = ["Aws", "Azure", "GCP"];

const InteractiveAnimation = ({ showSecondAnimation }) => {
  const [activeContent, setActiveContent] = useState("");
  const [showExample, setShowExample] = useState(false);
  const [textArrays, setTextArrays] = useState(DefaultTextArrays);
  const [currentIndex, setCurrentIndex] = useState(0);

  //==================================
  // Text Animation Mapping Functions:
  //==================================
  const textMapping = {
    Create: textArrays?.Create,
    Describe: textArrays?.Describe,
    Update: textArrays?.Update,
    List: textArrays?.List,
    Delete: textArrays?.Delete,
    default: textArrays?.General,
  };

  const activeTexts = textMapping[activeContent] || textMapping["default"];

  // Function to shuffle an array - for random order:
  // function shuffleArray(array) {
  //   let arr = [...array];
  //   let currentIndex = arr.length,
  //     randomIndex;

  //   // While there remain elements to shuffle...
  //   while (currentIndex !== 0) {
  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex--;

  //     // And swap it with the current element.
  //     [arr[currentIndex], arr[randomIndex]] = [
  //       arr[randomIndex],
  //       arr[currentIndex],
  //     ];
  //   }

  //   return arr;
  // }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activeTexts.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [activeTexts]);

  // AWS, AZURE, GCP Button State:
  const [activeButton, setActiveButton] = useState(null);

  return (
    <div className="flex items-center justify-center w-full h-full">
      {showSecondAnimation && (
        <div className="flex flex-col items-start justify-center md:w-[80%] mx-auto">
          {/* HiAiDo Process Animation */}
          {!showExample && (
            <img
              src={interactiveAnimationV5}
              alt="hiaido-process"
              className="object-cover w-full mx-auto"
              onContextMenu={(e) => e.preventDefault()}
            />
          )}

          {/* Functional Animation */}
          {showExample && (
            <div className="w-full mx-auto border-[#2A0BF6] p-3 border-[3px] gap-4 flex flex-col rounded-2xl">
              <div className="flex gap-2">
                {/* Create, Describe, Update, List, Delete */}
                {["Create", "Describe", "Update", "List", "Delete"].map(
                  (button, index) => (
                    <motion.button
                      key={button}
                      onClick={() =>
                        setActiveContent(
                          activeContent === button ? null : button
                        )
                      }
                      className={`py-1 text-center rounded-md font-semibold px-2 md:px-1 text-xs md:text-lg md:w-24 ${
                        button === activeContent
                          ? button === "Delete"
                            ? "border-2 border-red-500 active"
                            : "border-2 border-[#0353FB] active"
                          : "bg-[#0353FB]"
                      }`}
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 + index * 0.2 }}
                    >
                      {button}
                    </motion.button>
                  )
                )}
              </div>

              {/* Animation Outlet */}
              <div className="flex w-full gap-2">
                {/* Self-Scroll Animation */}
                <div className="w-[80%] overflow-hidden text-start">
                  <div className="flex flex-col gap-2 h-14 animation-outlet">
                    <p className="animate-text inner-lines relative text-xs h-14 md:text-lg font-semibold text-[#BBBBBB]">
                      {activeTexts[currentIndex]}
                    </p>
                  </div>
                </div>

                <div className="w-[20%] flex flex-row items-center justify-end">
                  <button
                    title="ⓘ You're in interactive mode"
                    className="border-2 py-2 border-[#5BC313] bg-[#5cc3132a] md:px-4 px-2 rounded-lg text-xs md:text-base font-semibold"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* See Examples Trigger */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 16 }}
            className={`flex items-center justify-start w-full h-10 gap-4 ${
              showExample ? "mt-6" : ""
            }`}
          >
            <button
              onClick={() => {
                setShowExample(!showExample);
                setActiveContent(null);
                setActiveButton(null);
              }}
              className="flex items-center px-2 text-xs font-semibold text-orange-500 transition-all duration-200 text-start md:text-sm"
            >
              {!showExample ? (
                <PlayIcon size={20} />
              ) : (
                // <div className="spinner-wrapper">
                //   <div className="spinner">
                //     <div className="sk-folding-cube">
                //       <div className="sk-cube1 sk-cube"></div>
                //       <div className="sk-cube2 sk-cube"></div>
                //       <div className="sk-cube4 sk-cube"></div>
                //       <div className="sk-cube3 sk-cube"></div>
                //     </div>
                //   </div>
                // </div>
                <div className="spinner">
                  <div className="bar1"></div>
                  <div className="bar2"></div>
                  <div className="bar3"></div>
                  <div className="bar4"></div>
                  <div className="bar5"></div>
                  <div className="bar6"></div>
                  <div className="bar7"></div>
                  <div className="bar8"></div>
                  <div className="bar9"></div>
                  <div className="bar10"></div>
                  <div className="bar11"></div>
                  <div className="bar12"></div>
                </div>
              )}
              {showExample ? "Interactive mode : Active" : "See Examples"}
            </button>

            {/* AWS, AZURE, GCP Triggers */}
            {showExample && (
              <motion.div
                className={`flex gap-2 text-sm font-semibold `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.5 }}
              >
                {buttons.map((button, index) => (
                  <motion.button
                    key={index}
                    className={`px-4 w-15 rounded flex items-center justify-center transition-all duration-200 ${
                      activeButton === button
                        ? "grayscale-0 hover:grayscale-0"
                        : "grayscale hover:grayscale-0"
                    }`}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 + index * 0.5 }}
                    onClick={() => {
                      const newActiveButton =
                        activeButton === button ? null : button;
                      setActiveButton(newActiveButton);
                      switch (newActiveButton) {
                        case "Aws":
                          setTextArrays(AwsTexts);
                          break;
                        case "Azure":
                          setTextArrays(AzureTexts);
                          break;
                        case "GCP":
                          setTextArrays(GcpTexts);
                          break;
                        default:
                          setTextArrays(DefaultTextArrays);
                      }
                    }}
                  >
                    {button === "Aws" && (
                      <img className="w-8" src={aws} alt="AWS" />
                    )}
                    {button === "Azure" && (
                      <img className="w-8" src={azure} alt="Azure" />
                    )}
                    {button === "GCP" && (
                      <img className="w-8" src={gcp} alt="GCP" />
                    )}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default InteractiveAnimation;
