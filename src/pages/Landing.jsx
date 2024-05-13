import Footer from "../components/shared/Footer";
import Header from "../components/shared/Header";
import Hero from "../components/Hero";
import Benefits from "../components/page-components/homepage/Benefits";
// import HighlightStory from "../components/HighlightStory";

const Landing = () => {
  return (
    <div className="bg-black/90 min-h-screen overflow-hidden">
      <Header />
      <Hero />
      {/* <HighlightStory /> */}
      <Benefits />
      <Footer />
    </div>
  );
};
export default Landing;
