import aws from "../../../assets/images/aws.png";
// import Heading from "../../Heading";
// import Section from "../../Section";
import Heading from "../../Heading";
import Section from "../../Section";
import azure from "../../../assets/images/azure.png";
import gcp from "../../../assets/images/gcp.png";
// import "../index.css";
import "../../../index.css";
// import email from "../assets/images/email.png";
// import phone from "../assets/images/phone.png";
// import admin from "../assets/images/admin.png";
// import place from "../assets/images/place.png";

const Benefits = () => {
  return (
    <Section id="features">
      <div className="z-2 md:mt-40 container relative mt-20">
        <div className="flex flex-col flex-wrap items-center justify-center gap-4 mb-8 font-bold">
          <p className="md:text-3xl lg:text-5xl w-auto text-center text-orange-400">
            Build Faster, Build Better, Build With AI
          </p>
          <p className=" type2 lg:text-3xl text-center">
            {" "}
            automate anything, almost, literally...
          </p>
        </div>

        <Heading
          className="md:max-w-md lg:max-w-2xl p-8 text-center"
          title="Our Cloud Partners"
        />

        <div className="flex flex-wrap items-center justify-center gap-10 mb-10">
          <div className="group rounded-xl border-orange-400/40 hover:scale-110 backdrop-blur-sm relative p-10 overflow-hidden transition-transform duration-300 border shadow-2xl">
            <img src={aws} alt="aws" />
          </div>
          <div className="group rounded-xl border-orange-400/40 hover:scale-110 backdrop-blur-sm relative p-10 overflow-hidden transition-transform duration-300 border shadow-2xl">
            <img src={azure} alt="azure" />
          </div>
          <div className="group rounded-xl border-orange-400/40 hover:scale-110 backdrop-blur-sm relative p-10 overflow-hidden transition-transform duration-300 border shadow-2xl">
            <img src={gcp} alt="gcp" />
          </div>
        </div>

        {/* <div className="isolate bg-n-8 relative h-auto">
          <div className="max-w-7xl lg:grid-cols-2 grid grid-cols-1 mx-auto mt-16">
            <div className="bg-n-8 sm:pt-32 lg:static lg:px-8 lg:py-32 relative px-6 pt-24 pb-20">
              <div className="lg:mx-0 lg:max-w-lg max-w-xl mx-auto">
                <div className="-z-10 lg:w-1/2 absolute inset-y-0 left-0 w-full overflow-hidden">
                  <svg
                    className=" absolute inset-0 w-full h-full"
                    aria-hidden="true"
                  >
                    <defs>
                      <pattern
                        id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                        width="200"
                        height="200"
                        x="100%"
                        y="-1"
                        patternUnits="userSpaceOnUse"
                      >
                        <path d="M130 200V.5M.5 .5H200" fill="none"></path>
                      </pattern>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      strokeWidth="0"
                      fill="white"
                    ></rect>
                    <svg x="100%" y="-1" className=" overflow-visible">
                      <path d="M-470.5 0h201v201h-201Z" strokeWidth="0"></path>
                    </svg>
                    <rect
                      width="100%"
                      height="100%"
                      strokeWidth="0"
                      fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                    ></rect>
                  </svg>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  Contact Us
                </h2>
                <p className="mt-6 text-lg font-thin leading-8 text-white">
                  Need to get in touch with us ? Either fill out the form with
                  your inquiry or find the contact details below.{" "}
                </p>
                <dl className="mt-10 space-y-4 text-base leading-7 text-white">
                  <div className="gap-x-4 flex">
                    <dt className="flex-none">
                      <span className=" font-thin sr-only">Email</span>
                    </dt>
                    <dd>
                      <div className=" flex flex-col items-start justify-start gap-2 text-2xl">
                        <span className="flex items-center gap-3">
                          {" "}
                          <span>
                            {" "}
                            <img src={admin} height={25} width={25} />
                          </span>{" "}
                          <h1 className=" font-sans text-sm">
                            Karthik Thandapani
                          </h1>
                        </span>
                        <a
                          href="mailto:ceo@hiaido.com"
                          className="flex items-center gap-3"
                        >
                          {" "}
                          <span>
                            {" "}
                            <img src={email} height={25} width={25} />
                          </span>{" "}
                          <h1 className=" font-sans text-sm">ceo@hiaido.com</h1>
                        </a>
                        <span className="flex items-center gap-3">
                          {" "}
                          <span>
                            {" "}
                            <img src={phone} height={25} width={25} />
                          </span>{" "}
                          <h1 className="font-sans text-sm">+91 8939979393</h1>
                        </span>
                        <span className="flex items-center gap-3">
                          <span>
                            <img height={25} width={25} src={place} />
                          </span>
                          <h1 className=" font-sans text-sm">Chennai, India</h1>
                        </span>
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <form className="sm:pb-32 lg:px-8 lg:py-32 px-6 pt-20 pb-24">
              <div className="lg:mr-0 lg:max-w-lg max-w-xl mx-auto">
                <div className="gap-x-8 gap-y-6 sm:grid-cols-2 grid grid-cols-1">
                  <div>
                    <label
                      htmlFor="first-name"
                      className=" block text-sm font-semibold leading-6"
                    >
                      First name
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full bg-white rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="firstName"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="last-name"
                      className=" block text-sm font-semibold leading-6"
                    >
                      Last name
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        id="last-name"
                        autoComplete="family-name"
                        className="block bg-white w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="lastName"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="email"
                      className=" block text-sm font-semibold leading-6"
                    >
                      Email
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        className="block bg-white w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className=" block text-sm font-semibold leading-6"
                    >
                      Message
                    </label>
                    <div className="mt-2.5">
                      <textarea
                        id="message"
                        rows="4"
                        className="block bg-white w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="message"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <button
                    type="submit"
                    className="w-max  rounded-2xl border-2 border-[#0057ff] bg-[#0057ff]  px-5 py-1.5 text-sm font-semibold text-white transition-colors duration-150 ease-in-out hover:border-blue-400 hover:bg-blue-400"
                  >
                    Send message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div> */}
      </div>
    </Section>
  );
};

export default Benefits;
