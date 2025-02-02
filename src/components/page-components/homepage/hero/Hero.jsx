import { PointMaterial, Points } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as random from "maath/random/dist/maath-random.esm";
import { useMemo, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

import AnimatedBtn from "../../../Buttons/AnimatedBtn";
import Section from "../../../Section";
import AnimatedText from "../../../shared/AnimatedText";
import InteractiveAnimation from "./InteractiveAnimation";

import { curve } from "../../../../assets";

function Stars(props) {
  const ref = useRef();

  const sphere = useMemo(() => {
    const positions = random.inSphere(new Float32Array(15000), { radius: 2 });
    const validPositions = [];

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
        validPositions.push(x, y, z);
      }
    }

    return new Float32Array(validPositions);
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
      <PointMaterial transparent color="#E17225" size={0.002} sizeAttenuation={true} depthWrite={false} />
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
      customPaddings
      id="hero"
      className="flex justify-center"
    >
      <div className="absolute container flex justify-center h-[80vh] z-1 min-h-screen mt-32 md:mt-10 xl:mt-0 px-2">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.1 }}
          variants={variants}
          className="flex flex-col items-center justify-center h-[80vh] text-center max-w-5xl lg:max-w-7xl mx-auto w-full md:mt-12 gap-4"
        >
          <div className="space-y-3">
            <div className="flex flex-col space-y-8 2xl:space-y-14  lg:pt-10">
              <div>
                <h1 className="hero-title text-3xl md:text-6xl lg:text-6xl xl:text-7xl inline-block tracking-tight">
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
                </h1>
              </div>

              <h1 className="relative hero-title text-3xl md:text-5xl lg:text-6xl xl:text-7xl inline-block text-orange-500">
                Cloud Automation Platform
              </h1>
            </div>

            <div className="w-full mx-auto space-y-2 text-white/80 text-lg md:text-xl xl:text-2xl">
              <p className="secondaryText">
                HIAIDO is your intelligent cloud assistant, enabling you to
                effortlessly manage your
                <br />
                cloud operations through natural language commands.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center mt-6 space-y-3 text-start">
            <p
              className="font-bold type1 text-xs lg:text-2xl md:text-sm"
              onAnimationEnd={handleAnimationEnd}
            >
              &quot;Welcome to the future of automation with HIAIDO&quot;
            </p>

            <AnimatedBtn
              to={"/login"}
              className="font-semibold"
              outlined={true}
            >
              Get Started
            </AnimatedBtn>
          </div>

          {/* Interactive Animation */}
          <InteractiveAnimation showSecondAnimation={showSecondAnimation} />
        </motion.div>
      </div>

      {/* Star Canvas */}
      <div className="inset-0 w-full h-auto">
        <Canvas
          events={false}
          camera={{ position: [0, 0, 1] }}
          className="min-h-screen opacity-60 canvas-container"
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
