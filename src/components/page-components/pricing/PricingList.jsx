import { Button } from "@/ui-components/ui/button";
import { check } from "../../../assets";
import { pricing } from "../../../constants";

const PricingList = () => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
      {pricing.map((item) => (
        <div
          key={item.id}
          className="w-full h-full px-6 border border-orange-500/30 rounded-[2rem]"
        >
          <h4 className="mb-4 h4">{item.title}</h4>

          <p className="body-2 min-h-[4rem] mb-3 text-n-1/50">
            {item.description}
          </p>

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
            className="w-full mb-6"
            href={item.price ? "/pricing" : "mailto:support@hiaido.com"}
            white={!!item.price}
          >
            {item.price ? "Buy" : "Contact us"}
          </Button>

          <ul>
            {item.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start py-5 border-t border-n-6"
              >
                <img src={check} width={24} height={24} alt="Check" />
                <p className="ml-4 body-2">{feature}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PricingList;
