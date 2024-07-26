import React, { useState } from "react";
import { check } from "../../../assets";
import { pricing } from "../../../constants/pricing";
import "./PricingList.css";
import { generateCheckoutUrl } from "@/services/GenerateCheckoutUrl";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Link, useNavigate } from "react-router-dom";

const PricingList = ({ convertPrice, currencySymbol }) => {
  const [checkoutUrl, setCheckoutUrl] = useState({});
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  const navigate = useNavigate();

  const handleClick = (plan, currency, event) => {
    if (authStatus === "authenticated") {
      const url = generateCheckoutUrl(plan, currency);
      setCheckoutUrl((prevState) => ({
        ...prevState,
        [plan]: url,
      }));
      window.location.href = url;
    } else {
      event.preventDefault();
      navigate("/login");
    }
  };

  return (
    <div className="container grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mt-8 py-2 px-4 md:px-10">
      {pricing.map((item) => (
        <div
          key={item.id}
          className="pricing-card-base-bg pricing-card transition-all duration-300 ease-in-out w-full flex flex-col justify-between overflow-hidden rounded-[2.5rem] space-y-2 shadow-md shadow-white"
        >
          <div className="pricing-card-bg border-b border-orange-500/30 pb-6 flex flex-col justify-center">
            <div className={`space-y-1 mb-6 p-2 ${!item.price ? "" : ""}`}>
              <h4 className="text-4xl bold-title text-center text-orange-500 mt-2">
                {item.title}
              </h4>
              <div className="h-36">
                <div
                  className={`flex items-center justify-center mb-6 ${
                    !item.price ? "" : ""
                  }`}
                >
                  {item.title === "Playground" ? (
                    <div className="text-3xl mt-3 leading-none bold-title">FREE</div>
                  ) : (
                    item.price && (
                      <>
                        <div
                          className={`text-xl bold-title mb-4 text-cyan-500 p-1 ${
                            item.price.INR === null ? "hidden" : ""
                          }`}
                        >
                          {currencySymbol}
                        </div>
                        <div className="text-3xl leading-none bold-title">
                          {convertPrice(item.price)}
                        </div>
                        <span
                          className={`font-bold mt-2 text-lg ${
                            item.price.INR === null ? "hidden" : ""
                          }`}
                        >
                          /month
                        </span>
                      </>
                    )
                  )}
                </div>

                <div className="">
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
            </div>

            {/* <button
              className="bg-gradient pricing-btn w-[90%] mx-auto mt-auto text-white bold-title p-2 rounded-lg text-lg hover:scale-105"
              onClick={() => {
                if (item.price && item.price.INR !== null) {
                  handleClick(item.title, currencySymbol === '₹' ? 'INR' : 'USD');
                } else {
                  window.location.href = 'mailto:support@hiaido.com';
                }
              }}
            >
              {item.trigger}
            </button> */}
            <Link
              className="bg-gradient pricing-btn w-[90%] mx-auto mt-auto text-white bold-title p-2 rounded-lg text-lg hover:scale-105"
              // href={
              //   item.price && item.price.INR !== null
              //     ? generateCheckoutUrl(item.title, currencySymbol === '₹' ? 'INR' : 'USD')
              //     : 'mailto:support@hiaido.com'
              // }
              // onClick={(e) => {
              //   if (item.price && item.price.INR === null) {
              //     e.preventDefault();
              //     window.location.href = 'mailto:support@hiaido.com';
              //   } else {
              //     handleClick(item.title, currencySymbol === '₹' ? 'INR' : 'USD');
              //   }
              // }}
              to={"/login"}
            >
              {item.trigger}
            </Link>
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
