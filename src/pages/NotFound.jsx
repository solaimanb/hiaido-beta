import { useNavigate } from "react-router-dom";
import AnimatedText from "../components/shared/AnimatedText";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  return (
    <>
      {/* SEO CONTENT */}
      <Helmet>
        <title>Hiaido | Not Found</title>
        <meta
          name="description"
          content="The page you were looking for doesn't exist. Navigate back to our homepage."
        />
        <meta name="keywords" content="Hiaido, 404, Page Not Found" />
        <meta name="author" content="Hiaido" />
      </Helmet>

      {/* MAIN CONTENT */}
      <div className="bg-black/90 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="max-w-6xl">
          <div className="block text-4xl font-bold text-orange-500">
            Oops! You&apos;ve hit a <AnimatedText text="404" /> page.
          </div>

          <p className="opacity-80 mt-4">
            The page you&apos;re looking for isn&apos;t here. <br /> But
            don&apos;t worry, there&apos;s plenty more to explore!
          </p>

          <button
            onClick={() => navigate("/")}
            className="border-orange-400/40 px-10 py-2 mt-8 text-white border-2 rounded-full"
          >
            Go to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
