// import gridline from "../../../assets/gridline.svg";

import email from "../../../assets/images/email.png";
import phone from "../../../assets/images/phone.png";
import admin from "../../../assets/images/admin.png";
import place from "../../../assets/images/place.png";
import AnimatedText from "../../shared/AnimatedText";

// Contact Details:
const contactDetails = [
  {
    image: admin,
    text: "Karthik Thandapani",
  },
  {
    image: email,
    text: "ceo@hiaido.com",
    link: "mailto:ceo@hiaido.com",
  },
  {
    image: phone,
    text: "+91 8939979393",
  },
  {
    image: place,
    text: "Chennai, India",
  },
];

const Contact = () => {
  return (
    <div
      // style={{
      //   backgroundImage: `url(${gridline})`,
      //   backgroundRepeat: "repeat",
      // }}
      className="container bg-black/90 rounded-2xl bg-gradient-to-r from-black via-orange-400/5 to-black border-orange-400/10 lg:p-10 relative w-full md:w-[95%] py-10 mx-auto text-center border"
    >
      <div className="">
        <div className="relative flex items-center justify-center">
          <h1 className="md:text-9xl opacity-10 text-7xl font-bold text-orange-400 uppercase">
            Contact
          </h1>

          <h2 className="text-orange-500/90 md:text-5xl absolute top-0 flex items-center justify-center w-full h-full mx-auto text-3xl font-bold">
            Get In Touch
          </h2>
        </div>
      </div>

      <div className="lg:grid-cols-2 grid grid-cols-1 mx-auto">
        <div className="lg:static lg:px-8 lg:py-32 relative px-6">
          <div className="lg:mx-0 lg:max-w-lg lg:text-start max-w-xl mx-auto text-center">
            <p className="text-white/60 text-lg font-semibold leading-8">
              Need to get in touch with us? Either fill out the form with your
              details or reach out to us directly via email or phone. We&apos;re
              always here to help and answer any questions you might have.
            </p>

            <dl className=" text-white/70 w-full mt-10 space-y-4 text-base leading-7">
              <div className="gap-x-2">
                <dt className="flex-none">
                  <span className="font-thin sr-only">Email</span>
                </dt>

                <dd className="flex items-center justify-center w-full">
                  <div className=" md:space-y-2 flex flex-col items-center justify-center w-full gap-2 space-y-4 text-base font-semibold">
                    {contactDetails.map((detail, index) => (
                      <span
                        key={index}
                        className=" md:justify-start lg:flex-row flex flex-col items-center justify-center w-full gap-3"
                      >
                        <span>
                          <img
                            src={detail?.image}
                            height={25}
                            width={25}
                            className="opacity-70"
                          />
                        </span>

                        {detail?.link ? (
                          <a href={detail?.link} className="">
                            {detail?.text}
                          </a>
                        ) : (
                          <p className="">{detail?.text}</p>
                        )}
                      </span>
                    ))}
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
                    className="bg-white/5 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6 border-orange-400/40 input-placeholder block w-full px-2 py-2 font-semibold text-white border-b rounded-sm shadow-sm"
                    name="firstName"
                    placeholder="Kelsey"
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
                    className="bg-white/5 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6 border-orange-400/40 input-placeholder block w-full px-2 py-2 font-semibold text-white border-b rounded-sm shadow-sm"
                    name="lastName"
                    placeholder="Turner"
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
                    className="bg-white/5 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6 border-orange-400/40 input-placeholder block w-full px-2 py-2 font-semibold text-white border-b rounded-sm shadow-sm"
                    name="email"
                    placeholder="turner@gmail.com"
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
                    className="bg-white/5 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6 border-orange-400/40 input-placeholder block w-full px-2 py-2 font-semibold text-white border-b rounded-sm shadow-sm"
                    name="message"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="md:justify-end flex justify-center mt-8">
              <button
                className="bg-orange-500/80 md:w-fit w-full px-4 py-2 font-semibold rounded-full"
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
