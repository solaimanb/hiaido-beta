import { Helmet } from "react-helmet-async";
import { lazy, useState } from "react";
import { Flex, Switch, Text } from "@radix-ui/themes";

const PricingList = lazy(() =>
  import("../components/page-components/pricing/PricingList")
);

const Pricing = () => {
  const [currency, setCurrency] = useState("INR");
  const conversionRate = 83.37;

  const handleCurrencyChange = () => {
    setCurrency((prevCurrency) => (prevCurrency === "USD" ? "INR" : "USD"));
  };

  const convertPrice = (price, rate) => {
    const convertedPrice = currency === "INR" ? price * rate : price;
    return Math.round(convertedPrice);
  };

  const currencySymbol = currency === "USD" ? "$" : "₹";

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
            <h2 className="text-gradient capitalize text-4xl xl:text-5xl bold-title">
              Choose your plan
            </h2>

            <p className="text-gradient text-xl md:text-2xl">
              Unlock endless possibilities
            </p>
          </div>

          <div className="mt-10 flex items-center gap-2">
            <span className="bold-title">USD</span>
            <Text as="label" size="7">
              <Flex gap="2" align="center">
                <Switch
                  size="3"
                  color="green"
                  checked={currency === "INR"}
                  onCheckedChange={handleCurrencyChange}
                />
              </Flex>
            </Text>
            <span className="bold-title">INR</span>
          </div>

          <PricingList
            currency={currency}
            convertPrice={convertPrice}
            currencySymbol={currencySymbol}
            conversionRate={conversionRate}
          />
        </div>
      </main>
    </>
  );
};

export default Pricing;
