import React from "react";
import { check } from "../../../assets";
import { pricing } from "../../../constants";

const PricingList = () => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-16 py-2 px-2">
      {pricing.map((item) => (
        <div
          key={item.id}
          className="w-full flex flex-col justify-between overflow-hidden border rounded-3xl space-y-4 shadow-md shadow-orange-500"
        >
          <div className="pricing-card-bg border-b border-orange-500/30 pb-6 flex flex-col justify-center">
            <div
              className={`space-y-4 mb-10 p-2 ${
                !item.price ? "space-y-6" : ""
              }`}
            >
              <h4 className="h5 bold-title text-center border-b-2 pb-2 border-[#3675D3] text-orange-500/90">
                {item.title}
              </h4>

              <div
                className={`flex items-center h-[2.5rem] justify-center mb-6`}
              >
                {item.price && (
                  <>
                    <div className="text-xl bold-title mb-4 text-cyan-500 p-1">
                      $
                    </div>
                    <div className="text-4xl leading-none font-bold">
                      {item.price}
                    </div>
                    <span className="text-base font-semibold mt-2">/month</span>
                  </>
                )}
              </div>

              <p className="text-center font-semibold opacity-80">
                {item.description.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>

            <button
              className={`bg-gradient w-[90%] mx-auto mt-auto text-white font-semibold p-2 rounded-lg`}
              href={item.price ? "/pricing" : "mailto:support@hiaido.com"}
              // white={!!item.price}
            >
              {item.trigger}
            </button>
          </div>

          <div className="flex h-full w-full p-2">
            <ul className="w-full flex flex-col h-full p-1">
              {item.features.map((feature, index) => (
                <>
                  <li key={index} className="flex items-start py-2 gap-2">
                    <img
                      src={check}
                      width={16}
                      height={16}
                      alt="Check"
                      className="mt-1"
                    />

                    <p className="opacity-70 text-base font-semibold">
                      {feature}
                    </p>
                  </li>
                  {index < item.features.length - 1 && (
                    <hr className="border-t border-orange-50/10 w-full" />
                  )}
                </>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PricingList;
