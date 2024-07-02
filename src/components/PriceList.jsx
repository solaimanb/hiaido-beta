import { check } from '@/assets'
import { pricing } from '@/constants/pricing'
import React from 'react'
import "./page-components/pricing/PricingList.css"

const NewPriceList = ({ setactiveTab }) => {
    return (
        <div>
            <div className='w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-4 '>
                {pricing.map((item) => (
                    <div
                        key={item.id}
                        className="pricing-card-base-bg w-full overflow-hidden flex flex-col justify-between rounded-[2.5rem] shadow-md shadow-white"
                    >

                        <div className="pricing-card-bg border-b border-orange-500/30 pb-6 flex flex-col justify-center">
                            <div
                                className={`space-y-2 mb-6 p-2 ${!item.price ? "space-y-4" : ""}`}
                            >
                                <h4 className="h4 bold-title text-center text-orange-500 mt-2">
                                    {item.title}
                                </h4>

                                <div className={`flex items-center justify-center mb-6`}>
                                    {item.price && (
                                        <>
                                            <div className="text-xl bold-title mb-4 text-cyan-500 p-1">
                                                $
                                            </div>
                                            <div className="text-4xl xl:text-5xl leading-none font-bold">
                                                {item.price}
                                            </div>
                                            <span className="text-base font-semibold mt-2 xl:text-lg">
                                                /month
                                            </span>
                                        </>
                                    )}
                                </div>

                                <div>
                                    <div
                                        className={`space-y-2 ${item.images && "bg-[#302473] p-2 rounded-lg shadow-md"
                                            } ${!item.price && "my-5"}`}
                                    >
                                        <p
                                            className={`text-center xl:text-lg font-semibold ${item.images && "xl:text-sm"
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
            <div className="w-full flex gap-4 items-center justify-end mt-3 md:pr-4">
                <button type="button" className="bg-white text-black py-2 px-4 rounded text-md font-bold">Decline</button>
                {/* <AnimatedBtn type="button" onClick={() => setactiveTab(e => e + 1)}>Accept</AnimatedBtn> */}
                <button className={`bg-orange-400 px-4 py-2 rounded font-bold`} onClick={() => setactiveTab(e => e + 1)} >Accept</button>
            </div>
        </div>
    )
}

export default NewPriceList