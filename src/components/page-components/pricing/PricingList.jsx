import React from "react";
import { check } from "../../../assets";
import { pricing } from "../../../constants";
import "./PricingList.css";

const PricingList = () => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-4 mt-16 py-2 px-4 md:px-2">
      {pricing.map((item) => (
        <div
          key={item.id}
          className="pricing-card-base-bg pricing-card transition-all duration-300 ease-in-out w-full flex flex-col justify-between overflow-hidden rounded-[2.5rem] space-y-3 shadow-md shadow-white"
        >
          <div className="pricing-card-bg border-b border-orange-500/30 pb-6 flex flex-col justify-center">
            <div className={`space-y-2 mb-6 p-2 ${!item.price ? "" : ""}`}>
              <h4 className="text-4xl bold-title text-center text-orange-500 mt-2">
                {item.title}
              </h4>

              <div className={`flex items-center justify-center mb-6`}>
                {item.price && (
                  <>
                    <div className="text-xl bold-title mb-4 text-cyan-500 p-1">
                      $
                    </div>
                    <div className="text-4xl xl:text-5xl leading-none bold-title">
                      {item.price}
                    </div>
                    <span className="font-bold mt-5 text-lg">/month</span>
                  </>
                )}
              </div>

              <div>
                <div
                  className={`space-y-2 ${
                    item.images &&
                    "bg-[#312373] p-2 rounded-lg shadow-lg border-r-2 border-b-2 border-[#201746]"
                  } ${!item.price && "my-5"}`}
                >
                  <p
                    className={`text-center text-lg font-semibold ${
                      item.images && "xl:text-sm"
                    }`}
                  >
                    {item.description.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>

                  {/* XaaS images */}
                  <div className="flex items-center gap-3 justify-center">
                    {item.images &&
                      item.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Image ${index}`}
                          className="w-8"
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              className={`bg-gradient pricing-btn w-[90%] mx-auto mt-auto text-white font-semibold p-2 rounded-lg`}
              href={item.price ? "/pricing" : "mailto:support@hiaido.com"}
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
