// import { check } from "../../../assets";
// import { pricing } from "../../../constants";
// import Button from "../../Button";

const PricingList = () => {
  return (
    <>
      {/* <div className="flex gap-[1rem] max-lg:flex-wrap">
        {pricing.map((item) => (
          <div
            key={item.id}
            className="w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 "
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
      </div> */}

      <div className="container flex items-center justify-center text-center">
        <div className="mx-auto text-center z-1">
          <h1 className="w-auto mb-3 text-6xl text-orange-500">
            Coming Soon..
          </h1>

          <div className="max-w-3xl mx-auto mb-6 text-xs font-bold body-1 lg:text-2xl font lg:mb-8">
            <p className="text-xs font-bold type1 md:text-xl">
              We are working hard to bring you something amazing. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingList;
