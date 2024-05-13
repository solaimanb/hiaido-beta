import gridline from "../../../assets/gridline.svg";

import email from "../../../assets/images/email.png";
import phone from "../../../assets/images/phone.png";
import admin from "../../../assets/images/admin.png";
import place from "../../../assets/images/place.png";
import AnimatedText from "../../shared/AnimatedText";

const Contact = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${gridline})`,
        backgroundRepeat: "repeat",
      }}
      className="container bg-black/90 rounded-2xl bg-gradient-to-r from-black via-orange-400/20 to-black border-orange-400/20 lg:p-20 relative w-[95%] md:py-10 mx-auto text-center border"
    >
      <div className="lg:grid-cols-2 grid grid-cols-1 mx-auto">
        <div className="sm:pt-32 lg:static lg:px-8 lg:py-32 relative px-6 pt-24 pb-20">
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
              Need to get in touch with us ? Either fill out the form with your
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
                      <h1 className=" font-sans text-sm">Karthik Thandapani</h1>
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

        {/* Contact Form */}
        <form className="sm:pb-32 lg:px-8 lg:py-32 px-6 pt-20 pb-24">
          <div className="lg:mr-0 lg:max-w-lg max-w-xl mx-auto">
            <div className="gap-x-8 gap-y-6 sm:grid-cols-2 grid grid-cols-1">
              <div>
                <label
                  htmlFor="first-name"
                  className="text-start block text-sm font-semibold leading-6 text-orange-400"
                >
                  First name
                </label>

                <div className="mt-2.5">
                  <input
                    type="text"
                    id="first-name"
                    autoComplete="given-name"
                    className="bg-white/5 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6 border-orange-400/40 block w-full px-2 py-2 font-semibold text-white border-b rounded-sm shadow-sm"
                    name="firstName"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="last-name"
                  className="text-start block text-sm font-semibold leading-6 text-orange-400"
                >
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    id="last-name"
                    autoComplete="family-name"
                    className="bg-white/5 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6 border-orange-400/40 block w-full px-2 py-2 font-semibold text-white border-b rounded-sm shadow-sm"
                    name="lastName"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="text-start block text-sm font-semibold leading-6 text-orange-400"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    className="bg-white/5 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6 border-orange-400/40 block w-full px-2 py-2 font-semibold text-white border-b rounded-sm shadow-sm"
                    name="email"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="text-start block text-sm font-semibold leading-6 text-orange-400"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    rows="4"
                    className="bg-white/5 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6 border-orange-400/40 block w-full px-2 py-2 font-semibold text-white border-b rounded-sm shadow-sm"
                    name="message"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                className="bg-orange-500/80 px-4 py-2 font-semibold rounded-full"
                onClick={() => SubmitEvent()}
                type="submit"
              >
                <AnimatedText text="Send message" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
