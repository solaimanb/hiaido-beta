import { check } from "@/assets";
import "./page-components/pricing/PricingList.css";
import { generateCheckoutUrl } from "@/services/GenerateCheckoutUrl";
import React, { useEffect, useState } from "react";
import { Flex, Switch, Text } from "@radix-ui/themes";
import { pricing } from "@/constants/pricing";
import { Link, useSearchParams } from "react-router-dom";

const NewPriceList = () => {
  const [params, setSearchParams] = useSearchParams();
  const [currency, setCurrency] = useState("INR");
  const [usdClicked, setUsdClicked] = useState(false);
  const [inrClicked, setInrClicked] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState({});
  console.log(checkoutUrl);

  // useEffect(() => {
  //   if (window.Chargebee) {
  //     window.Chargebee.registerAgain();
  //   }
  // }, []);

  const currencySymbol = currency === "USD" ? "$" : "₹";

  const handleClick = (plan, currency) => {
    const url = generateCheckoutUrl(plan, currency);
    setCheckoutUrl((prevState) => ({
      ...prevState,
      [plan]: url,
    }));
  };
  const handleUsdClick = () => {
    if (!usdClicked) {
      setCurrency("USD");
      setUsdClicked(true);
      setInrClicked(false);
    }
  };

  const handleInrClick = () => {
    if (!inrClicked) {
      setCurrency("INR");
      setInrClicked(true);
      setUsdClicked(false);
    }
  };

  const convertPrice = (price) => {
    return currency === "INR" ? price.INR : price.USD;
  };

  return (
    <div className="w-full">
      <div className="mt-10 flex justify-center items-center gap-2">
        <div className="flex items-center gap-2 p-3 rounded-2xl bg-white shadow-orange">
          <span
            className={`bold-title cursor-pointer ${
              currency === "USD" ? "text-orange-400" : "text-black"
            }`}
            onClick={handleUsdClick}
          >
            <a
              href="javascript:void(0)"
              data-cb-type="checkout"
              data-cb-item-0="Playground-USD-Monthly"
              data-cb-item-quantity="1"
            >
              USD
            </a>
          </span>

          <Switch
            size="3"
            color="orange"
            checked={currency === "INR"}
            className="cursor-pointer border border-white z-10 text-white before:border-white"
          />
          <span
            className={`bold-title cursor-pointer ${
              currency === "INR" ? "text-orange-400" : "text-black"
            }`}
            onClick={handleInrClick}
          >
            <a
              href="javascript:void(0)"
              data-cb-type="checkout"
              data-cb-item-0="Playground-INR-Monthly"
              data-cb-item-quantity="1"
            >
              INR
            </a>
          </span>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-10 mt-8 py-2 px-4 md:px-10">
        {pricing.map((item) => (
          <div
            key={item.id}
            className=" transition-all duration-300 ease-in-out w-full rounded-3xl border border-white shadow shadow-white p-3 hover:shadow-orange hover:scale-105"
          >
            <div className=" flex flex-col justify-center">
              <div className={`${!item.price ? "" : ""}`}>
                <h4 className="text-4xl bold-title text-center text-orange-500 mt-2">
                  {item.title}
                </h4>
                <div className="">
                  <div
                    className={`flex items-center justify-center my-6 ${
                      !item.price ? "" : ""
                    }`}
                  >
                    {item.price && (
                      <>
                        <div
                          className={`text-xl bold-title text-cyan-500 p-1 ${
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
                    )}
                  </div>

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

              <a
                className="text-white bold-title p-2 rounded-2xl text-lg border border-orange-400 text-center mt-3"
                // href={
                //   item.price && item.price.INR !== null
                //     ? generateCheckoutUrl(
                //         item.title,
                //         currencySymbol === "₹" ? "INR" : "USD"
                //       )
                //     : "mailto:support@hiaido.com"
                // }
                onClick={(e) => {
                  if (item.url_id) {
                    document.querySelector(`#${item.url_id[currency]}`).click();
                    return;
                  }
                }}
              >
                Choose plan
              </a>
              <a
                onLoad={(e) => {
                  console.log("CHarge", Chargebee);
                  Chargebee.registerAgain();
                }}
                href="javascript:void(0)"
                data-cb-type="checkout"
                data-cb-item-0="Playground-INR-Monthly"
                data-cb-item-0-quantity="1"
              >
                subscribe
              </a>
              {/* <script
                src="https://js.chargebee.com/v2/chargebee.js"
                data-cb-site="hiaido"
              ></script> */}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex gap-4 items-center justify-end mt-3 md:pr-4">
        <button
          type="button"
          className="bg-white text-black py-2 px-4 rounded text-md font-bold"
        >
          Decline
        </button>
        <button className={`bg-orange-400 px-4 py-2 rounded font-bold`}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default NewPriceList;
