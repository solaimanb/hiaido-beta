import { Button } from "@/ui-components/ui/button";
import { check } from "../../../assets";
import { pricing } from "../../../constants";

const PricingList = () => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {pricing.map((item) => (
        <div
          key={item.id}
          className="w-full flex flex-col justify-between p-3 border border-orange-500/40 rounded-[2rem] space-y-4"
        >
          <div className="border-b border-orange-500/30">
            <div className="space-y-2">
              <h4 className="h4 font-bold text-center border-b-2 pb-2 border-orange-500/50">
                {item.title}
              </h4>

              <p className="text-center opacity-80">{item.description}</p>
            </div>

            <div className="flex items-center h-[2.5rem] mb-6">
              {item.price && (
                <>
                  <div className="h3 text-[1.5rem] mb-[1.25rem] ">$</div>
                  <div className="text-[2.5rem] leading-none font-bold">
                    {item.price}
                  </div>
                </>
              )}
            </div>

            <Button
              className="w-full mt-auto mb-6 bg-orange-500/80 hover:bg-orange-600 text-white font-semibold rounded-full transition-colors duration-200 text-lg"
              href={item.price ? "/pricing" : "mailto:support@hiaido.com"}
              white={!!item.price}
            >
              {item.price ? "Get Started" : "Contact Sales"}
            </Button>
          </div>

          <div className="flex h-full w-full">
            <ul className="w-full flex flex-col h-full p-1">
              {item.features.map((feature, index) => (
                <li key={index} className="flex items-start py-4 gap-2">
                  <img
                    src={check}
                    width={24}
                    height={24}
                    alt="Check"
                    className=""
                  />

                  <p className="opacity-80 text-base font-semibold">
                    {feature}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingList;
