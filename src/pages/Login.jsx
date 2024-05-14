import { useEffect } from "react";
import { hiaido } from "../assets";
import AnimatedText from "../components/shared/AnimatedText";

const Login = () => {
  useEffect(() => {
    document.title = "Hiaido | Sign In";
  }, []);

  return (
    <section className="bg-black/90 flex items-center justify-center w-full h-full min-h-screen p-4">
      <div className="md:flex-row border-orange-400/10 backdrop-blur-sm flex flex-col items-center w-full h-[96vh] border rounded-lg space-y-6">
        <div className=" lg:flex md:w-1/2 xl:w-2/3 flex items-center justify-center w-full p-10">
          <div>
            <img src={hiaido} alt="logo" width={400} />
          </div>
        </div>

        <div className="md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12 bor border-orange-400/10 bg-orange-400/5 flex items-center justify-center w-full h-full px-6 border-l">
          <div className="h-100 w-full">
            <h1 className="md:text-2xl mt-12 text-xl font-bold leading-tight text-center">
              Log in to your account
            </h1>

            <form className="mt-6" action="#" method="POST">
              <div>
                {/* <label className="block">Email Address</label> */}
                <input
                  type="email"
                  name=""
                  id="username"
                  placeholder="Enter Email Address"
                  className="bg-white/5 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6 border-orange-400/40 input-placeholder block w-full px-2 py-2 font-semibold text-white border-b rounded-sm shadow-sm"
                  autoFocus
                  required
                />
              </div>

              <div className="mt-6">
                {/* <label className="block text-gray-700">Password</label> */}
                <input
                  type="password"
                  name=""
                  id="password"
                  placeholder="Enter Password"
                  minLength="6"
                  className="bg-white/5 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6 border-orange-400/40 input-placeholder block w-full px-2 py-2 font-semibold text-white border-b rounded-sm shadow-sm"
                  required
                />
              </div>

              <div className="mt-2 text-right">
                <a
                  href="#"
                  className="hover:text-orange-400/50 text-orange-400/80 text-xs font-medium"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="hover:bg-orange-600 focus:bg-orange-500 hover:scale-95 block w-full px-4 py-1 mt-6 font-semibold text-white transition duration-300 bg-orange-500 rounded-full"
              >
                <AnimatedText text="Login" />
              </button>
            </form>

            <div className="horizon-bar opacity-30 container h-[1px] mt-10 bg-orange-400" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
