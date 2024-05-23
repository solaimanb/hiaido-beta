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
        className={`z-50 px-8 py-2 text-center transition-all duration-200 ${
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
