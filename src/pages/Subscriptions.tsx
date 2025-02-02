import Loader from "@/components/Loader";
import { pricing } from "@/constants/pricing";
import { fetchAuthSession } from "aws-amplify/auth";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Subscriptions = () => {
  const [hostedPage, setHostedPage] = useState<any>(null);

  const getHostedPage = async () => {
    const authSession = await fetchAuthSession();
    let idToken = authSession.tokens?.idToken?.toString();
    if (idToken) {
      let response = await fetch(
        "https://t19tszry50.execute-api.us-east-1.amazonaws.com/prod/hosted-page",
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setHostedPage(data.hostedPage);
      } else {
        throw new Error(data.message);
      }
    }
  };

  useEffect(() => {
    getHostedPage();
  }, []);

  if (!hostedPage) {
    return <Loader />;
  }

  const item_price_id =
    hostedPage.content.subscription.subscription_items[0].item_price_id;

  return (
    <div className="p-5 px-10 w-full">
      <div className="my-3">
        <h1 className="text-2xl font-medium">Subscriptions</h1>
      </div>
      {/* <div>
        Current subscription:{" "}
        {
          hostedPage.content.subscription.subscription_items[0].item_price_id.split(
            "-"
          )[0]
        }
      </div> */}
      <div className="my-10 max-w-[1000px] mx-auto">
        <div className="w-full mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-10 mt-8 py-2 px-4 md:px-10">
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
                    {/* <div
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
                    </div> */}

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
                    item.url_id?.INR === item_price_id ||
                    item.url_id?.USD === item_price_id
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
                  //   onClick={async (e) => {
                  //     let { tokens } = await fetchAuthSession();
                  //     console.log(item.url_id[currency]);

                  //     if (item.url_id && tokens.idToken) {
                  //       handleCheckoutGeneration(
                  //         item.url_id[currency],
                  //         tokens.idToken.toString()
                  //       );
                  //       // document.querySelector(`#${item.url_id[currency]}`).click();
                  //       // return;
                  //     }
                  //   }}
                  onClick={() => {
                    if (
                      item.url_id?.INR === item_price_id ||
                      item.url_id?.USD === item_price_id
                    ) {
                    } else {
                      toast.error("You cannot upgrade your plan right now");
                    }
                  }}
                >
                  {item.url_id?.INR === item_price_id ||
                  item.url_id?.USD === item_price_id
                    ? "Current"
                    : "Uprade Now"}
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
      </div>
    </div>
  );
};

export default Subscriptions;
