import { useEffect, useState } from "react";

const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const typingSpeed = 20; // Adjust typing speed as needed

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index));
      setIndex((prevIndex) => prevIndex + 1);
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [index, text]);

  useEffect(() => {
    setIndex(0);
    setDisplayText("");
  }, [text]);

  return <span>{displayText}</span>;
};
export default TypingEffect;
