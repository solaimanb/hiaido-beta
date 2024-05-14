import Benefits from "../components/page-components/homepage/Benefits";
import Hero from "../components/page-components/homepage/Hero";
import Contact from "../components/shared/Contact";

const Landing = () => {
  return (
    <div className="bg-black/90 min-h-screen px-2 overflow-hidden">
      <Hero />
      <Benefits />
      <Contact />
    </div>
  );
};
export default Landing;
