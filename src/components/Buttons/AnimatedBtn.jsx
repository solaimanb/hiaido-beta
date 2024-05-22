import "./AnimatedBtn.css";

const AnimatedBtn = ({
  className,
  href,
  children,
  white,
  id,
  style,
  additionalClasses,
}) => {
  return (
    <button
      id={id || "animated-btn"}
      className={`${additionalClasses}`}
      style={style}
      // onClick={onClick}
    >
      <div
        className={`child-wrapper ${white ? "text-white" : ""} ${className}`}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <a href={href} className="text-container">
          {children}
        </a>
      </div>
    </button>
  );
};

export default AnimatedBtn;
