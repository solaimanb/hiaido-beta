import { curve } from "../assets";
import Section from "./Section";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import "../index.css";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import AnimatedText from "./shared/AnimatedText";

function Stars(props) {
  const ref = useRef();

  const [sphere] = useState(() => {
    const positions = random.inSphere(new Float32Array(5000), { radius: 1.5 });
    const validPositions = Array.from(positions).filter((pos) => !isNaN(pos));
    return new Float32Array(validPositions);
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
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
        size={0.003}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

const Hero = () => {
  const [data, setData] = useState({
    request_email: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(data);

    setData({
      data,
    });
  };

  const refreshPage = () => {
    toast("Details submitted Successfully");
    window.location.href = "/";
  };

  return (
    <Section
      className=""
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="flex justify-center h-[80vh] relative md:min-h-screen">
        <motion.div
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 10,
            duration: 1,
            ease: "easeInOut",
          }}
          className="z-1 absolute flex flex-col items-center justify-center h-[80vh]  text-center max-w-5xl mx-auto w-full px-4 mt-32"
        >
          <div className="space-y-4">
            <p className="lg:text-6xl md:px-0 md:text-5xl lg:pt-10 px-2 space-y-4 text-3xl font-bold">
              <div className="text-white/90">
                The Next Generation
                <br />
                <span className="relative inline-block">
                  <AnimatedText text="AI Powered" />
                  <img
                    src={curve}
                    className="top-full absolute left-0 w-full"
                    width={624}
                    height={28}
                    alt="Curve"
                  />
                </span>
              </div>

              <span className="relative inline-block mt-2 text-orange-500">
                Cloud Automation Platform
              </span>
            </p>

            <p className="body-1 text-white/70 w-full md:w-[90%] mx-auto md:text-xl">
              HIAIDO is a powerful AI platform designed to revolutionize your
              cloud operations, seamlessly automating tasks and amplifying
              efficiency.
              <br />
              To make cloud management intuitive, we offer tailored solutions
              and ongoing innovation, redefining seamless cloud experiences.
              Experience efficiency like never before.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="text-start flex flex-col items-center mt-20 space-y-4"
          >
            <p className="type1 lg:text-2xl md:text-sm text-xs font-bold">
              &quot;welcome to the future of automation with HIAIDO&quot;
            </p>

            <div
              value={data.request_email}
              name="request_email"
              className="md:flex-row flex flex-col items-center justify-center gap-4"
            >
              <input
                onChange={handleInputChange}
                className="input-placeholder decoration-none focus:outline-none placeholder:text-black bg-white/80 text-black/80 md:py-2 py-1 pl-6 font-semibold rounded-full"
                type="text"
                placeholder="hiaido@gmail.com"
              />

              <button
                className="bg-orange-500/80 w-44 md:py-2 px-4 py-1 font-semibold rounded-full"
                onClick={refreshPage}
                type="submit"
              >
                <AnimatedText text="Request Demo" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Star Canvas */}
      <div className="absolute inset-0 w-full h-auto">
        <Canvas
          events={false}
          camera={{ position: [0, 0, 1] }}
          className="canvas-container min-h-screen opacity-75"
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
