import { useState, useEffect } from "react";

const letters = "abcdefghijklmnopqrstuvwxyz".split("");

const AnimatedText = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [intervalId, setIntervalId] = useState(null);

  const onMouseEnter = () => {
    let iteration = 0;

    clearInterval(intervalId);

    const newIntervalId = setInterval(() => {
      const newText = text
        .split("")
        .map((letter, idx) => {
          if (idx < iteration) {
            return text[idx];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      setDisplayText(newText);

      if (iteration >= text.length) {
        clearInterval(newIntervalId);
      }

      iteration += 1 / 3;
    }, 30);

    setIntervalId(newIntervalId);
  };

  const onMouseLeave = () => {
    clearInterval(intervalId);
    setDisplayText("");
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <span onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {displayText || text}
    </span>
  );
};

export default AnimatedText;
