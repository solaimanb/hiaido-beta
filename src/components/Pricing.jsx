import Section from "./Section";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import Heading from "./Heading";
import PricingList from "./PricingList";
import { LeftLine, RightLine } from "./design/Pricing";
import { useEffect } from "react";

const Pricing = () => {
  useEffect(() => {
    document.title = "Hiaido | Subscription";
  }, []);
  return (
    <>
      <Header />
      <Section className=" mt-[2rem] overflow-hidden" id="pricing">
        <div className="container relative z-2">
          <Heading />

          <div className="relative">
            <PricingList />
          </div>
        </div>
      </Section>
    </>
  );
};

export default Pricing;
