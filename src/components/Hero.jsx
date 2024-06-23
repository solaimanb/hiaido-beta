import { curve, heroBackground, robot } from "../assets";
import Button from "./Button";
import Section from "./Section";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState } from "react";


const Hero = () => {
  const parallaxRef = useRef(null);

  const [data, setData] = useState({
		request_email: '',
	  });

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setData({
        ...data,
        [name]: value
      });
      };
    
    const handleSubmit = (event) => {
      event.preventDefault();
      // Do something with the form data, for example, send it to a server
      // console.log(data);
      // Reset form fields
      setData({
        data
      });
      };
  
      const refreshPage  = () => {
        toast("Details submitted Successfully");
       window.location.href = '/'
       }
  
  


  return (
    <Section
      className="pt-[5rem] -mt-[5.27rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div className="relative z-1 max-w-[55rem] mx-auto text-center">
          <h1 className="h1 mt-[4rem] mb-6">
            The Next Generation &nbsp;&nbsp;
            <span className="inline-block relative">
              AI Powered{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
            <span className="mt-2 text-orange-500 inline-block relative">
              Cloud Automation Platform
            </span>
          </h1>
          <p className="body-1 max-w-6xl font-mono mx-auto font text-n-2 ">
            HIAIDO is a powerful AI platform designed to revolutionize your
            cloud operations, seamlessly automating tasks and amplifying
            efficiency. To make cloud management intuitive, we offer tailored
            solutions and ongoing innovation, redefining seamless cloud
            experiences. Experience efficiency like never before.
          </p>
          <p className="body-1 type1 font-mono max-w-2xl mx-auto mb-6 font-bold text-xs lg:text-2xl font text-n-2 lg:mb-8">
            {" "}
            "Welcome to the future of automation with HIAIDO"
          </p>
        </div>
        <form onSubmit={handleSubmit}>
        <div value={data.request_email} name="request_email"  className="flex flex-wrap justify-center items-center gap-6">
        <input onChange={handleInputChange} 
            className="bg-white text-black mr-6 placeholder:p-2 h-8 rounded decoration-none font-code placeholder:text-black "
            type="text"
            placeholder="email"
          />
          <Button onClick={refreshPage} type="submit">
            Request a Demo
          </Button>
          </div>
          </form>
      </div>
    </Section>
  );
};

export default Hero;
