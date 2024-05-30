import { Link } from "react-router-dom";
import "./AnimatedBtn.css";

const AnimatedBtn = ({
  className,
  to,
  children,
  white,
  id,
  style,
  additionalClasses,
}) => {
  return (
    <button
      id={id || "animated-btn"}
      className={`${additionalClasses} transition-all duration-200`}
      style={style}
    >
      <div
        className={`cusbtn z-50 px-6 py-2 text-center ${
          white ? "text-white" : ""
        } ${className}`}
      >
        <Link to={to} className="">
          <span className="">{children}</span>
        </Link>
      </div>
    </button>
  );
};

export default AnimatedBtn;
