import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { PlayIcon } from "@radix-ui/react-icons";
import "./spinner.css";
import { interactiveAnimationV5, aws, azure, gcp } from "../../../../assets";

// Animation Text Array & Asset Imports:
import { TextArrays } from "./index";
import {
  getTextArrayData,
  getAllTextLines,
  filterByCategory,
  filterSubCategoryTexts,
} from "./textArrayMapping";

//==============================================
// Functional Buttons for filtering text arrays:
//==============================================
const actionButtons = ["Create", "Describe", "Update", "List", "Delete"];
const categoryButtons = ["Aws", "Azure", "GCP"];

const InteractiveAnimation = ({ showSecondAnimation }) => {
  let textArrayData = getTextArrayData(TextArrays);
  let allTextLines = getAllTextLines(TextArrays);

  const [activeActionButton, setActiveActionButton] = useState("");
  const [activeCategoryButton, setActiveCategoryButton] = useState("");
  const [activeContent, setActiveContent] = useState("");
  const [showExample, setShowExample] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredTextLines, setFilteredTextLines] = useState(allTextLines);

  //==================================
  // Text Animation Mapping Functions:
  //==================================
  const updateFilteredTextLines = (actionButton, categoryButton) => {
    let filteredTexts = allTextLines;

    if (categoryButton) {
      const categoryFilteredData = filterByCategory(
        categoryButton,
        textArrayData
      );
      filteredTexts = categoryFilteredData.map((item) => item.values).flat();
    }

    if (actionButton) {
      const filteredSubCategories = filterSubCategoryTexts(
        textArrayData,
        actionButton.toLowerCase()
      );
      const actionFilteredTexts = filteredSubCategories
        .map((sc) => sc.values)
        .flat();
      filteredTexts = filteredTexts.filter((text) =>
        actionFilteredTexts.includes(text)
      );
      setActiveActionButton(actionButton);
    }

    setFilteredTextLines(
      filteredTexts.length > 0 ? filteredTexts : allTextLines
    );
  };

  useEffect(() => {
    const shuffledTexts = [...filteredTextLines].sort(
      () => Math.random() - 0.5
    );

    const animationDuration = 4800;
    const intervalTiming = animationDuration * 1.2;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledTexts.length);
    }, intervalTiming);

    return () => clearInterval(interval);
  }, [filteredTextLines]);

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
                {actionButtons.map((button, index) => (
                  <motion.button
                    key={button}
                    onClick={() => {
                      const newActiveContent =
                        button === activeContent ? "" : button;
                      setActiveContent(newActiveContent);
                      updateFilteredTextLines(
                        newActiveContent,
                        activeCategoryButton
                      );
                    }}
                    className={`py-[1px] text-center rounded-md font-semibold px-2 md:px-1 text-xs md:text-lg md:w-24 ${
                      button === activeContent
                        ? button === "Delete"
                          ? "border-2 border-red-500 active"
                          : "border-2 border-[#0353FB] active"
                        : "bg-[#0353FB] border-2 border-[#0353FB]"
                    }`}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 + index * 0.2 }}
                  >
                    {button}
                  </motion.button>
                ))}
              </div>

              {/* Animation Outlet */}
              <div className="flex w-full gap-2">
                {/* Self-Scroll Animation */}
                <div className="w-[80%] overflow-hidden text-start">
                  <div className="flex flex-col gap-2 h-14 animation-outlet">
                    <p className="animate-text inner-lines relative text-xs h-14 md:text-lg font-semibold text-[#BBBBBB]">
                      {filteredTextLines[currentIndex]}
                    </p>
                  </div>
                </div>

                <div className="w-[20%] flex flex-row items-end justify-end">
                  <button
                    title="ⓘ You're in interactive mode"
                    className="border-2 py-1 border-[#5BC313] bg-[#5cc3132a] md:px-4 px-2 rounded-md text-xs md:text-base font-semibold"
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
            className={`flex items-center justify-start w-full h-10 md:gap-4 ${
              showExample ? "mt-6" : ""
            }`}
          >
            <button
              onClick={() => {
                setShowExample(!showExample);
                setActiveContent(null);
                setActiveActionButton(null);
              }}
              className="flex items-center gap-2 text-xs font-semibold text-orange-500 transition-all duration-200 md:px-2 text-start md:text-sm"
            >
              {!showExample ? (
                <PlayIcon size={20} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-2 rotate-45"
                  width="36px"
                  height="26px"
                >
                  <rect
                    x="10"
                    y="10"
                    width="8"
                    height="8"
                    fill="none"
                    strokeWidth="2"
                  />

                  <rect
                    className="box box1"
                    x="2"
                    y="2"
                    width="8"
                    height="8"
                    fill="#A94F10"
                    strokeWidth="1"
                    rx="1"
                    ry="1"
                  />

                  <rect
                    className="box box2"
                    x="2"
                    y="2"
                    width="8"
                    height="8"
                    fill="#A94F10"
                    strokeWidth="1"
                    rx="1"
                    ry="1"
                  />

                  <rect
                    className="box box3"
                    x="2"
                    y="2"
                    width="8"
                    height="8"
                    fill="#A94F10"
                    strokeWidth="1"
                    rx="1"
                    ry="1"
                  />
                </svg>
              )}
              {showExample ? "Interactive mode : Active" : "See Examples"}
            </button>

            {/* AWS, AZURE, GCP Triggers */}
            {showExample && (
              <motion.div
                className={`flex md:gap-2 text-sm font-semibold `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.5 }}
              >
                {categoryButtons.map((button, index) => (
                  <motion.button
                    key={index}
                    className={`px-6 w-18 rounded flex items-center justify-center transition-all duration-200 ${
                      activeCategoryButton === button
                        ? "grayscale-0 hover:grayscale-0 border border-green-400 bg-green-600/10"
                        : "grayscale hover:grayscale-0 border border-transparent  "
                    }`}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3, duration: 0.5 + index * 0.5 }}
                    onClick={() => {
                      const newActiveCategoryButton =
                        button === activeCategoryButton ? "" : button;
                      setActiveCategoryButton(newActiveCategoryButton);
                      updateFilteredTextLines(
                        activeActionButton,
                        newActiveCategoryButton
                      );
                    }}
                  >
                    {button === "Aws" && (
                      <img
                        className="w-14 md:w-7"
                        src={aws}
                        alt="AWS"
                        title="Amazon Web Services"
                      />
                    )}
                    {button === "Azure" && (
                      <img
                        className="w-14 md:w-7"
                        src={azure}
                        alt="Azure"
                        title="Microsoft Azure"
                      />
                    )}
                    {button === "GCP" && (
                      <img
                        className="w-14 md:w-7"
                        src={gcp}
                        alt="GCP"
                        title="Google Cloud Platform"
                      />
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
