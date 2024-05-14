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
        className={`z-50 px-${px || 8} py-2 text-center ${
          white ? "text-white" : ""
        } ${className}`}
      >
        <a href={href} onClick={onClick}>
          {children}
        </a>
      </div>
    </div>
  );
};

export default AnimatedBtn;
