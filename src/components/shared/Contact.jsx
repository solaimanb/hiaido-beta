import email from "../../assets/images/email.png";
import phone from "../../assets/images/phone.png";
import admin from "../../assets/images/admin.png";
import place from "../../assets/images/place.png";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";

import AnimatedText from "./AnimatedText";

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
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    email: "",
    messages: "",
  });

  if (isLoader) {
    console.log("Form submitting..");
  }

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const checkEmail = () => {
    var isValid = true;
    let err = {};
    if (!formData.first_name || !formData?.first_name?.trim()) {
      isValid = false;
      err["first_name_err"] = "Please enter first name!";
    }

    if (!formData.last_name || !formData?.last_name?.trim()) {
      isValid = false;

      err["last_name_err"] = "Please enter last name!";
    }

    if (!formData.email || !formData?.email?.trim()) {
      isValid = false;
      err["email_err"] = "Please enter email!";
    } else if (typeof formData.email !== "undefined") {
      let lastAtPos = formData.email.lastIndexOf("@");
      let lastDotPos = formData.email.lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          formData.email.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          formData.email?.length - lastDotPos > 2
        )
      ) {
        isValid = false;
        err["email_err"] = "Email is not valid!";
      }
    }
    setError(err);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checkEmail()) {
      setIsLoader(true);
      const bodyFormData = new FormData();
      bodyFormData.append("email", formData.email);
      bodyFormData.append("first_name", formData.first_name);
      bodyFormData.append("last_name", formData.last_name);
      bodyFormData.append("messages", formData.messages);

      console.log(bodyFormData);

      axios({
        method: "POST",
        url: "https://api.hiaido.com/public/api/contactUsData",
        data: bodyFormData,
      })
        .then((response) => {
          if (response?.data.status === true) {
            setIsLoader(false);
            toast.success(response?.data.message);
            refreshPage();
            setTimeout(() => {
              navigate("/");
            }, 2000);
            console.log("Data saved successfully");
          } else {
            setIsLoader(false);
            toast.error("Something went wrong!");
          }
        })
        .catch((err) => {
          setIsLoader(false);
          console.error("Error while saving data" + err);
          toast.error("Internal Server Error!");
          refreshPage();
          return;
        });
    }
  };

  const refreshPage = () => {
    setFormData({
      email: "",
      last_name: "",
      first_name: "",
      messages: "",
    });
  };

  return (
    <div className="container bg-black/90 rounded-2xl bg-gradient-to-r from-black via-orange-400/5 to-black border-orange-400/10 lg:p-10 relative w-full md:w-[95%] py-10 md:mx-auto text-center border mx-1">
      <div className="">
        <div className="relative flex items-center justify-center">
          <h1 className="md:text-9xl opacity-10 text-6xl font-bold text-orange-400 uppercase">
            Contact
          </h1>

          <h2 className="text-orange-500/90 md:text-6xl absolute top-0 flex items-center justify-center w-full h-full mx-auto text-3xl font-bold">
            Get In Touch
          </h2>
        </div>
      </div>

      <div className="lg:grid-cols-2 grid grid-cols-1 mx-auto mt-4">
        <div className="lg:px-8 lg:py-32 relative px-1">
          <div className="lg:mx-0 lg:max-w-lg lg:text-start mx-auto text-center">
            <p className="text-white/60 text-lg font-[500] md:font-semibold leading-8">
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
        <form
          onSubmit={handleSubmit}
          className="sm:pb-32 lg:px-8 lg:py-32 px-2 pt-20 pb-24"
        >
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
                    name="first_name"
                    placeholder="Enter your first name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                  <div className="text-start mt-1 text-xs text-red-400">
                    {error.first_name_err}
                  </div>
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
                    name="last_name"
                    placeholder="Enter your last name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                  <div className="text-start mt-1 text-xs text-red-400">
                    {error.last_name_err}
                  </div>
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
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <div className="text-start mt-1 text-xs text-red-400">
                    {error.email_err}
                  </div>
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
                    name="messages"
                    placeholder="Write your message here..."
                    value={formData.messages}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="md:justify-end flex justify-center mt-8">
              <button
                className="bg-orange-500/80 md:w-fit w-full px-4 py-2 font-semibold rounded-full"
                type="submit"
              >
                <AnimatedText text="Send message" />
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
