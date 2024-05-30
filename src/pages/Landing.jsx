import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";

// Using React.lazy to dynamically import components for the Landing page.
const Hero = lazy(() => import("../components/page-components/homepage/Hero"));
const Benefits = lazy(() =>
  import("../components/page-components/homepage/Benefits")
);
const Contact = lazy(() => import("../components/shared/Contact"));

const Landing = () => {
  window.scrollTo(0, 0);

  return (
    <Suspense fallback={<div className="bg-dark w-screen h-screen"></div>}>
      {/* SEO CONTENT */}
      <Helmet>
        <title>
          Hiaido | AI Powered Cloud Automation Platform | Seamlessly automate
          tasks, optimize resources, and drive efficiency for your business.
        </title>
        <meta
          name="description"
          content="HIAIDO is a powerful AI platform designed to revolutionize your cloud operations, seamlessly automating tasks and amplifying efficiency."
        />
        <meta
          name="keywords"
          content="Cloud, Automation, AI, Operations, India, Cloud Operations, Cloud Automation, AI Platform, Task Automation, Efficiency, Scalability, Cloud Infrastructure, Cloud Services, Cloud Computing"
        />
        <meta name="author" content="Hiaido" />
      </Helmet>

      {/* MAIN CONTENT */}
      <main className="bg-dark min-h-screen px-2 overflow-hidden">
        <Hero />
        <Benefits />
        <Contact />
      </main>
    </Suspense>
  );
};
export default Landing;
