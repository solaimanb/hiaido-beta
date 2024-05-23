import { curve } from "../../../assets";
import Section from "../../Section";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import AnimatedText from "../../shared/AnimatedText";
import axios from "axios";

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
  const [data, setData] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  if (isLoader) {
    console.log("submitting request..", isLoader);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (checkEmail()) {
      setIsLoader(true);
      const bodyFormData = new FormData();
      bodyFormData.append("email", data);

      axios({
        method: "POST",
        url: "https://api.hiaido.com/public/api/demo",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          if (response?.data.status === true) {
            setIsLoader(false);
            console.log(response.data);
            toast.success(response?.data.message);
            setData("");
          } else {
            setIsLoader(false);
            toast.error("Something went wrong!");
          }
        })
        .catch((err) => {
          setIsLoader(false);
          console.error("Error while saving data" + err);
          toast.error("Internal Server Error!");
        });
    }
  };

  const checkEmail = () => {
    var isValid = true;

    if (typeof data !== "undefined") {
      let lastAtPos = data.lastIndexOf("@");
      let lastDotPos = data.lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          data.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          data?.length - lastDotPos > 2
        )
      ) {
        isValid = false;
        toast.error("Email is not valid");
      }
    }

    return isValid;
  };

  return (
    <Section
      className=""
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="flex justify-center h-[80vh] relative md:min-h-screen mt-40 md:mt-10">
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
          className="z-1 absolute flex flex-col items-center justify-center h-[80vh]  text-center max-w-5xl lg:max-w-7xl mx-auto w-full px-4 mt-20"
        >
          <div className="space-y-4">
            <p className="lg:text-6xl md:px-0 md:text-5xl lg:pt-10 px-2 space-y-4 text-3xl font-bold">
              <div className="text-white/90 inline-block">
                The Next Generation
                <br />
                <span className="relative inline-block">
                  <AnimatedText text="AI Powered" />
                  <img
                    src={curve}
                    className="top-full absolute left-0 w-full"
                    width={624}
                    height={28}
                    alt=""
                  />
                </span>
              </div>

              <span className="relative inline-block mt-2 text-orange-500">
                Cloud Automation Platform
              </span>
            </p>

            <div className="text-white/80 md:text-xl xl:text-2xl w-full mx-auto space-y-2">
              <p className="secondaryText">
                HIAIDO is your intelligent cloud assistant, enabling you to
                effortlessly manage your
                <br />
                cloud operations through natural language commands.
              </p>
              <p className="secondaryText">
                With HIAIDO, you can perform a variety of tasks across multiple
                cloud providers and <br /> technologies, including creating,
                describing, updating, listing, and deleting resources.
                <br />
                Whether you need to provision new infrastructure, modify
                existing configurations, or
                <br />
                simply get insights into your cloud environment, HIAIDO
                streamlines the process,
                <br />
                making cloud management intuitive and efficient.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="text-start flex flex-col items-center mt-20 space-y-4"
          >
            <p className="type1 lg:text-2xl md:text-sm text-xs font-bold">
              &quot;Welcome to the future of automation with HIAIDO&quot;
            </p>

            <div
              value={data.request_email}
              name="request_email"
              className="md:flex-row flex flex-col items-center justify-center gap-4"
            >
              <input
                onChange={(e) => setData(e.target.value.replace(/\s/g, " "))}
                className="input-placeholder decoration-none focus:outline-none placeholder:text-black bg-white/80 text-black/80 py-2 pl-6 font-semibold rounded-full"
                type="text"
                placeholder="Enter your email"
              />

              <button
                type="submit"
                className="bg-orange-500/80 w-44 px-4 font-semibold rounded-full"
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
