import { Helmet } from "react-helmet-async";
import { lazy } from "react";

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
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="mt-16 flex justify-center flex-col items-center gap-y-4">
            <h2 className="text-gradient capitalize text-2xl md:text-4xl xl:text-5xl bold-title">
              Choose your plan
            </h2>

            <p className="text-gradient text-xl lg:text-2xl">
              Unlock endless possibilities
            </p>
          </div>

          <PricingList />
        </div>
      </main>
    </>
  );
};

export default Pricing;
