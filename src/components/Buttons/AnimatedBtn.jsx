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
      className={`${additionalClasses} transition-all duration-200  hover:scale-105`}
      style={style}
      // onClick={onClick}
    >
      <div
        className={`z-50 px-6 py-2 text-center ${
          white ? "text-white" : ""
        } ${className}`}
      >
        <a href={href} className="">
          <span className="">{children}</span>
        </a>
      </div>

      {/* V.2 */}
      {/* <div
        className={`child-wrapper ${white ? "text-white" : ""} ${className}`}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <a href={href} className="text-container">
          {children}
        </a>
      </div> */}
    </button>
  );
};

export default AnimatedBtn;
