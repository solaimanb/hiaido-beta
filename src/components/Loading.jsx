// import { motion, AnimatePresence } from "framer-motion";
// import Hiaido from "../assets/hiaido-logo.png";

// import HiaidoAnimation from "../assets/hiaido-animation.mp4";

// const Loading = () => {
//   return (
//     <AnimatePresence>
//       <div className="bg-blue_gray-900 text-white-A700 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0, transition: { duration: 2 } }}
//           transition={{
//             repeat: Infinity,
//             duration: 5,
//             repeatType: "reverse",
//           }}
//         >
//           {/* <img
//             src={Hiaido}
//             alt="hiaido-logo"
//             className="w-[20vw] md:w-[10vw] mb-4 -ml-4"
//           /> */}

//           <video src={HiaidoAnimation}></video>
//         </motion.div>
//       </div>
//     </AnimatePresence>
//   );
// };

// export default Loading;

const Loading = () => {
  return (
    <div className="loading-container">
      <svg className="loading-animation" viewBox="0 0 200 100">
        <text x="50%" y="50%" textAnchor="middle" className="text-animation">
          HIAIDO
        </text>
      </svg>
      <style>{`
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .loading-animation {
          width: 50vmin;
          height: 50vmin;
        }
        .text-animation {
          fill: none;
          stroke: #e75a15;
          stroke-width: 1;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: text-animation 5s forwards;
        }
        @keyframes text-animation {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
