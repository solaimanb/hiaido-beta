import { useEffect } from "react";
import Benefits from "./Benefits";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
// import FeaturedSlide from "./FeaturedSlide";
import FeaturedHighlight from "./FeaturedHighlight";
import HighlightStory from "./HighlightStory";

const Landing = () => {
  useEffect(() => {
    document.title = "Hiaido | Home";
  }, []);

  return (
    <div className="bg-black/90 pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden min-h-screen">
      <Header />
      <Hero />
      {/* <FeaturedSlide /> */}
      <FeaturedHighlight />
      <HighlightStory />
      <Benefits />
      <Footer />
    </div>
  );
};
export default Landing;
