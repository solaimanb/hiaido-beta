import Section from "../components/Section";
import Heading from "../components/Heading";
import PricingList from "../components/PricingList";
import { Helmet } from "react-helmet-async";

const Pricing = () => {
  window.scrollTo(0, 0);

  return (
    <>
      {/* SEO CONTENT */}
      <Helmet>
        <title>Hiaido | Subscription</title>
        <meta
          name="description"
          content="Explore Hiaido's subscription plans. Find the perfect plan for your cloud operations automation needs."
        />
        <meta
          name="keywords"
          content="Hiaido, Subscription, Pricing, Cloud Operations, Automation, Plans"
        />
        <meta name="author" content="Hiaido" />
      </Helmet>

      {/* MAIN CONTENT */}
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
