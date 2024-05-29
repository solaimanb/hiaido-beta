import email from "../../assets/images/email.png";
import phone from "../../assets/images/phone.png";
import admin from "../../assets/images/admin.png";
import place from "../../assets/images/place.png";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";

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
    <div className="container bg-dark rounded-2xl bg-gradient-to-r from-black via-orange-400/10 to-black border-orange-500/20 lg:p-10 relative w-full md:w-[95%] py-10 md:mx-auto text-center border">
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
              {/* First Name */}
              <div className="group text-start relative z-0 w-full mb-5">
                <input
                  type="text"
                  name="first_name"
                  onChange={handleInputChange}
                  value={formData.first_name}
                  id="floating_first_name"
                  className="block py-2.5 font-semibold w-full text-sm text-white bg-transparent border-0 border-b-2 appearance-none dark:text-white  dark:focus:border-white focus:outline-none focus:ring-0 focus:bg-orange-400/5 focus:border-orange-400/20 peer border-orange-400/30 px-2"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_first_name"
                  className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  First name
                </label>
              </div>

              {/* Last Name */}
              <div className="group text-start relative z-0 w-full mb-5">
                <input
                  type="text"
                  name="last_name"
                  onChange={handleInputChange}
                  value={formData.last_name}
                  id="floating_last_name"
                  className="block py-2.5 font-semibold w-full text-sm text-white bg-transparent border-0 border-b-2 appearance-none dark:text-white  dark:focus:border-white focus:outline-none focus:ring-0 focus:bg-orange-400/5 focus:border-orange-400/20 peer border-orange-400/30 px-2"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Last name
                </label>
              </div>

              {/* Email Field */}
              <div className="group sm:col-span-2 text-start relative z-0 w-full mb-5">
                <input
                  type="email"
                  name="email"
                  id="floating_email"
                  onChange={handleInputChange}
                  value={formData.email}
                  className="block py-2.5 font-semibold w-full text-sm text-white bg-transparent border-0 border-b-2 appearance-none dark:text-white  dark:focus:border-white focus:outline-none focus:ring-0 focus:bg-orange-400/5 focus:border-orange-400/20 peer border-orange-400/30 px-2"
                  placeholder=" "
                  required
                />
                <div className="text-red-400">{error.email_err}</div>
                <label
                  htmlFor="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
              </div>

              {/* Message Field */}
              <div className="sm:col-span-2 text-start relative z-0 w-full">
                <textarea
                  type="text"
                  name="messages"
                  value={formData.messages}
                  onChange={handleInputChange}
                  id="floating_last_name"
                  className="block py-2.5 font-semibold w-full text-sm text-white bg-transparent border-0 border-b-2 appearance-none dark:text-white  dark:focus:border-white focus:outline-none focus:ring-0 focus:bg-orange-400/5 focus:border-orange-400/20 peer border-orange-400/30 px-2"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_last_name"
                  className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Write your message..
                </label>
              </div>
            </div>

            <div className="md:justify-end flex justify-center mt-8">
              <button
                className="bg-orange-500/80 hover:bg-orange-500/70 hover:scale-105 md:w-fit w-full px-4 py-2 font-semibold transition duration-200 rounded-full"
                type="submit"
              >
                Send message
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
