import { Helmet } from "react-helmet-async";
import { lazy, Suspense } from "react";
import Loading from "../components/shared/Loading";
import FeatureSlider from "../components/page-components/homepage/feature-slider/FeatureSlider";
import About from "./About";
import Products from "./Products";
import Features from "./Features";
import Integrations from "./Integrations";
import Pricing from "./Pricing";
import Contact from "@/components/shared/Contact";

// Using React.lazy to dynamically import components for the Landing page.
const Hero = lazy(() =>
  import("../components/page-components/homepage/hero/Hero")
);
const Benefits = lazy(() =>
  import("../components/page-components/homepage/Benefits")
);

const Landing = () => {
  window.scrollTo(0, 0);

  return (
    <Suspense fallback={<Loading />}>
      {/* SEO CONTENT */}
      <Helmet>
        <title>
          Hiaido | AI Powered Cloud Automation Platform | Seamlessly automate
          tasks, optimize resources, and drive efficiency for your business.
        </title>
        <meta
          name="description"
          content="HIAIDO is your intelligent cloud assistant, enabling you to effortlessly manage your cloud operations through natural language commands."
        />
        <meta
          name="keywords"
          content="Cloud, Automation, AI, Operations, India, Cloud Operations, Cloud Automation, AI Platform, Task Automation, Efficiency, Scalability, Cloud Infrastructure, Cloud Services, Cloud Computing"
        />
        <meta name="author" content="Hiaido" />
      </Helmet>

      {/* MAIN CONTENT */}
      <main className="min-h-screen px-2 overflow-hidden bg-dark">
        <Hero />
        <FeatureSlider />
        <Benefits />
        <About />
        {/* <Products />
        <Features />
        <Integrations /> */}
        <Pricing />

        <section className="mt-40">
          <Contact />
        </section>
      </main>
    </Suspense>
  );
};
export default Landing;
