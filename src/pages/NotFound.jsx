import { useNavigate } from "react-router-dom";
import AnimatedText from "../components/shared/AnimatedText";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black/90 flex flex-col items-center justify-center min-h-screen text-center">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-orange-500">
          Oops! You&apos;ve hit a <AnimatedText text="404" /> page.
        </h1>

        <p className="mt-4 text-xl">
          We&apos;re sorry, but the page <br /> you were looking for
          doesn&apos;t exist.
        </p>

        <button
          onClick={() => navigate("/")}
          className="border-orange-400/40 px-10 py-2 mt-8 text-white border-2 rounded-full"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
