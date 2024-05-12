import { curve, heroBackground, robot } from "../assets";
import Section from "./Section";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PointMaterial,
  Points,
  // Preload,
} from "@react-three/drei";
import "../index.css";
import * as random from "maath/random/dist/maath-random.esm";

function Stars(props) {
  const ref = useRef();
  // const [sphere] = useState(() =>
  //   random.inSphere(new Float32Array(5000), { radius: 1.5 })
  // );
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
    // <group rotation={[0, 0, Math.PI / 4]}>

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
    // </group>
  );
}

const Hero = () => {
  // const parallaxRef = useRef(null);

  // const [data, setData] = useState({
  //   request_email: "",
  // });

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setData({
  //     ...data,
  //     [name]: value,
  //   });
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Do something with the form data, for example, send it to a server
  //   console.log(data);
  //   // Reset form fields
  //   setData({
  //     data,
  //   });
  // };

  // const refreshPage = () => {
  //   toast("Details submitted Successfully");
  //   window.location.href = "/";
  // };

  return (
    <Section
      className="pt-[3rem] -mt-[5.27rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      {/* <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[55rem] mx-auto text-center">
          <h1 className="h1 mt-[4.5rem] mb-6">
            The Next Generation &nbsp;&nbsp;
            <span className="relative inline-block">
              AI Powered{" "}
              <img
                src={curve}
                className="top-full xl:-mt-2 absolute left-0 w-full"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
            <span className="relative inline-block mt-2 text-orange-500">
              Cloud Automation Platform
            </span>
          </h1>
          <p className="body-1 font text-n-2 max-w-6xl mx-auto font-mono">
            HIAIDO is a powerful AI platform designed to revolutionize your
            cloud operations, seamlessly automating tasks and amplifying
            efficiency. To make cloud management intuitive, we offer tailored
            solutions and ongoing innovation, redefining seamless cloud
            experiences. Experience efficiency like never before.
          </p>
          <p className="body-1 type1 lg:text-2xl font text-n-2 lg:mb-8 max-w-2xl mx-auto mb-6 font-mono text-xs font-bold">
            &quot;welcome to the future of automation with HIAIDO&quot;
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div
            value={data.request_email}
            name="request_email"
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <div>
              <input
                onChange={handleInputChange}
                className="placeholder:p-2 decoration-none font-code placeholder:text-black h-8 mt-5 text-black bg-white rounded"
                type="text"
                placeholder="email"
              />
            </div>
            <div>
              <Button className="mt-5" onClick={refreshPage} type="submit">
                Request Demo
              </Button>
            </div>
          </div>
        </form>
      </div> */}

      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-[12vw] md:text-[10vw] text-center">
          <span className="inline-block font-bold text-orange-500">HIAIDO</span>
        </h1>

        <p className="lg:mt-20 lg:text-2xl text-white/80 mt-10 text-xl font-bold">
          The Next Generation &nbsp;&nbsp;
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
          <br className="xl:hidden" />{" "}
          <span className=" relative inline-block mt-2">
            Cloud Automation Platform
          </span>
        </p>
      </div>

      {/* Star Canvas */}
      <div className="absolute inset-0 w-full h-auto">
        <Canvas
          camera={{ position: [0, 0, 1] }}
          className="canvas-container min-h-screen opacity-75"
        >
          <mesh>
            <OrbitControls />
            <Stars />
          </mesh>
        </Canvas>
      </div>
    </Section>
  );
};

export default Hero;
