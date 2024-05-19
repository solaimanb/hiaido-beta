import { hiaido } from "../assets";
import { Helmet } from "react-helmet-async";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import awsExports from "../awsExports";

Amplify.configure(awsExports);

const Login = () => {
  window.scrollTo(0, 0);

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
          <div className="lg:flex md:w-1/2 xl:w-2/3 flex items-center justify-center w-full p-10">
            <div>
              <img src={hiaido} alt="logo" width={400} />
            </div>
          </div>

          <div className="md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12 bor border-orange-400/10 bg-orange-400/5 flex items-center justify-center w-full h-full px-6 border-l">
            <div className="h-100 w-full space-y-10">
              <h1 className="mt-12 text-xl font-bold leading-tight text-center">
                Log in to your account
              </h1>

              <div className="horizon-bar opacity-30 container h-[1px] mt-10 bg-orange-400" />

              <Authenticator />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;

{
  /* <Authenticator>
  {({ signOut, user }) => (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-4 text-2xl font-bold">Hello {user.username}</h1>
      <button
        onClick={signOut}
        className="hover:bg-blue-600 px-4 py-2 text-white bg-blue-500 rounded"
      >
        Sign out
      </button>
    </div>
  )}
</Authenticator>; */
}
