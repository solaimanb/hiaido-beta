import gridline from "../assets/gridline.svg";

import Hiaido from "../assets/hiaido-logo.png";

const HighlightStory = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="flex flex-col items-center justify-center w-full">
        <img
          src={Hiaido}
          alt="hiaido-logo"
          className="w-[20vw] lg:w-[10vw] mb-4 -ml-4"
        />

        <div
          style={{
            backgroundImage: `url(${gridline})`,
            backgroundRepeat: "repeat",
          }}
          className="bg-black/90 rounded-2xl bg-gradient-to-r from-black via-orange-400/20 to-black border-orange-400/20 lg:p-20 container relative w-full py-10 mx-auto text-center border"
        >
          <p className="body-1 font md:text-2xl w-full md:w-[80%] mx-auto text-xl font-semibold">
            HIAIDO is a powerful AI platform designed to revolutionize your
            cloud operations, seamlessly automating tasks and amplifying
            efficiency.
            <br />
            <br />
            To make cloud management intuitive, we offer tailored solutions and
            ongoing innovation, redefining seamless cloud experiences.
            Experience efficiency like never before.
          </p>
          {/* <p className="body-1 type1 lg:text-2xl font max-w-2xl mx-auto font-mono text-xs font-bold">
        &quot;welcome to the future of automation with HIAIDO&quot;
      </p> */}
        </div>
      </div>
    </div>
  );
};

export default HighlightStory;
