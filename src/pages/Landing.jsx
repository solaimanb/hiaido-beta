import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import Hero from "../components/Hero";
import Benefits from "../components/page-components/homepage/Benefits";
import Contact from "../components/page-components/homepage/Contact";

const Landing = () => {
  return (
    <div className="bg-black/90 min-h-screen overflow-hidden">
      <Header />
      <Hero />
      <Benefits />
      <Contact />
      <Footer />
    </div>
  );
};
export default Landing;
