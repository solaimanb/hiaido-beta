import { Helmet } from "react-helmet-async";
import { lazy } from "react";

// Using React.lazy to dynamically import components for the Pricing page.
const PricingList = lazy(() =>
  import("../components/page-components/pricing/PricingList")
);

const Pricing = () => {
  window.scrollTo(0, 0);

  return (
    <>
      {/* SEO CONTENT */}
      <Helmet>
        <title>Hiaido | Pricing</title>
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
      <main
        className="min-h-[60vh] flex justify-center overflow-hidden"
        id="pricing"
      >
        <div className="flex justify-center mt-20">
          <PricingList />
        </div>
      </main>
    </>
  );
};

export default Pricing;
