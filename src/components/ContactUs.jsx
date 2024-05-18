import Header from "../components/Header";
import email from '../assets/images/email.png';
import phone from '../assets/images/phone.png';
import admin from '../assets/images/admin.png';
import place from '../assets/images/place.png'
const ContactUs = () => {
  return (
    <>
      <Header />
      <div className="relative h-auto isolate bg-white">
        <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-32">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                <svg
                  className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
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
                  <svg x="100%" y="-1" className="overflow-visible fill-gray-50">
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
              <h2 className="text-3xl font-thin tracking-tight  text-gray-900">
                Contact Us
              </h2>
              <p className="mt-6 font-thin text-lg leading-8 text-gray-600">
                Need to get in touch with us ? Either fill out the form with
                your inquiry or find the contact details below.{" "}
              </p>
              <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="font-thin sr-only">Email</span>
                   
					
                  </dt>
                  <dd>
                  <a
                      class=" text-2xl gap-2 items-start justify-start flex flex-col"
                    >
                      <span  className="flex gap-3  items-center"> <span> <img src={admin} height={25} width={25} /></span>  <h1 className=" text-sm  font-sans">Karthik Thandapani</h1></span>
                      <a  href='mailto:ceo@hiaido.comm' className="flex gap-3  items-center"> <span> <img src={email} height={25} width={25} /></span>  <h1 className=" text-sm font-sans">ceo@hiaido.com</h1></a>
                      <span  className="flex gap-3 items-center"> <span> <img src={phone}  height={25} width={25} /></span> <h1 className="text-sm  font-sans" >+91 8939979393</h1></span>
                      <span className="flex gap-3 items-center"><span><img height={25} width={25} src={place}/></span><h1 className=" text-sm  font-sans">Chennai, India</h1></span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <form className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    for="first-name"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      id="first-name"
                      autocomplete="given-name"
                      className="block w-full bg-white rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="firstName"
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="last-name"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      id="last-name"
                      autocomplete="family-name"
                      className="block bg-white w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="lastName"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="email"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      id="email"
                      autocomplete="email"
                      className="block bg-white w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      name="email"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    for="message"
                    className="block text-sm font-semibold leading-6 text-gray-900"
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
              <div className="mt-8 flex justify-end">
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
      </div>
    </>
  );
};
export default ContactUs;
