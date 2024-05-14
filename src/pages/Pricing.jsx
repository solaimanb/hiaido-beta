import Section from "../components/Section";
import Heading from "../components/Heading";
import PricingList from "../components/PricingList";

import { useEffect } from "react";

const Pricing = () => {
  useEffect(() => {
    document.title = "Hiaido | Subscription";
  }, []);

  return (
    <>
      <Section className=" mt-[2rem] overflow-hidden" id="pricing">
        <div className="z-2 container relative">
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
