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
            <h4 className="h4 mb-4">{item.title}</h4>

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
                  className="border-n-6 flex items-start py-5 border-t"
                >
                  <img src={check} width={24} height={24} alt="Check" />
                  <p className="body-2 ml-4">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div> */}

      <div className="container flex items-center justify-center text-center">
        <div className="z-1 mx-auto text-center">
          <h1 className="w-auto mb-3 text-6xl text-orange-500">
            Coming Soon..
          </h1>

          <div className="body-1 lg:text-2xl font lg:mb-8 max-w-3xl mx-auto mb-6 text-xs font-bold">
            <p className="type1 md:text-xl text-xs font-bold">
              We are working hard to bring you something amazing. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingList;
