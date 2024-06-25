import { Helmet } from "react-helmet-async";
import { lazy, useState } from "react";
import { Button } from "@/ui-components/ui/button";

const PricingList = lazy(() =>
  import("../components/page-components/pricing/PricingList")
);

const Pricing = () => {
  window.scrollTo(0, 0);
  const [selectedPlan, setSelectedPlan] = useState("Monthly");

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
          <div className="mt-10 flex justify-center flex-col items-center gap-y-4">
            <div className="flex gap-2 bg-orange-500/80 p-1 rounded-full text-lg">
              <Button
                className={`rounded-full font-semibold transition-colors duration-300 ${
                  selectedPlan === "Monthly"
                    ? "bg-white text-orange-500"
                    : "bg-transparent text-white"
                }`}
                onClick={() => setSelectedPlan("Monthly")}
              >
                Monthly
              </Button>
              <Button
                className={`rounded-full font-semibold transition-colors duration-300 ${
                  selectedPlan === "Yearly"
                    ? "bg-white text-orange-500"
                    : "bg-transparent text-white"
                }`}
                onClick={() => setSelectedPlan("Yearly")}
              >
                Yearly
              </Button>
            </div>

            <h2 className="capitalize text-2xl md:text-4xl xl:text-5xl bold-title">
              Pricing plan for every creative need
            </h2>
          </div>

          <PricingList />
        </div>
      </main>
    </>
  );
};

export default Pricing;
