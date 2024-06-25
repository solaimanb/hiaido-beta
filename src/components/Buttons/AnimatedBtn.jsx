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
  outlined,
}) => {
  return (
    <Link to={to} className="rounded-full">
      <button
        id={outlined ? id || "animated-btn-outlined" : id || "animated-btn"}
        className={`${additionalClasses} transition-all w-full duration-200 ${
          outlined ? "outlined" : ""
        }`}
        style={style}
      >
        <div
          className={`z-50 px-6 py-2 text-center ${
            white ? "text-white" : ""
          } ${className}`}
        >
          <span className="">{children}</span>
        </div>
      </button>
    </Link>
  );
};

export default AnimatedBtn;

// import { Link } from "react-router-dom";
// import "./AnimatedBtn.css";

// const AnimatedBtn = ({
//   className,
//   to,
//   children,
//   white,
//   id,
//   style,
//   additionalClasses,
// }) => {
//   return (
//     <Link to={to} className="rounded-full">
//       <button
//         id={id || "animated-btn"}
//         className={`${additionalClasses} transition-all duration-200`}
//         style={style}
//       >
//         <div
//           className={`z-50 px-6 py-2 text-center ${
//             white ? "text-white" : ""
//           } ${className}`}
//         >
//           <span className="">{children}</span>
//         </div>
//       </button>
//     </Link>
//   );
// };

// export default AnimatedBtn;
