import { useEffect } from "react";
import { useStore } from "../../store/Store";
// import { awsLogo } from "../../assets";

const ButtonsComp = () => {
    const { user } = useStore()

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user))
    }, [user])
    return (
        // user?.firstTime && (
        <>
            <h2 className="text-orange-500 text-2xl font-normal mt-10">
                Hi There...
            </h2>
            <h4>Welcome to HiAiDo</h4>
            {/* <p className='text-teal-400 text-base mb-2'>Ready to explore the world of cloud automation ?</p> */}
            {/* <div className="flex justify-center gap-4 items-center flex-wrap w-3/5">
                    <button onClick={() => setUser({ ...user, firstTime: false })} className="px-6 py-2 bg-blue-800 text-white hover:bg-yellow-500 hover:text-gray-900 rounded-md">Start Tour</button>
                    <button onClick={() => setUser({ ...user, firstTime: false })} className="px-6 py-2 bg-blue-800 text-white hover:bg-yellow-500 hover:text-gray-900 rounded-md">Explore HIAIDO</button>
                    <button onClick={() => setUser({ ...user, firstTime: false })} className="px-6 py-2 bg-blue-800 text-white hover:bg-yellow-500 hover:text-gray-900 rounded-md">Lets Build</button>
                    <button onClick={() => setUser({ ...user, firstTime: false })} className="px-6 py-2 bg-blue-800 text-white hover:bg-yellow-500 hover:text-gray-900 rounded-md">Learn More</button>
                    <button onClick={() => setUser({ ...user, firstTime: false })} className="px-6 py-2 bg-blue-800 text-white hover:bg-yellow-500 hover:text-gray-900 rounded-md">See Demo</button>
                    <div className='flex items-center ml-0 mt-2'>Get started with <img className='mx-2' src={awsLogo} width={40} height={"auto"} alt="aws" /> account</div>
                </div> */}
        </>
        // )
    );
};

export default ButtonsComp;
