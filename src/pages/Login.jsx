import { hiaido } from "../assets";
import { Helmet } from "react-helmet-async";

import { useEffect } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import awsExports from "../awsExports";

Amplify.configure(awsExports);

const components = {
  // Footer() {
  //   const { toForgotPassword } = useAuthenticator();
  //   return (
  //     <Button
  //       fontWeight="normal"
  //       onClick={toForgotPassword}
  //       size="small"
  //       variation="link"
  //     >
  //       Forgot Password?
  //     </Button>
  //   );
  // },
};

const formFields = {
  signIn: {
    username: {
      placeholder: "Username",
    },
    password: {
      placeholder: "Password",
    },
  },
  forgotPassword: {
    username: {
      placeholder: "Enter your email",
    },
  },
};

const Login = () => {
  window.scrollTo(0, 0);

  const navigate = useNavigate();

  const { route } = useAuthenticator((context) => [context.route]);

  useEffect(() => {
    if (route === "/forgotPassword") {
      navigate("/signIn", { replace: true });
    }
  }, [route, navigate]);

  return (
    <>
      {/* SEO CONTENT */}
      <Helmet>
        <title>Hiaido | Sign In</title>
        <meta
          name="description"
          content="Sign in to your Hiaido account. Access our AI-powered cloud operations automation platform."
        />
        <meta
          name="keywords"
          content="Hiaido, Sign In, Login, Account Access"
        />
        <meta name="author" content="Hiaido" />
      </Helmet>

      {/* MAIN CONTENT */}
      <div className="bg-black/90 flex items-center justify-center w-full h-full min-h-screen p-4">
        <div className="md:flex-row border-orange-400/10 backdrop-blur-sm flex flex-col items-center w-full h-[96vh] border rounded-lg space-y-6 md:space-y-0">
          {/* HiAiDo Image Banner */}
          <div className="lg:flex md:w-1/2 xl:w-2/3 relative flex items-center justify-center w-full p-10">
            <div>
              <img src={hiaido} alt="logo" width={400} />
            </div>
          </div>

          <div className="md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12 bor border-orange-400/10 bg-orange-400/5 relative flex items-center justify-center w-full h-full px-6 border-l">
            <div className="top-2 left-2 absolute px-2">
              <Link
                to="/"
                className="border-white/90 hover:bg-white/10 hover:text-white/100 text-orange-400/80 flex items-center gap-1 p-2 text-xs transition-all duration-200 rounded-md"
              >
                <ArrowLeftIcon /> Back to home
              </Link>
            </div>

            <div className="h-100 relative w-full space-y-10">
              <h1 className="mt-12 text-xl font-bold leading-tight text-center">
                Log in to your account
              </h1>
              <div className="horizon-bar opacity-30 container h-[1px] mt-10 bg-orange-400" />

              <Authenticator formFields={formFields} components={components} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
