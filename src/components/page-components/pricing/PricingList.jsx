import { check } from "../../../assets";
import { pricing } from "../../../constants";
import AnimatedBtn from "@/components/Buttons/AnimatedBtn";

const PricingList = () => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
      {pricing.map((item) => (
        <div
          key={item.id}
          className="w-full flex flex-col justify-between p-3 border rounded-[2rem] space-y-4 gradient-border"
        >
          <div className="border-b border-orange-500/30 pb-6">
            <div
              className={`space-y-4 mb-10  ${!item.price ? "space-y-6" : ""}`}
            >
              <h4 className="h4 font-bold text-center border-b-2 pb-2 border-[#3675D3]">
                {item.title}
              </h4>

              <div
                className={`flex items-center h-[2.5rem] justify-center mb-6`}
              >
                {item.price && (
                  <>
                    <div className="h3 text-[1.5rem] mb-[1.25rem]">$</div>
                    <div className="text-[2.5rem] leading-none font-bold">
                      {item.price}
                    </div>
                  </>
                )}
              </div>

              <p className="text-center text-xl font-semibold opacity-80">
                {item.description}
              </p>
            </div>

            <AnimatedBtn
              className={`w-full mt-auto text-white font-semibold`}
              href={item.price ? "/pricing" : "mailto:support@hiaido.com"}
              white={!!item.price}
            >
              {item.price ? "Get Started" : "Contact Sales"}
            </AnimatedBtn>
          </div>

          <div className="flex h-full w-full">
            <ul className="w-full flex flex-col h-full p-1">
              {item.features.map((feature, index) => (
                <li key={index} className="flex items-start py-4 gap-2">
                  <img
                    src={check}
                    width={22}
                    height={22}
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
