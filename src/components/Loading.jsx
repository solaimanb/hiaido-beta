import { motion } from "framer-motion";
import Hiaido from "../assets/hiaido-logo.png";

const Loading = () => {
  return (
    <div className="bg-blue_gray-900 text-white-A700 absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          repeat: Infinity,
          duration: 2,
          repeatType: "reverse",
        }}
      >
        <img src={Hiaido} alt="hiaido-logo" className="w-[10vw] mb-4 -ml-4" />
      </motion.div>
    </div>
  );
};

export default Loading;
