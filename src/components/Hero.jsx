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
      className="pt-[3rem] -mt-[5.27rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="flex justify-center h-[80vh] relative md:min-h-screen">
        <motion.div
          initial={{ scale: 2 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 10,
            duration: 1,
            ease: "easeInOut",
          }}
          className="z-1 absolute flex flex-col items-center justify-center h-[80vh] min-h-screen text-center space-y-6 md:space-y-8 max-w-5xl mx-auto w-full px-4 mt-20"
        >
          <p className="lg:text-5xl md:px-0 md:text-4xl lg:pt-10 px-4 space-y-4 text-3xl font-bold">
            <div className="text-white">
              The Next Generation
              <br />
              <span className="relative inline-block">
                AI Powered
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

          <p className="body-1 opacity-80 w-full md:w-[90%] mx-auto md:text-xl">
            HIAIDO is a powerful AI platform designed to revolutionize your
            cloud operations, seamlessly automating tasks and amplifying
            efficiency.
            <br />
            To make cloud management intuitive, we offer tailored solutions and
            ongoing innovation, redefining seamless cloud experiences.
            Experience efficiency like never before.
          </p>

          <p className="body-1 type1 lg:text-2xl mx-auto text-sm font-bold">
            &quot;welcome to the future of automation with HIAIDO&quot;
          </p>

          <form onSubmit={handleSubmit}>
            <div
              value={data.request_email}
              name="request_email"
              className="md:mt-10 md:flex-row flex flex-col items-center justify-center gap-4"
            >
              <input
                onChange={handleInputChange}
                className="decoration-none focus:outline-none placeholder:text-black bg-white/80 text-black/80 py-2 pl-6 font-semibold rounded-full"
                type="text"
                placeholder="hiaido@gmail.com"
              />

              <button
                className="bg-orange-500/80 px-4 py-2 font-semibold rounded-full"
                onClick={refreshPage}
                type="submit"
              >
                Request Demo
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
