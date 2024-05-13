import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
// import FeaturedSlide from "./FeaturedSlide";
import Benefits from "../components/Benefits";
// import FeaturedHighlight from "../components/FeaturedHighlight";
import HighlightStory from "../components/HighlightStory";
// import FeatSlider from "./FeatSlider";

const Landing = () => {
  useEffect(() => {
    document.title = "Hiaido | Home";
  }, []);

  return (
    <div className="bg-black/90 pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden min-h-screen">
      <Header />
      <Hero />
      {/* <FeatSlider /> */}
      {/* <FeaturedSlide /> */}
      {/* <FeaturedHighlight /> */}
      <HighlightStory />
      <Benefits />
      <Footer />
    </div>
  );
};
export default Landing;
