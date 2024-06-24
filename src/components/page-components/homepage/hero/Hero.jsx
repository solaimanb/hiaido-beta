// External libraries
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

// Local components
import Section from "../../../Section";
import AnimatedText from "../../../shared/AnimatedText";
import AnimatedBtn from "../../../Buttons/AnimatedBtn";
import InteractiveAnimation from "./InteractiveAnimation";

// Assets
import { curve } from "../../../../assets";

function Stars(props) {
  const ref = useRef();

  const [sphere] = useState(() => {
    const positions = random.inSphere(new Float32Array(15000), { radius: 2 });
    const validPositions = [];

    // Filter out NaN values and populate validPositions array
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      // Check if any of the coordinates are NaN
      if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
        validPositions.push(x, y, z);
      }
    }

    return new Float32Array(validPositions);
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <Points
      ref={ref}
      positions={sphere}
      stride={3}
      frustumCulled={false}
      {...props}
    >
      <PointMaterial
        transparent
        color="#E17225"
        size={0.002}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

const Hero = () => {
  const [showSecondAnimation, setShowSecondAnimation] = useState(false);

  const handleAnimationEnd = () => {
    setShowSecondAnimation(true);
  };

  const variants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };

  return (
    <Section
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="flex justify-center h-[80vh] relative md:min-h-screen mt-20 md:mt-18">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
          variants={variants}
          className="z-10 absolute flex flex-col items-center justify-center h-[80vh]  text-center max-w-5xl lg:max-w-7xl mx-auto w-full md:mt-12 gap-4"
        >
          <div className="space-y-3">
            <div className="flex flex-col px-2 space-y-8 text-3xl font-bold lg:text-6xl xl:text-7xl md:px-0 md:text-5xl lg:pt-10">
              <div className="inline-block text-white/90">
                The Next Generation
                <br />
                <span className="relative inline-block">
                  <AnimatedText text="AI Powered" />
                  <img
                    src={curve}
                    className="absolute left-0 w-full top-full"
                    width={624}
                    height={28}
                    alt=""
                  />
                </span>
              </div>

              <span className="relative inline-block text-orange-500">
                Cloud Automation Platform
              </span>
            </div>

            <div className="w-full mx-auto space-y-2 text-base text-white/80 md:text-xl xl:text-2xl">
              <p className="secondaryText">
                HIAIDO is your intelligent cloud assistant, enabling you to
                effortlessly manage your
                <br />
                cloud operations through natural language commands.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center mt-10 space-y-3 text-start">
            <p
              className="text-xs font-bold type1 lg:text-2xl md:text-sm"
              onAnimationEnd={handleAnimationEnd}
            >
              &quot;Welcome to the future of automation with HIAIDO&quot;
            </p>

            <AnimatedBtn to={"/chat"} className="font-semibold" outlined={true}>
              Get Started
            </AnimatedBtn>
          </div>

          {/* Interactive Animation */}
          <InteractiveAnimation showSecondAnimation={showSecondAnimation} />
        </motion.div>
      </div>

      {/* Star Canvas */}
      <div className="absolute inset-0 w-full h-auto">
        <Canvas
          events={false}
          camera={{ position: [0, 0, 1] }}
          className="min-h-screen opacity-75 canvas-container bg-dark/90"
          background="#000"
        >
          <mesh>
            <Stars />
          </mesh>
        </Canvas>
      </div>
    </Section>
  );
};

export default Hero;
