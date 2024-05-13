import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import HighlightStory from "../components/HighlightStory";

const Landing = () => {
  return (
    <div className="bg-black/90 min-h-screen overflow-hidden">
      <Header />
      <Hero />
      <HighlightStory />
      <Benefits />
      <Footer />
    </div>
  );
};
export default Landing;
