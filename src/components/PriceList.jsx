import { check } from "@/assets";
import "./page-components/pricing/PricingList.css";
import { generateCheckoutUrl } from "@/services/GenerateCheckoutUrl";
import React, { useEffect, useState } from "react";
import { Flex, Switch, Text } from "@radix-ui/themes";
import { pricing } from "@/constants/pricing";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { fetchAuthSession } from "aws-amplify/auth";
import Loader from "./Loader";
import { useGlobalState } from "@/context/GlobalStateContext";

const NewPriceList = () => {
  const [currency, setCurrency] = useState("INR");
  const [usdClicked, setUsdClicked] = useState(false);
  const [inrClicked, setInrClicked] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState({});
  const { subscription } = useGlobalState();
  const navigate = useNavigate();
  console.log(checkoutUrl);

  // const checkIfPaymentDone = async () => {
  //   const { tokens } = await fetchAuthSession();
  //   const response = await fetch(
  //     "https://t19tszry50.execute-api.us-east-1.amazonaws.com/prod/hosted-page",
  //     {
  //       headers: { Authorization: `Bearer ${tokens.idToken}` },
  //     }
  //   );
  //   if (response.ok) {
  //     const data = (await response.json())?.hostedPage;
  //     console.log(data);
  //     if (data?.state === "succeeded") {
  //       navigate(`/onboarding?step=2&id=${data.id}&state=${data.state}`);
  //     } else {
  //       setHostedPage({});
  //     }
  //   } else {
  //     setHostedPage({});
  //   }
  // };

  const checkIfPaymentDone = async () => {
    if (subscription) {
      navigate(`/onboarding?step=2&id=${subscription.hosted_page_id}`);
    }
  };

  useEffect(() => {
    checkIfPaymentDone();
  }, [subscription]);

  const handleCheckoutGeneration = async (itemPriceId, idToken) => {
    if (window.Chargebee) {
      let instance = window.Chargebee.getInstance();

      await instance.openCheckout({
        hostedPage: async () => {
          const data = await fetch(
            "https://t19tszry50.execute-api.us-east-1.amazonaws.com/prod/hosted-page",
            {
              method: "POST",
              body: JSON.stringify({ itemPriceId }),
              headers: { Authorization: `Bearer ${idToken}` },
            }
          )
            .then((res) => res.json())
            .then((data) => data.hostedPage);
          if (data.redirect_url) {
            navigate(data.redirect_url);
          } else {
            return new Promise((resolve, reject) => {
              resolve(data);
            });
          }
        },
      });
    }
  };

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

  if (subscription === null) {
    return <Loader />;
  }

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
                    {item.title === "Playground" ? (
                      <>
                        <div className="text-3xl leading-none bold-title">
                          FREE
                        </div>
                      </>
                    ) : (
                      item.price && (
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
                      )
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

              <button
                id={
                  item.url_id && item.url_id[currency]
                    ? "animated-btn"
                    : "animated-btn-outlined"
                }
                className="text-white bold-title p-2 rounded-2xl text-lg border border-orange-400 text-center mt-3 cursor-pointer"
                // href={
                //   item.price && item.price.INR !== null
                //     ? generateCheckoutUrl(
                //         item.title,
                //         currencySymbol === "₹" ? "INR" : "USD"
                //       )
                //     : "mailto:support@hiaido.com"
                // }
                onClick={async (e) => {
                  let { tokens } = await fetchAuthSession();
                  console.log(item.url_id[currency]);

                  if (item.url_id && tokens.idToken) {
                    handleCheckoutGeneration(
                      item.url_id[currency],
                      tokens.idToken.toString()
                    );
                    // document.querySelector(`#${item.url_id[currency]}`).click();
                    // return;
                  }
                }}
              >
                {item.title === "Playground"
                  ? "Go"
                  : item.url_id
                  ? "Choose Plan"
                  : "Coming Soon"}
              </button>
              {/* <div
                class="razorpay-embed-btn"
                data-url="https://pages.razorpay.com/pl_OW4SRe3vFwU2Mm/view"
                data-text="Pay Now"
                data-color="#528FF0"
                data-size="large"
              >
                <script>
                  {(function () {
                    var d = document;
                    var x = !d.getElementById("razorpay-embed-btn-js");
                    if (x) {
                      var s = d.createElement("script");
                      s.defer = !0;
                      s.id = "razorpay-embed-btn-js";
                      s.src =
                        "https://cdn.razorpay.com/static/embed_btn/bundle.js";
                      d.body.appendChild(s);
                    } else {
                      var rzp = window["__rzp__"];
                      rzp && rzp.init && rzp.init();
                    }
                  })()}
                </script>
              </div> */}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="w-full flex gap-4 items-center justify-end mt-3 md:pr-4">
        <button
          type="button"
          className="bg-white text-black py-2 px-4 rounded text-md font-bold"
        >
          Decline
        </button>
        <button className={`bg-orange-400 px-4 py-2 rounded font-bold`}>
          Accept
        </button>
      </div> */}
    </div>
  );
};

export default NewPriceList;
