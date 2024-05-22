import "./AnimatedBtn.css";

const AnimatedBtn = ({
  className,
  href,
  onClick,
  children,
  px,
  white,
  id,
  style,
  additionalClasses,
}) => {
  return (
    <div
      id={id || "animated-btn"}
      className={`rounded-full ${additionalClasses}`}
      style={style}
    >
      <div
        className={`z-50 px-${
          px || 8
        } py-2 text-center transition-all duration-200 hover:bg-orange-400/10${
          white ? "text-white" : ""
        } ${className}`}
      >
        <a href={href} onClick={onClick} className="text-container">
          {children}
        </a>
      </div>
    </div>
  );
};

export default AnimatedBtn;
