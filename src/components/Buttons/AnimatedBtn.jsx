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
  linkClassName,
  outlined,
  onClick,
}) => {
  const buttonId = outlined ? id || "animated-btn-outlined" : id || "animated-btn";
  const buttonClasses = `${additionalClasses} transition-all  duration-200 ${outlined ? "outlined" : ""
    }`;
  const textClasses = `z-50 px-6 py-2 text-center ${white ? "text-white" : ""
    } ${className}`;

  return (
    <Link to={to} className={`${linkClassName} rounded-full`}>
      <button
        id={buttonId}
        className={buttonClasses}
        onClick={onClick}
        style={style}
      >
        <div
          className={textClasses}
        >
          {children}
        </div>
      </button>
    </Link>
  );
};

export default AnimatedBtn;