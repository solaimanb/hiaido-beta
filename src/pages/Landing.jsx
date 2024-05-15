import Benefits from "../components/page-components/homepage/Benefits";
import Hero from "../components/page-components/homepage/Hero";
import Contact from "../components/shared/Contact";
import { Helmet } from "react-helmet-async";

const Landing = () => {
  window.scrollTo(0, 0);

  return (
    <>
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
      <main className="bg-black/90 min-h-screen px-2 overflow-hidden">
        <Hero />
        <Benefits />
        <Contact />
      </main>
    </>
  );
};
export default Landing;
