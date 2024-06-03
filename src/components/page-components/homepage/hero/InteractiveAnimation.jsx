import React, { useEffect, useState } from "react";

import { PlayIcon } from "@radix-ui/react-icons";
import textAnimation from "../../../../assets/gif/Interactive-animation-v5.gif";
import textArrays from "./TextArrays";

const InteractiveAnimation = ({ showSecondAnimation }) => {
  const [activeContent, setActiveContent] = useState("");
  const [showExample, setShowExample] = useState(false);
  const [showExampleBtn, setShowExampleBtn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExampleBtn(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  //==================================
  // Text Animation Mapping Functions:
  //==================================
  const textMapping = {
    Create: textArrays?.CreateTexts,
    Describe: textArrays?.DescribeTexts,
    Update: textArrays?.UpdateTexts,
    List: textArrays?.ListTexts,
    Delete: textArrays?.DeleteTexts,
    default: textArrays?.GeneralTexts,
  };

  const activeTexts = textMapping[activeContent] || textMapping["default"];

  // Function to shuffle an array - for random order:
  function shuffleArray(array) {
    let arr = [...array];
    let currentIndex = arr.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }

    return arr; // Return the shuffled copy of the array
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      {showSecondAnimation && (
        <div className="flex flex-col items-start justify-center md:w-[80%] mx-auto">
          {/* HiAiDo Process Animation */}
          {!showExample && (
            <img
              src={textAnimation}
              alt="hiaido-process"
              className="w-full mx-auto h-auto"
              onContextMenu={(e) => e.preventDefault()}
            />
          )}

          {/* Functional Animation */}
          {showExample && (
            <div className="w-full mx-auto border-[#2A0BF6] p-3 border-[3px] gap-4 flex flex-col rounded-2xl mt-10">
              <div className="flex gap-2">
                {/* Create, Describe, Update, List, Delete */}
                {["Create", "Describe", "Update", "List", "Delete"].map(
                  (button) => (
                    <button
                      key={button}
                      onClick={() =>
                        setActiveContent(
                          activeContent === button ? null : button
                        )
                      }
                      className={`py-1 text-center rounded-md font-semibold px-2 text-xs md:text-base md:w-24 ${
                        button === activeContent
                          ? button === "Delete"
                            ? "border-2 border-red-500 active"
                            : "border-2 border-[#0353FB] active"
                          : "bg-[#0353FB]"
                      }`}
                    >
                      {button}
                    </button>
                  )
                )}
              </div>

              {/* Animation Outlet */}
              <div className="flex w-full gap-2">
                {/* Self-Scroll Animation */}
                <div className="w-[80%] overflow-hidden text-start h-14">
                  <div className="animation-outlet flex flex-col gap-4">
                    {shuffleArray(activeTexts)?.map((text, index) => (
                      <p
                        key={index}
                        className="inner-lines relative text-xs h-14 md:text-lg font-semibold text-[#BBBBBB]"
                        style={{
                          animation: `scroll 10s linear infinite`,
                        }}
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="w-[20%] p-1 flex justify-end">
                  <button
                    title="ⓘ You're in interactive mode"
                    className="border-2 border-[#5BC313] bg-[#5cc3132a] md:px-4 px-2 rounded-lg text-xs md:text-base font-semibold"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* See Examples Trigger */}
          {showExampleBtn && (
            <button
              onClick={() => {
                setShowExample(!showExample);
              }}
              className="bg-orange-500/5 hover:bg-orange-500/10 flex items-center px-2 mt-4 text-xs font-semibold transition-all duration-200 gap-1 rounded-md text-orange-400/90"
            >
              {!showExample ? (
                <PlayIcon size={20} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 100 100"
                  enable-background="new 0 0 0 0"
                  xml:space="preserve"
                  className="h-8 w-10"
                >
                  <circle fill="#F97316" stroke="none" cx="6" cy="50" r="6">
                    <animateTransform
                      attributeName="transform"
                      dur="1s"
                      type="translate"
                      values="0 15 ; 0 -15; 0 15"
                      repeatCount="indefinite"
                      begin="0.1"
                    />
                  </circle>
                  <circle fill="#F97316" stroke="none" cx="30" cy="50" r="6">
                    <animateTransform
                      attributeName="transform"
                      dur="1s"
                      type="translate"
                      values="0 10 ; 0 -10; 0 10"
                      repeatCount="indefinite"
                      begin="0.2"
                    />
                  </circle>
                  <circle fill="#F97316" stroke="none" cx="54" cy="50" r="6">
                    <animateTransform
                      attributeName="transform"
                      dur="1s"
                      type="translate"
                      values="0 5 ; 0 -5; 0 5"
                      repeatCount="indefinite"
                      begin="0.3"
                    />
                  </circle>
                </svg>
              )}

              {showExample ? "Interactive mode : Active" : "See Examples"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveAnimation;
